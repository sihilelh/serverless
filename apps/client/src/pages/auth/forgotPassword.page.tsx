import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { H2, Text } from "@/components/atoms/typography";
import { resetPasswordService } from "@/services/auth.service";
import { ROUTES } from "@/types/constants/routes.constants";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ForgotPasswordForm } from "./components/forgotPasswordForm";
import { ResetPasswordForm } from "./components/resetPasswordForm";
import { confirmResetPasswordService } from "@/services/auth.service";
import { AppLayout } from "@/layouts/app.layout";
import { PageLayout } from "@/layouts/page.layout";

export const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "reset">("reset");
  const [userEnteredEmail, setUserEnteredEmail] = useState(""); // Store user input
  const [destinationEmail, setDestinationEmail] = useState(""); // Store censored email from response
  const navigate = useNavigate();

  const handleSendResetCode = async (data: { username: string }) => {
    setIsLoading(true);
    try {
      const response = await resetPasswordService({ username: data.username });

      // Store the user-entered email/username for the reset service
      setUserEnteredEmail(data.username);

      // Store the censored destination email for display
      if (response.nextStep?.codeDeliveryDetails?.destination) {
        setDestinationEmail(response.nextStep.codeDeliveryDetails.destination);
      } else {
        setDestinationEmail(data.username);
      }

      setStep("reset");
      toast.success("Reset code sent to your email");
    } catch (error) {
      toast.error(
        "Failed to send reset code. Please check your email/username and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: {
    confirmationCode: string;
    newPassword: string;
  }) => {
    setIsLoading(true);
    try {
      await confirmResetPasswordService({
        username: userEnteredEmail, // Use the original user input
        confirmationCode: data.confirmationCode,
        newPassword: data.newPassword,
      });

      toast.success(
        "Password reset successfully! Please login with your new password."
      );
      navigate(ROUTES.AUTH.LOGIN);
    } catch (error) {
      toast.error(
        "Failed to reset password. Please check your code and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setUserEnteredEmail("");
    setDestinationEmail("");
  };

  return (
    <PageLayout>
      <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>
                <H2>
                  {step === "email" ? "Forgot Password" : "Reset Password"}
                </H2>
              </CardTitle>
              <CardDescription>
                <Text variant={"muted"}>
                  {step === "email"
                    ? "Enter your email or username to receive a reset code"
                    : `Enter the code sent to your email (${destinationEmail}) and your new password`}
                </Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "email" ? (
                <ForgotPasswordForm
                  onSubmit={handleSendResetCode}
                  isLoading={isLoading}
                />
              ) : (
                <>
                  <ResetPasswordForm
                    onSubmit={handleResetPassword}
                    isLoading={isLoading}
                    userEmail={destinationEmail}
                  />
                  <Button
                    variant="secondary"
                    onClick={handleBackToEmail}
                    disabled={isLoading}
                    className="w-full mt-4"
                  >
                    Back to email entry
                  </Button>
                </>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full text-center">
                <Text variant={"muted"} inline>
                  Remember your password?
                </Text>{" "}
                <Link to={ROUTES.AUTH.LOGIN}>
                  <Text variant={"muted"} italic inline>
                    Back to login
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
