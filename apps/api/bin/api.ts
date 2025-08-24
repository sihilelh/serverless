#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CommonResourceStack } from "../lib/commonResourceStack";
import { APP_CONFIG } from "../config/appConfig";
import { ApiResourceStack } from "../lib/apiResourceStack";

const app = new cdk.App();

const commonResourceStack = new CommonResourceStack(
  app,
  `${APP_CONFIG.awsResourcePrefix}-CommonResourceStack`
);

const apiResourceStack = new ApiResourceStack(
  app,
  `${APP_CONFIG.awsResourcePrefix}-ApiResourceStack`,
  {
    commonResourceStack: commonResourceStack,
  }
);

apiResourceStack.addDependency(commonResourceStack);
