import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";

export class ApiResourceStack extends Stack {
  private httpApi: HttpApi;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


  }

}
