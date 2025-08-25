import { CreateStudentDto, FilterStudentDto, UpdateStudentDto } from "@workspace/types";
import * as studentDao from "../dao/student.dao";

export async function getAllStudents(filters: FilterStudentDto) {
    console.log(`studentService - getAllStudents()`)
    try {
        return await studentDao.getAllStudents(filters);
    } catch (error) {
        console.error(`studentService - getAllStudents() - error: ${error}`)
        throw error
    }
}

export async function getStudentById(studentId: string) {
    console.log(`studentService - getStudentById(${studentId})`)
    try {
        return await studentDao.getStudentById(studentId);
    } catch (error) {
        console.error(`studentService - getStudentById() - error: ${error}`)
        throw error
    }
}

export async function createStudent(payload: CreateStudentDto) {
    console.log(`studentService - createStudent()`)
    try {
        return await studentDao.createStudent(payload);
    } catch (error) {
        console.error(`studentService - createStudent() - error: ${error}`)
        throw error
    }
}

export async function updateStudent(studentId: string, payload: UpdateStudentDto) {
    console.log(`studentService - updateStudent(${studentId})`)
    try {
        return await studentDao.updateStudent(studentId, payload);
    } catch (error) {
        console.error(`studentService - updateStudent() - error: ${error}`)
        throw error
    }
}

export async function deleteStudent(studentId: string) {
    console.log(`studentService - deleteStudent(${studentId})`)
    try {
        return await studentDao.deleteStudent(studentId);
    } catch (error) {
        console.error(`studentService - deleteStudent() - error: ${error}`)
        throw error
    }
}
