import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { RouteGroup } from "../common/types/route.interface";

// Root route for students
export const studentRouteRoot = "/students";

// Route config for students
export const studentsRoutes: RouteGroup = {
  "/": {
    GET: {
      middlewares: [authMiddleware],
      handler: getAllStudents,
    },
    POST: {
      middlewares: [authMiddleware],
      handler: createStudent,
    },
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
