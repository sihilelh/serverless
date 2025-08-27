import { cn } from "@/utils/shadcn.utils";
import { cva, type VariantProps } from "class-variance-authority";

const listVariants = cva("my-6", {
  variants: {
    variant: {
      default: "ml-6 list-disc [&>li]:mt-2",
      ordered: "ml-6 list-decimal [&>li]:mt-2",
      unstyled: "my-0",
    },
  },
});

export const List = ({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<"ul"> & VariantProps<typeof listVariants>) => {
  return (
    <ul
      data-slot="list"
      className={cn(listVariants({ variant, className }))}
      {...props}
    >
      {children}
    </ul>
  );
};

export const ListItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<"li">) => {
  return (
    <li data-slot="list-item" className={cn(className)} {...props}>
      {children}
    </li>
  );
};
