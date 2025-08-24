import { cb, cbError } from "../utils/http.utils";
import { Request } from "../common/types/http.interface";

// Get all students
export async function getAllStudents(req?: Request) {
  try {
    // Dummy data
    const students = [
      { id: 1, name: "Alice", age: 20 },
      { id: 2, name: "Bob", age: 22 },
    ];
    return cb({ students });
  } catch (error) {
    return cbError("Failed to get all students", 500, error);
  }
}

// Get a single student by ID
export async function getStudentById(req?: Request) {
  try {
    // Dummy data
    const student = { id: req?.params.studentId, name: "Alice", age: 20 };
    return cb({ student });
  } catch (error) {
    return cbError("Failed to get student by ID", 500, error);
  }
}

// Create a new student
export async function createStudent(req?: Request) {
  try {
    // Dummy created student
    const student = {
      id: Date.now(),
      name: req?.body.name,
      age: req?.body.age,
    };
    return cb({ student }, 201);
  } catch (error) {
    return cbError("Failed to create student", 500, error);
  }
}

// Update a student by ID
export async function updateStudent(req?: Request) {
  try {
    // Dummy updated student
    const student = {
      id: req?.params.studentId,
      name: req?.body.name,
      age: req?.body.age,
    };
    return cb({ student });
  } catch (error) {
    return cbError("Failed to update student", 500, error);
  }
}

// Delete a student by ID
export async function deleteStudent(req?: Request) {
  try {
    // Dummy delete response
    return cb({ deleted: true });
  } catch (error) {
    return cbError("Failed to delete student", 500, error);
  }
}
