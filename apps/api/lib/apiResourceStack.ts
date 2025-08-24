import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiGatewayLoader } from "./apiGateway/apiGateway";
export class ApiResourceStack extends Stack {
  private apiGatewayLoader: ApiGatewayLoader;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.apiGatewayLoader = new ApiGatewayLoader(this);
  }
}
