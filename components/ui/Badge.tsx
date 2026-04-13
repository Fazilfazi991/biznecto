import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "teal" | "gray" | "pro" | "premium" | "free" | "hot" | "active" | "open";
}

function Badge({ className, variant = "teal", ...props }: BadgeProps) {
  const variants = {
    teal: "bg-teal-glass text-teal-dark border-teal-border",
    gray: "bg-sand text-muted border-border-brand",
    pro: "bg-[#dbeafe] text-blue",
    premium: "bg-[#ede9fe] text-purple",
    free: "bg-sand text-hint",
    hot: "bg-[#fef2f2] text-[#dc2626] uppercase tracking-[0.4px]",
    active: "bg-[#fffbeb] text-[#d97706] uppercase",
    open: "bg-teal-glass text-teal-dark uppercase",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
