import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { InputPassword } from "@/components/atoms/input-password";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const ConfirmSignInForm = (props: {
  onSubmit: (data: { password: string }) => void;
  isLoading: boolean;
}) => {
  const form = useForm();

  const handleSubmit = (data: any) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    props.onSubmit({
      password: data.newPassword,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <InputPassword {...field} />
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
