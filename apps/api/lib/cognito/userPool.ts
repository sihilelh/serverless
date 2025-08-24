import { Stack, CfnOutput } from "aws-cdk-lib";
import {
  UserPool,
  AccountRecovery,
  UserPoolClient,
  CfnUserPoolDomain,
  UserPoolGroup,
  CfnUserPoolGroup,
} from "aws-cdk-lib/aws-cognito";
import { APP_CONFIG } from "../../config/appConfig";

export class CognitoUserPool {
  public readonly userPool: UserPool;
  public readonly userPoolClient: UserPoolClient;
  public readonly userPoolDomain: CfnUserPoolDomain;

  constructor(stack: Stack) {
    // Creating the User Pool
    this.userPool = this.createUserPool(stack);

    // Creating the User Pool Client
    this.userPoolClient = this.createUserPoolClient(stack, this.userPool);

    // Creating the User Pool Domain
    // this.userPoolDomain = this.createUserPoolDomain(stack, this.userPool);

    // Creating the User Groups
    this.createUserGroups(stack, this.userPool);

    // Outputs
    new CfnOutput(stack, `${APP_CONFIG.awsResourcePrefix}-UserPoolId`, {
      value: this.userPool.userPoolId,
    });
    new CfnOutput(stack, `${APP_CONFIG.awsResourcePrefix}-UserPoolClientId`, {
      value: this.userPoolClient.userPoolClientId,
    });
  }

  private createUserPool(stack: Stack): UserPool {
    // Setting up the User Pool
    return new UserPool(stack, `${APP_CONFIG.awsResourcePrefix}-UserPool`, {
      userPoolName: `${APP_CONFIG.awsResourcePrefix}-UserPool`,
      selfSignUpEnabled: false,
      signInAliases: {
        email: true,
        username: true,
      },
      signInCaseSensitive: false,
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireSymbols: true,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
    });
  }

  private createUserPoolClient(
    stack: Stack,
    userPool: UserPool
  ): UserPoolClient {
    return new UserPoolClient(
      stack,
      `${APP_CONFIG.awsResourcePrefix}-UserPoolClient`,
      {
        userPool: userPool,
        userPoolClientName: `${APP_CONFIG.awsResourcePrefix}-UserPoolClient`,
        authFlows: {
          userPassword: true,
          userSrp: true,
        },
      }
    );
  }

  private createUserPoolDomain(
    stack: Stack,
    userPool: UserPool
  ): CfnUserPoolDomain {
    // Create a more unique domain name to avoid conflicts
    const uniqueDomainName =
      `${APP_CONFIG.cognitoDomainPrefix}-${stack.account}-${stack.region}`
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "");

    return new CfnUserPoolDomain(
      stack,
      `${APP_CONFIG.awsResourcePrefix}-UserPoolDomain`,
      {
        domain: uniqueDomainName,
        userPoolId: userPool.userPoolId,
      }
    );
  }

  private createUserGroups(stack: Stack, userPool: UserPool) {
    const userGroupNames = APP_CONFIG.cognitoUserGroups;
    for (const userGroupName of userGroupNames) {
      new CfnUserPoolGroup(
        stack,
        `${APP_CONFIG.awsResourcePrefix}-UserGroup-${userGroupName}`,
        {
          groupName: userGroupName,
          userPoolId: userPool.userPoolId,
          description: `${APP_CONFIG.awsResourcePrefix} App ${userGroupName}`,
        }
      );
    }
  }
}
