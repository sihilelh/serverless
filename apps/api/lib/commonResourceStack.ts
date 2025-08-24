import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CognitoUserPool } from "./cognito/userPool";
import { S3Buckets } from "./s3/S3Buckets";
import { CreateDynamoDBTables } from "./dynamo/dynamoDb";

export class CommonResourceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Setting up the Cognito User Pool and its resources
    new CognitoUserPool(this);

    // Setting up the S3 Buckets
    new S3Buckets(this);

    // Setting up the DynamoDB Tables
    new CreateDynamoDBTables(this);
  }
}
