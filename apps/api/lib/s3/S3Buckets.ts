import { RemovalPolicy, Stack } from "aws-cdk-lib";
import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { APP_CONFIG } from "../../config/appConfig";

export class S3Buckets {
  public readonly appBucket: Bucket;

  constructor(stack: Stack) {
    this.appBucket = this.createStorageBucket(stack, "app");
  }

  private createStorageBucket(stack: Stack, bucketNameSuffix: string) {
    const bucketName =
      `${APP_CONFIG.awsResourcePrefix}-${bucketNameSuffix}-${APP_CONFIG.uniqueId}`.toLocaleLowerCase();

    const bucket = new Bucket(stack, bucketName, {
      bucketName: bucketName,
      removalPolicy: RemovalPolicy.DESTROY,
      encryption: BucketEncryption.S3_MANAGED,
      versioned: true,
    });

    return bucket;
  }
}
