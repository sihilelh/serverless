import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/atoms/form";
import { InputPassword } from "@/components/atoms/input-password";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/atoms/input-otp";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const ResetPasswordForm = (props: {
  onSubmit: (data: { confirmationCode: string; newPassword: string }) => void;
  isLoading: boolean;
  userEmail: string;
}) => {
  const form = useForm();

  const handleSubmit = (data: any) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!data.confirmationCode || data.confirmationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit confirmation code");
      return;
    }

    props.onSubmit({
      confirmationCode: data.confirmationCode,
      newPassword: data.newPassword,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="confirmationCode"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>Confirmation Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <InputPassword {...field} placeholder="Enter new password" />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    placeholder="Confirm new password"
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="w-full" loading={props.isLoading}>
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
