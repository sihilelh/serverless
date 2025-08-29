import { APIGatewayProxyResult } from "aws-lambda";
import { ErrorResponse, Response } from "../common/types/http.interface";

export const cb = (
  data: Record<string, any>,
  statusCode: number = 200,
  headers: Record<string, string> = {}
): APIGatewayProxyResult => {
  const body: Response = {
    status: statusCode,
    data,
  };
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};

export const cbError = (
  message: string,
  statusCode: number = 500,
  error: any = "Internal Server Error",
  data?: Record<string, any>,
  headers: Record<string, string> = {}
): APIGatewayProxyResult => {
  const body: ErrorResponse = {
    status: statusCode,
    message,
    error,
    data,
  };
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};
