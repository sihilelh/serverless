import { useTheme } from "@/providers/themeProvider";
import LogoImage from "@/assets/images/logo.png";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/shadcn.utils";
import { APP_CONFIG } from "@/config/app.config";

const logoVariants = cva("", {
  variants: {
    size: {
      sm: "h-8",
      md: "h-12",
      lg: "h-18",
      xl: "h-24",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Logo = ({
  size,
  ...props
}: React.ComponentProps<"img"> & VariantProps<typeof logoVariants>) => {
  const { theme } = useTheme();

  return (
    <img
      className={cn(logoVariants({ size }), theme === "light" ? "invert" : "")}
      src={LogoImage}
      alt={`${APP_CONFIG.APP_NAME}-logo`}
      {...props}
    />
  );
};
