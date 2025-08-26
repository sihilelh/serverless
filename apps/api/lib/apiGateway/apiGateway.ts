import { CfnOutput, Stack } from "aws-cdk-lib";
import { CorsHttpMethod, HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { APP_CONFIG } from "../../config/appConfig";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import path from "path";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { generateRouteInfoFromRoutes } from "../../src/utils/lambda.utils";
import {
  studentsRoutes,
  studentRouteConfig,
} from "../../src/routes/students.routes";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { CommonResourceStack } from "../commonResourceStack";
import { HttpUserPoolAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import { RouteConfig, RouteGroup } from "src/common/types/route.interface";

export class ApiGatewayLoader {
  private httpApi: HttpApi;
  private httpAuthorizer: HttpUserPoolAuthorizer;

  constructor(stack: Stack, commonResourceStack: CommonResourceStack) {
    this.createApiGateway(stack);
    this.httpAuthorizer = this.createCognitoAuthorizer(
      stack,
      commonResourceStack
    );

    this.createHandler(stack, commonResourceStack, {
      handlerName: "StudentsHandler",
      handlerFileName: "students.ts",
      routeGroup: studentsRoutes,
      routeConfig: studentRouteConfig,
    });

    // Output the api gateway url
    new CfnOutput(stack, `${APP_CONFIG.awsResourcePrefix}-ApiGatewayUrl`, {
      value: this.httpApi.url ?? "",
    });
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

  private createHandler(
    stack: Stack,
    commonResourceStack: CommonResourceStack,
    options: {
      handlerName: string;
      handlerFileName: string;
      routeGroup: RouteGroup;
      routeConfig: RouteConfig;
    }
  ) {
    // Change the handler name to the resource name
    const handlerName = options.handlerName;

    const handler = new NodejsFunction(
      stack,
      `${APP_CONFIG.awsResourcePrefix}-${handlerName}`,
      {
        // Change the path to the handler file
        entry: path.resolve(__dirname, "../../src/handlers", options.handlerFileName),
        handler: "handler",
        runtime: Runtime.NODEJS_20_X,
        environment: this.generateLambdaEnv(commonResourceStack),
        bundling: {
          forceDockerBundling: false,
          externalModules: ["@aws-sdk/*", "@smithy/*"],
          nodeModules: ["ajv", "ajv-formats"],
          tsconfig: path.resolve(__dirname, "../../tsconfig.json"),
          format: OutputFormat.CJS,
          target: "node20"
        }
      }
    );

    // Granting permissions to the lambda function
    this.grantLambdaPermissions(stack, handler, commonResourceStack);

    // Change the route details to relevant to the handler
    const routeInfo = generateRouteInfoFromRoutes(
      options.routeGroup,
      options.routeConfig.routeRoot
    );

    for (const route of routeInfo) {
      this.httpApi.addRoutes({
        path: route.path,
        methods: route.methods,
        integration: new HttpLambdaIntegration(
          `${APP_CONFIG.awsResourcePrefix}-${handlerName}-Integration`,
          handler
        ),
        authorizer: options.routeConfig.cognitoAuthorizer
          ? this.httpAuthorizer
          : undefined,
      });
    }
  }

  private grantLambdaPermissions(
    stack: Stack,
    lambdaFunction: NodejsFunction,
    commonResourceStack: CommonResourceStack
  ) {
    // Granting dynamo db permissions to the lambda function
    for (const table of commonResourceStack.dynamoDBTables.tables) {
      table.grantReadWriteData(lambdaFunction);
    }

    // Granting s3 permissions to the lambda function
    commonResourceStack.s3Buckets.appBucket.grantReadWrite(lambdaFunction);
  }

  private createCognitoAuthorizer(
    stack: Stack,
    commonResourceStack: CommonResourceStack
  ) {
    const httpAuthorizer = new HttpUserPoolAuthorizer(
      `${APP_CONFIG.awsResourcePrefix}-HttpApiGatewayAuthorizer`,
      commonResourceStack.cognitoUserPool.userPool,
      {
        authorizerName: `${APP_CONFIG.awsResourcePrefix}-HttpApiGatewayAuthorizer`,
        userPoolClients: [commonResourceStack.cognitoUserPool.userPoolClient],
      }
    );

    return httpAuthorizer;
  }

  private generateLambdaEnv(
    commonResourceStack: CommonResourceStack
  ): Record<string, string> {
    return {
      STUDENT_TABLE_NAME:
        commonResourceStack.dynamoDBTables.studentTable.tableName,
    };
  }
}
