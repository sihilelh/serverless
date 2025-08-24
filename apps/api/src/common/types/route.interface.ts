import { APIGatewayProxyResult } from "aws-lambda";
import { Request } from "./http.interface";

// Middleware is a function that will be called before the handler is called
// It will be called with the request object and a next function
// The next function will be called with the request object for the next middleware
// So that we can modify the request object inside middleware
export type Middleware = (
  request: Request,
  next: (request: Request) => Promise<void | APIGatewayProxyResult>
) => Promise<void | APIGatewayProxyResult>;

export interface Route {
  middlewares?: Array<Middleware>;
  handler: (request?: Request) => Promise<APIGatewayProxyResult>;
}

export interface RouteGroup {
  [path: string]: {
    [method: string]: Route;
  };
}

export interface RouteConfig {
  routeRoot: string;
  cognitoAuthorizer?: boolean;
}
