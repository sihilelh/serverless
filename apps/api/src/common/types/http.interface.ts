export interface Request {
  body: Record<string, any>;
  query: Record<string, string | undefined>;
  params: Record<string, string | undefined>;
  headers: Record<string, string | undefined>;
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
