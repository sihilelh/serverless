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

export const LoginForm = (props: {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}) => {
  const form = useForm();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem className="mb-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-full" loading={props.isLoading}>
          Login
        </Button>
      </form>
    </Form>
  );
};
