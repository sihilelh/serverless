import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    UpdateCommand,
    DeleteCommand,
    ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { CreateStudentDto, FilterStudentDto, UpdateStudentDto, Student } from "@workspace/types";
import { randomUUID } from "crypto";

const dynamoClient = new DynamoDBClient({});
const dynamoDocClient = DynamoDBDocumentClient.from(dynamoClient);

const studentTableName = process.env.STUDENT_TABLE_NAME;

export const getAllStudents = async (filters: FilterStudentDto) => {
    console.log(`studentDao - getAllStudents()`)
    try {
        if (!studentTableName) throw new Error("STUDENT_TABLE_NAME is not defined");

        const {
            start = 0,
            limit = 25,
            sortBy,
            order = 1,
            includeStudentDetails = false,
            fullName,
            nameWithInitials,
            barcodeId,
            gender,
            school,
            address,
            mobileNumber,
            homeNumber,
            joinedGrade,
            houseId,
        } = filters || {};

        const expressionParts: string[] = [];
        const names: Record<string, string> = {};
        const values: Record<string, unknown> = {};

        const addEquals = (field: string, value: unknown) => {
            const nameKey = `#${field}`;
            const valueKey = `:${field}`;
            names[nameKey] = field;
            values[valueKey] = value;
            expressionParts.push(`${nameKey} = ${valueKey}`);
        };

        const addContains = (field: string, value?: string) => {
            if (value === undefined || value === null || value === "") return;
            const nameKey = `#${field}`;
            const valueKey = `:${field}`;
            names[nameKey] = field;
            values[valueKey] = value;
            expressionParts.push(`contains(${nameKey}, ${valueKey})`);
        };

        if (barcodeId) addEquals("barcodeId", barcodeId);
        if (gender) addEquals("gender", gender);
        if (typeof houseId === "number") addEquals("houseId", houseId);

        addContains("fullName", fullName);
        addContains("nameWithInitials", nameWithInitials);
        addContains("school", school);
        addContains("address", address);
        addContains("mobileNumber", mobileNumber);
        addContains("homeNumber", homeNumber);
        addContains("joinedGrade", joinedGrade);

        const scanInput: any = {
            TableName: studentTableName,
        };

        if (!includeStudentDetails) {
            // Project only essential/base fields
            const baseFields = [
                "id",
                "barcodeId",
                "fullName",
                "nameWithInitials",
                "gender",
                "address",
                "dateOfBirth",
                "school",
                "houseId",
                "mobileNumber",
                "homeNumber",
                "joinedDate",
                "joinedGrade",
                "createdAt",
                "updatedAt",
            ];
            scanInput.ProjectionExpression = baseFields.map((f) => `#${f}`).join(", ");
            scanInput.ExpressionAttributeNames = {
                ...(scanInput.ExpressionAttributeNames || {}),
                ...baseFields.reduce<Record<string, string>>((acc, f) => {
                    acc[`#${f}`] = f;
                    return acc;
                }, {}),
            };
        }

        if (expressionParts.length > 0) {
            scanInput.FilterExpression = expressionParts.join(" AND ");
            scanInput.ExpressionAttributeNames = {
                ...(scanInput.ExpressionAttributeNames || {}),
                ...names,
            };
            scanInput.ExpressionAttributeValues = values;
        }

        const result = await dynamoDocClient.send(new ScanCommand(scanInput));
        let items = (result.Items as Student[] | undefined) || [];

        if (sortBy) {
            const sortKey = sortBy as keyof Student;
            items = items.sort((a, b) => {
                const aVal = a[sortKey] as any;
                const bVal = b[sortKey] as any;
                if (aVal === bVal) return 0;
                if (aVal === undefined) return 1;
                if (bVal === undefined) return -1;
                return aVal > bVal ? 1 : -1;
            });
            if (order === -1) items.reverse();
        }

        const total = items.length;
        const startIndex = Math.max(0, start || 0);
        const endIndex = Math.min(total, startIndex + (limit || total));
        const paginated = items.slice(startIndex, endIndex);

        return { items: paginated, total };
    } catch (error) {
        console.error(`studentDao - getAllStudents() - error: ${error}`)
        throw error
    }
}

export const getStudentById = async (studentId: string) => {
    console.log(`studentDao - getStudentById(${studentId})`)
    try {
        if (!studentTableName) throw new Error("STUDENT_TABLE_NAME is not defined");
        const result = await dynamoDocClient.send(new GetCommand({
            TableName: studentTableName,
            Key: { id: studentId },
        }));
        return result.Item as Student | undefined;
    } catch (error) {
        console.error(`studentDao - getStudentById() - error: ${error}`)
        throw error
    }
}

export const createStudent = async (payload: CreateStudentDto) => {
    console.log(`studentDao - createStudent()`)
    try {
        if (!studentTableName) throw new Error("STUDENT_TABLE_NAME is not defined");
        const nowIso = new Date().toISOString();
        const item: Student = {
            id: randomUUID(),
            ...payload,
            createdAt: nowIso,
            updatedAt: nowIso,
        };
        await dynamoDocClient.send(new PutCommand({
            TableName: studentTableName,
            Item: item,
            ConditionExpression: "attribute_not_exists(#id)",
            ExpressionAttributeNames: { "#id": "id" },
        }));
        return item;
    } catch (error) {
        console.error(`studentDao - createStudent() - error: ${error}`)
        throw error
    }
}

export const updateStudent = async (studentId: string, payload: UpdateStudentDto) => {
    console.log(`studentDao - updateStudent(${studentId})`)
    try {
        if (!studentTableName) throw new Error("STUDENT_TABLE_NAME is not defined");

        const entries = Object.entries(payload).filter(([, v]) => v !== undefined);
        const nowIso = new Date().toISOString();
        entries.push(["updatedAt", nowIso]);

        if (entries.length === 0) {
            throw new Error("No fields provided to update");
        }

        const names: Record<string, string> = {};
        const values: Record<string, unknown> = {};
        const sets: string[] = [];

        for (const [key, value] of entries) {
            const nameKey = `#${key}`;
            const valueKey = `:${key}`;
            names[nameKey] = key;
            values[valueKey] = value as unknown;
            sets.push(`${nameKey} = ${valueKey}`);
        }

        const result = await dynamoDocClient.send(new UpdateCommand({
            TableName: studentTableName,
            Key: { id: studentId },
            UpdateExpression: `SET ${sets.join(", ")}`,
            ExpressionAttributeNames: names,
            ExpressionAttributeValues: values,
            ReturnValues: "ALL_NEW",
        }));

        return result.Attributes as Student;
    } catch (error) {
        console.error(`studentDao - updateStudent() - error: ${error}`)
        throw error
    }
}

export const deleteStudent = async (studentId: string) => {
    console.log(`studentDao - deleteStudent(${studentId})`)
    try {
        if (!studentTableName) throw new Error("STUDENT_TABLE_NAME is not defined");
        await dynamoDocClient.send(new DeleteCommand({
            TableName: studentTableName,
            Key: { id: studentId },
        }));
        return { deleted: true };
    } catch (error) {
        console.error(`studentDao - deleteStudent() - error: ${error}`)
        throw error
    }
}