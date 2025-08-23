// Dummy CRUD functions for student table (not express type lambda)

interface Request {
  body: Record<string, any>;
  query: Record<string, any>;
  params: Record<string, any>;
  headers: Record<string, any>;
  path: string;
  method: string;
}

// Get all students
export function getAllStudents(req?: Request) {
  // Dummy data
  return [
    { id: 1, name: "Alice", age: 20 },
    { id: 2, name: "Bob", age: 22 },
  ];
}

// Get a single student by ID
export function getStudentById(req?: Request) {
  // Dummy data
  return { id: req?.params.studentId, name: "Alice", age: 20 };
}

// Create a new student
export function createStudent(req?: Request) {
  // Dummy created student
  return { id: Date.now(), name: req?.body.name, age: req?.body.age };
}

// Update a student by ID
export function updateStudent(req?: Request) {
  // Dummy updated student
  return {
    id: req?.params.studentId,
    name: req?.body.name,
    age: req?.body.age,
  };
}

// Delete a student by ID
export function deleteStudent(req?: Request) {
  // Dummy delete response
  return true;
}
