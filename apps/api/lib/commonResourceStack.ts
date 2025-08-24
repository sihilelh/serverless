import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CognitoUserPool } from "./cognito/userPool";
import { S3Buckets } from "./s3/S3Buckets";
import { CreateDynamoDBTables } from "./dynamo/dynamoDb";

export class CommonResourceStack extends Stack {
  public readonly cognitoUserPool: CognitoUserPool;
  public readonly s3Buckets: S3Buckets;
  public readonly dynamoDBTables: CreateDynamoDBTables;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Setting up the Cognito User Pool and its resources
    this.cognitoUserPool = new CognitoUserPool(this);

    // Setting up the S3 Buckets
    this.s3Buckets = new S3Buckets(this);

    // Setting up the DynamoDB Tables
    this.dynamoDBTables = new CreateDynamoDBTables(this);
  }
}
