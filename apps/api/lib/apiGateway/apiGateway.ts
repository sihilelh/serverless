import { Stack } from "aws-cdk-lib";
import { CorsHttpMethod, HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { APP_CONFIG } from "../../config/appConfig";
import fs from "fs";
import { NodejsFunction, SourceMapMode } from "aws-cdk-lib/aws-lambda-nodejs";
import path from "path";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { generateRouteInfoFromRoutes } from "../../src/utils/lambda.utils";
import {
  studentsRoutes,
  studentRouteRoot,
} from "../../src/routes/students.routes";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

export class ApiGatewayLoader {
  private httpApi: HttpApi;

  constructor(stack: Stack) {
    this.createApiGateway(stack);
    this.initStudentHandler(stack);
  }

  private createApiGateway(stack: Stack) {
    this.httpApi = new HttpApi(
      stack,
      `${APP_CONFIG.awsResourcePrefix}-HttpApiGateway`,
      {
        apiName: `${APP_CONFIG.awsResourcePrefix}-HttpApiGateway`,
        description: `${APP_CONFIG.awsResourcePrefix} Http Api Gateway`,
        corsPreflight: {
          allowCredentials: true,
          allowHeaders: ["*"],
          allowMethods: [CorsHttpMethod.ANY],
          allowOrigins: APP_CONFIG.allowedOrigins,
        },
      }
    );
  }

  // We have to create the api gateway routes and lambda functions based on our main routes
  private initStudentHandler(stack: Stack) {
    // Change the handler name to the resource name
    const handlerName = "StudentsHandler";

    const studentHandler = new NodejsFunction(
      stack,
      `${APP_CONFIG.awsResourcePrefix}-${handlerName}`,
      {
        // Change the path to the handler file
        entry: path.resolve(__dirname, "../../src/handlers/students.ts"),
        handler: "handler",
        runtime: Runtime.NODEJS_20_X,
      }
    );

    // TODO: If there is any permission that is required for the handler, we have to add it here

    // Change the route details to relevant to the handler
    const routeInfo = generateRouteInfoFromRoutes(
      studentsRoutes,
      studentRouteRoot
    );

    for (const route of routeInfo) {
      this.httpApi.addRoutes({
        path: route.path,
        methods: route.methods,
        integration: new HttpLambdaIntegration(
          `${APP_CONFIG.awsResourcePrefix}-${handlerName}-Integration`,
          studentHandler
        ),
      });
    }
  }
}
