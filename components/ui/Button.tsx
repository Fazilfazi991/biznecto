import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "sand" | "blue" | "ghost";
  size?: "default" | "sm" | "lg" | "full";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary: "bg-teal text-white hover:bg-teal-dark",
      outline: "bg-transparent text-ink border-1.5 border-border-brand hover:border-ink",
      sand: "bg-sand text-body hover:bg-sand-2",
      blue: "bg-blue text-white hover:bg-blue/90",
      ghost: "bg-transparent hover:bg-sand text-muted",
    };

    const sizes = {
      default: "px-4.5 py-2.5 text-[13px]",
      sm: "px-3 py-2 text-[12px]",
      lg: "px-6 py-3 text-[14px]",
      full: "w-full justify-center px-4.5 py-2.5 text-[13px]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-sans font-semibold rounded-brand transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
