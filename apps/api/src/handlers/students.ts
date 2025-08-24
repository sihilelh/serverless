import {
  APIGatewayProxyEventV2,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { studentRouteRoot, studentsRoutes } from "../routes/students.routes";
import { Request, Response } from "../common/types/http.interface";
import {
  generateRequestObject,
  generateRouteKeysFromRoutes,
} from "../utils/lambda.utils";
import { cbError } from "../utils/http.utils";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    // Checking if a route is defined in the routes file
    // Because we are using dynamically generated routes we will use routeKey to check if a route is defined
    const routeKey = event.routeKey;

    console.log("Incoming Request: ", { routeKey, path: event.rawPath });

    const availableRouteKeys = generateRouteKeysFromRoutes(
      studentsRoutes,
      studentRouteRoot
    );

    if (!availableRouteKeys.some((route) => route.key === routeKey)) {
      return cbError("Route not found", 404);
    }

    // Getting the route object
    const route = availableRouteKeys.find(
      (route) => route.key === routeKey
    )?.route;

    if (!route) {
      return cbError("Route not found", 404);
    }

    // let's create a global request object
    let request: Request = generateRequestObject(event);

    // We give the freedom to use as many as middlewares to use
    // So we have to handle those many middleware that is provided

    // Checking if the route has middlewares
    if (route.middlewares) {
      // Loop through the middlewares
      for (const middleware of route.middlewares) {
        const middlewareResult = await middleware(
          request,
          async (updatedRequest: Request) => {
            request = updatedRequest;
          }
        );
        if (middlewareResult) {
          return middlewareResult;
        }
      }
    }

    // Calling the handler
    return await route.handler(request);
  } catch (error: any) {
    return cbError("Lambda function failed to process request", 500, error);
  }
};
