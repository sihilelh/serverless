import type { CreateStudentDto, UpdateStudentDto, FilterStudentDto } from '@workspace/types';
import { httpGet, httpPost, httpPut, httpDelete } from '@/instances/api.instance';
import { withApiHandling, type ErrorCallbacks } from '@/utils/api.utils';
import type {
    GetAllStudentsResult,
    GetStudentByIdResult,
    CreateStudentResult,
    UpdateStudentResult,
    DeleteStudentResult,
    StudentServiceErrorCallbacks
} from '@/types/api.types';

/**
 * Get all students with optional filtering
 * @param filters - Filter criteria for students
 * @param errorCallbacks - Optional callbacks for handling specific HTTP status errors
 * @returns Promise of students list with metadata
 */
export const getAllStudents = async (
    filters?: FilterStudentDto,
    errorCallbacks?: StudentServiceErrorCallbacks
): Promise<GetAllStudentsResult> => {
    return withApiHandling(
        () => httpGet('/students', filters),
        errorCallbacks as ErrorCallbacks
    );
};

/**
 * Get a single student by ID
 * @param studentId - The ID of the student to retrieve
 * @param errorCallbacks - Optional callbacks for handling specific HTTP status errors
 * @returns Promise of student data
 */
export const getStudentById = async (
    studentId: string,
    errorCallbacks?: StudentServiceErrorCallbacks
): Promise<GetStudentByIdResult> => {
    return withApiHandling(
        () => httpGet(`/students/${studentId}`),
        errorCallbacks as ErrorCallbacks
    );
};

/**
 * Create a new student
 * @param studentData - Data for creating the student
 * @param errorCallbacks - Optional callbacks for handling specific HTTP status errors
 * @returns Promise of created student
 */
export const createStudent = async (
    studentData: CreateStudentDto,
    errorCallbacks?: StudentServiceErrorCallbacks
): Promise<CreateStudentResult> => {
    return withApiHandling(
        () => httpPost('/students', studentData),
        errorCallbacks as ErrorCallbacks
    );
};

/**
 * Update an existing student
 * @param studentId - The ID of the student to update
 * @param studentData - Data for updating the student
 * @param errorCallbacks - Optional callbacks for handling specific HTTP status errors
 * @returns Promise of updated student
 */
export const updateStudent = async (
    studentId: string,
    studentData: UpdateStudentDto,
    errorCallbacks?: StudentServiceErrorCallbacks
): Promise<UpdateStudentResult> => {
    return withApiHandling(
        () => httpPut(`/students/${studentId}`, studentData),
        errorCallbacks as ErrorCallbacks
    );
};

/**
 * Delete a student by ID
 * @param studentId - The ID of the student to delete
 * @param errorCallbacks - Optional callbacks for handling specific HTTP status errors
 * @returns Promise of deletion result
 */
export const deleteStudent = async (
    studentId: string,
    errorCallbacks?: StudentServiceErrorCallbacks
): Promise<DeleteStudentResult> => {
    return withApiHandling(
        () => httpDelete(`/students/${studentId}`),
        errorCallbacks as ErrorCallbacks
    );
};
