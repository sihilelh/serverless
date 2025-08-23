export interface Request {
  body: Record<string, any>;
  query: Record<string, any>;
  params: Record<string, any>;
  headers: Record<string, any>;
  path: string;
  method: string;
}

export interface Response {
  status: number;
  data: Record<string, any>;
}

export interface ErrorResponse {
  status: number;
  message: string;
  error: string;
  data?: Record<string, any>;
}
