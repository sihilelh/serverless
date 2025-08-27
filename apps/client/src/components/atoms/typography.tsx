import { cn } from "@/utils/shadcn.utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const typographyClasses = {
  h1: "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic",
};

export const H1 = ({
  className,
  asChild,
  children,
  ...props
}: React.ComponentProps<"h1"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "h1";
  return (
    <Comp className={cn(typographyClasses.h1, className)} {...props}>
      {children}
    </Comp>
  );
};

export const H2 = ({
  className,
  asChild,
  children,
  ...props
}: React.ComponentProps<"h2"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "h2";
  return (
    <Comp className={cn(typographyClasses.h2, className)} {...props}>
      {children}
    </Comp>
  );
};
export const H3 = ({
  className,
  asChild,
  children,
  ...props
}: React.ComponentProps<"h3"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "h3";
  return (
    <Comp className={cn(typographyClasses.h3, className)} {...props}>
      {children}
    </Comp>
  );
};

export const H4 = ({
  className,
  asChild,
  children,
  ...props
}: React.ComponentProps<"h4"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "h4";
  return (
    <Comp className={cn(typographyClasses.h4, className)} {...props}>
      {children}
    </Comp>
  );
};

export const P = ({
  className,
  asChild,
  children,
  ...props
}: React.ComponentProps<"p"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp className={cn(typographyClasses.p, className)} {...props}>
      {children}
    </Comp>
  );
};

export const Blockquote = ({
  className,
  asChild,
  children,
  ...props
}: React.ComponentProps<"blockquote"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "blockquote";
  return (
    <Comp className={cn(typographyClasses.blockquote, className)} {...props}>
      {children}
    </Comp>
  );
};

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    inline: {
      true: "inline",
      false: "block",
    },
    truncate: {
      true: "truncate",
      false: "break-words",
    },
    underline: {
      true: "underline",
      false: "no-underline",
    },
    strikethrough: {
      true: "line-through",
    },
    italic: {
      true: "italic",
      false: "not-italic",
    },
    uppercase: {
      true: "uppercase",
      false: "lowercase",
    },
    lowercase: {
      true: "lowercase",
      false: "uppercase",
    },
    capitalize: {
      true: "capitalize",
      false: "normal-case",
    },
    nowrap: {
      true: "whitespace-nowrap",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
  },
});

export const Text = ({
  className,
  variant,
  children,
  size,
  weight,
  asChild,
  inline,
  truncate,
  underline,
  strikethrough,
  italic,
  uppercase,
  lowercase,
  capitalize,
  nowrap,
  align,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : inline === true ? "span" : "p";

  return (
    <Comp
      className={cn(
        textVariants({
          variant,
          size,
          weight,
          className,
          inline,
          truncate,
          underline,
          strikethrough,
          italic,
          uppercase,
          lowercase,
          capitalize,
          nowrap,
          align,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
