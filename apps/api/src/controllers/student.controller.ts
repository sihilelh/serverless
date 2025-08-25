import { cb, cbError } from "../utils/http.utils";
import { Request } from "../common/types/http.interface";
import * as studentService from "../services/student.service";
import { CreateStudentDto, UpdateStudentDto } from "@workspace/types";

// Get all students
export async function getAllStudents(req?: Request) {
  console.log(`studentController - getAllStudents()`)
  try {
    const filters = req?.query as any;
    const result = await studentService.getAllStudents(filters);
    return cb(result);
  } catch (error) {
    console.error(`studentController - getAllStudents() - error: ${error}`)
    return cbError("Failed to get all students", 500, error);
  }
}

// Get a single student by ID
export async function getStudentById(req?: Request) {
  console.log(`studentController - getStudentById(${req?.params?.studentId})`);
  try {
    const studentId = req?.params.studentId as string;
    const student = await studentService.getStudentById(studentId);
    if (!student) return cbError("Student not found", 404);
    return cb({ student });
  } catch (error) {
    console.error(`studentController - getStudentById() - error: ${error}`);
    return cbError("Failed to get student by ID", 500, error);
  }
}

// Create a new student
export async function createStudent(req?: Request) {
  console.log(`studentController - createStudent()`);
  try {
    const student = await studentService.createStudent(req?.body as CreateStudentDto);
    return cb({ student }, 201);
  } catch (error) {
    console.error(`studentController - createStudent() - error: ${error}`);
    return cbError("Failed to create student", 500, error);
  }
}

// Update a student by ID
export async function updateStudent(req?: Request) {
  console.log(`studentController - updateStudent(${req?.params?.studentId})`);
  try {
    const studentId = req?.params.studentId as string;
    const student = await studentService.updateStudent(studentId, req?.body as UpdateStudentDto);
    return cb({ student });
  } catch (error) {
    console.error(`studentController - updateStudent() - error: ${error}`);
    return cbError("Failed to update student", 500, error);
  }
}

// Delete a student by ID
export async function deleteStudent(req?: Request) {
  console.log(`studentController - deleteStudent(${req?.params?.studentId})`);
  try {
    const studentId = req?.params.studentId as string;
    const result = await studentService.deleteStudent(studentId);
    return cb(result);
  } catch (error) {
    console.error(`studentController - deleteStudent() - error: ${error}`);
    return cbError("Failed to delete student", 500, error);
  }
}
