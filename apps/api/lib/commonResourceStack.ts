import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CognitoUserPool } from "./cognito/userPool";

export class CommonResourceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Setting up the Cognito User Pool and its resources
    new CognitoUserPool(this);


  }
}
