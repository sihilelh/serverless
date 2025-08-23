import { Stack } from "aws-cdk-lib";
import { CorsHttpMethod, HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { APP_CONFIG } from "../../config/appConfig";
import fs from "fs";
import { NodejsFunction, SourceMapMode } from "aws-cdk-lib/aws-lambda-nodejs";
import path from "path";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export class ApiGatewayLoader {
  private httpApi: HttpApi;
  private handlers: NodejsFunction[];

  constructor(stack: Stack) {}

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

  private initHandlers(stack: Stack) {
  
  }
}
