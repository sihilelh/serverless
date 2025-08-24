import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiGatewayLoader } from "./apiGateway/apiGateway";
import { CommonResourceStack } from "./commonResourceStack";

interface ApiResourceStackProps extends StackProps {
  commonResourceStack: CommonResourceStack;
}
export class ApiResourceStack extends Stack {
  private apiGatewayLoader: ApiGatewayLoader;
  constructor(scope: Construct, id: string, props: ApiResourceStackProps) {
    super(scope, id, props);

    this.apiGatewayLoader = new ApiGatewayLoader(
      this,
      props.commonResourceStack
    );
  }
}
