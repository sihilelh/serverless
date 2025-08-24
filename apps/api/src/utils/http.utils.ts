import { APIGatewayProxyResult } from "aws-lambda";
import { ErrorResponse, Response } from "../common/types/http.interface";

export const cb = (
  data: Record<string, any>,
  statusCode: number = 200
): APIGatewayProxyResult => {
  const body: Response = {
    status: statusCode,
    data,
  };
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export const cbError = (
  message: string,
  statusCode: number = 500,
  error: any = "Internal Server Error",
  data?: Record<string, any>
): APIGatewayProxyResult => {
  const body: ErrorResponse = {
    status: statusCode,
    message,
    error,
    data,
  };
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};
