import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";
import { ValidateQueryParams, ValidateRequest } from "../middleware/validate.middleware";
import { RouteGroup, RouteConfig } from "../common/types/route.interface";
import { createStudentSchema, filterStudentDtoSchema, updateStudentDtoSchema } from "@workspace/types";

// Root route for students
export const studentRouteConfig: RouteConfig = {
  routeRoot: "/students",
  cognitoAuthorizer: true,
};

// Route config for students
export const studentsRoutes: RouteGroup = {
  "/": {
    GET: {
      middlewares: [ValidateQueryParams(filterStudentDtoSchema)],
      handler: getAllStudents,
    },
    POST: {
      middlewares: [ValidateRequest(createStudentSchema)],
      handler: createStudent,
    },
  },
  "/{studentId}": {
    GET: {
      handler: getStudentById,
    },
    PUT: {
      middlewares: [ValidateRequest(updateStudentDtoSchema)],
      handler: updateStudent,
    },
    DELETE: {
      handler: deleteStudent,
    },
  },
};
