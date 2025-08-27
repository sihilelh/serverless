import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useForm } from "react-hook-form";

export const ForgotPasswordForm = (props: {
  onSubmit: (data: { username: string }) => void;
  isLoading: boolean;
}) => {
  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit as any)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your email or username"
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-full" loading={props.isLoading}>
          Send Reset Code
        </Button>
      </form>
    </Form>
  );
};
