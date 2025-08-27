import { cn } from "@/utils/shadcn.utils";
import type React from "react";
import { Input } from "@/components/atoms/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export const InputPassword = ({
  containerProps,
  ...props
}: React.ComponentProps<"input"> & {
  containerProps?: React.ComponentProps<"div">;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      data-slot="input-password"
      {...containerProps}
      className={cn("relative", containerProps?.className)}
    >
      <Input type={showPassword ? "text" : "password"} {...props} />
      <button
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
        type="button"
      >
        {showPassword ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </div>
  );
};
