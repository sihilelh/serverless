import { APIGatewayProxyEventV2 } from "aws-lambda";
import { Request } from "../common/types/http.interface";
import { Route, RouteGroup } from "../common/types/route.interface";
import { HttpMethod } from "aws-cdk-lib/aws-apigatewayv2";

// helper functions
export const generateRequestObject = (
  event: APIGatewayProxyEventV2
): Request => {
  return {
    body: JSON.parse(event.body || "{}"),
    query: event.queryStringParameters || {},
    params: event.pathParameters || {},
    headers: event.headers,
    path: event.requestContext.http.path,
    method: event.requestContext.http.method,
  };
};

export const generateRouteKeysFromRoutes = (
  routeGroup: RouteGroup,
  routeRoot: string
): {
  key: string;
  route: Route;
}[] => {
  // This will generate the route keys for the routes file
  // A route key is looks like this "GET /students/{studentId}" or "GET /students"

  // We will loop through the routes object and generate the route keys

  const routeKeys: {
    key: string;
    route: Route;
  }[] = [];
  const baseRoutes = Object.keys(routeGroup);

  for (const baseRoute of baseRoutes) {
    const methods = Object.keys(routeGroup[baseRoute]);
    for (const method of methods) {
      routeKeys.push({
        key: `${method} ${routeRoot}${baseRoute === "/" ? "" : baseRoute}`,
        route: routeGroup[baseRoute][method],
      });
    }
  }

  return routeKeys;
};

// This will be used to generate api gateway routes
export const generateRouteInfoFromRoutes = (
  routeGroup: RouteGroup,
  routeRoot: string
): {
  path: string;
  methods: HttpMethod[];
}[] => {
  // This will generate the route keys for the routes file
  // A route key is looks like this "GET /students/{studentId}" or "GET /students"

  // We will loop through the routes object and generate the route keys

  const routeInfo: {
    path: string;
    methods: HttpMethod[];
  }[] = [];
  const baseRoutes = Object.keys(routeGroup);

  for (const baseRoute of baseRoutes) {
    const methods = Object.keys(routeGroup[baseRoute]);
    routeInfo.push({
      path: `${routeRoot}${baseRoute === "/" ? "" : baseRoute}`, // If the baseRoute is "/" we will not add it to the path
      methods: methods.map((method) => method as HttpMethod),
    });
  }

  return routeInfo;
};
