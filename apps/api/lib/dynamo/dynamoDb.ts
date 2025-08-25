import { CfnOutput, RemovalPolicy, Stack } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { APP_CONFIG } from "../../config/appConfig";

export class CreateDynamoDBTables {
  public readonly tables: Table[];
  public readonly studentTable: Table;
  constructor(stack: Stack) {
    const studentTable = this.createTables(stack, {
      tableName: "Students",
      partitionKey: { name: "id", type: AttributeType.STRING },
    });

    this.tables = [studentTable];

    // Assigning the tables to single variables
    this.studentTable = studentTable;
  }

  private createTables(
    stack: Stack,
    options: {
      tableName: string;
      partitionKey: { name: string; type: AttributeType };
    }
  ) {
    const table = new Table(
      stack,
      `${APP_CONFIG.awsResourcePrefix}-${options.tableName}Table`,
      {
        tableName: options.tableName,
        partitionKey: options.partitionKey,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

    // Output the table name
    new CfnOutput(
      stack,
      `${APP_CONFIG.awsResourcePrefix}-${options.tableName}TableName`,
      {
        value: table.tableName,
      }
    );

    return table;
  }
}
