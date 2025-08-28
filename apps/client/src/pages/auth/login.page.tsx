import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import {
  confirmSignInService,
  resetPasswordService,
  signInService,
  signOutService,
} from "@/services/auth.service";
import { getFormValues } from "@/utils/form.utils";
import { useState } from "react";
import { LoginForm } from "./components/loginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { H1, H2, Text } from "@/components/atoms/typography";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/constants/routes.constants";
import { toast } from "sonner";
import { ConfirmSignInForm } from "./components/confirmSignInForm";
import { AppLayout } from "@/layouts/app.layout";
import { PageLayout } from "@/layouts/page.layout";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forceConfirmSignIn, setForceConfirmSignIn] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      await signOutService();
      const response = await signInService({
        username: data.username,
        password: data.password,
      });
      if (response.nextStep.signInStep === "DONE") {
        navigate(ROUTES.DASHBOARD.HOME);
      }
      if (
        response.nextStep.signInStep ===
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        setForceConfirmSignIn(true);
      }
    } catch (error) {
      toast.error("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSignIn = async (data: { password: string }) => {
    setIsLoading(true);
    try {
      const response = await confirmSignInService({
        challengeResponse: data.password,
      });
      if (response.nextStep.signInStep === "DONE") {
        navigate(ROUTES.DASHBOARD.HOME);
      }
    } catch (error) {
      toast.error("Invalid password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>
                <H2>{forceConfirmSignIn ? "Reset Password" : "Login"}</H2>
              </CardTitle>
              <CardDescription>
                <Text variant={"muted"}>
                  {forceConfirmSignIn
                    ? "Since this is the first time you are logging in, please reset your password"
                    : "Please enter your credentials to continue"}
                </Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {forceConfirmSignIn ? (
                <ConfirmSignInForm
                  onSubmit={handleConfirmSignIn}
                  isLoading={isLoading}
                />
              ) : (
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full text-center">
                <Text variant={"muted"} inline>
                  Forgot your password?
                </Text>{" "}
                <Link to="/forgot-password">
                  <Text variant={"muted"} italic inline>
                    Reset password
                  </Text>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};
