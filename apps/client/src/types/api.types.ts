import { Student, CreateStudentDto, UpdateStudentDto, FilterStudentDto } from '@workspace/types';

// Response types that match backend wrapper format
export interface StudentResponse {
  student: Student;
}

export interface StudentsResponse {
  students: Student[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface DeleteStudentResponse {
  message: string;
  deletedId: string;
}

// Service method return types (unwrapped data)
export interface GetAllStudentsResult {
  students: Student[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface GetStudentByIdResult {
  student: Student;
}

export interface CreateStudentResult {
  student: Student;
}

export interface UpdateStudentResult {
  student: Student;
}

export interface DeleteStudentResult {
  message: string;
  deletedId: string;
}

// Error callback types
export interface StudentServiceErrorCallbacks {
  400?: (status: number, error: any) => void;
  401?: (status: number, error: any) => void;
  403?: (status: number, error: any) => void;
  404?: (status: number, error: any) => void;
  422?: (status: number, error: any) => void;
  500?: (status: number, error: any) => void;
}
