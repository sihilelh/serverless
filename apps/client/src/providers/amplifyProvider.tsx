import { APP_CONFIG } from "@/config/app.config";
import { Amplify } from "aws-amplify";

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: APP_CONFIG.COGNITO_USER_POOL_ID,
      userPoolClientId: APP_CONFIG.COGNITO_CLIENT_ID,
      region: APP_CONFIG.REGION,
    },
  },
};

Amplify.configure(amplifyConfig);

export const AmplifyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};
