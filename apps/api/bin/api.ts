#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CommonResourceStack } from "../lib/commonResourceStack";
import { APP_CONFIG } from "../config/appConfig";

const app = new cdk.App();

new CommonResourceStack(
  app,
  `${APP_CONFIG.awsResourcePrefix}-CommonResourceStack`
);
