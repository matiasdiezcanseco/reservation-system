import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

export interface TypographyProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  variant: "h1" | "h2" | "h3" | "h4" | "p";
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  fontSize?: "default" | "small" | "large";
}

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
    },
    fontSize: {
      default: "",
      small: "text-sm",
      large: "text-lg",
    },
  },
  defaultVariants: {
    variant: "p",
    fontSize: "default",
  },
});

export function Typography({
  className,
  children,
  variant,
  fontSize,
  tag,
  ...props
}: TypographyProps) {
  const Tag = tag ?? variant;

  return (
    <Tag
      className={cn(typographyVariants({ variant, fontSize, className }))}
      {...props}
    >
      {children}
    </Tag>
  );
}
