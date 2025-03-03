import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "caret-primary-500 flex h-10 w-full rounded-sm border border-border/20 bg-input px-3 py-1 text-base text-text shadow-sm outline-none ring-0 transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground hover:border-border focus:border-border focus:outline-none focus:ring-1 focus:ring-input focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
