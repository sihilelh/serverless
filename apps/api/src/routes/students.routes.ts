import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const studentsRoutes = {
  "/": {
    GET: {
      middlewares: [authMiddleware],
      handler: getAllStudents,
    },
    POST: createStudent,
  },
  "/{studentId}": {
    GET: {
      middlewares: [authMiddleware],
      handler: getStudentById,
    },
    PUT: {
      middlewares: [authMiddleware],
      handler: updateStudent,
    },
    DELETE: {
      middlewares: [authMiddleware],
      handler: deleteStudent,
    },
  },
};
