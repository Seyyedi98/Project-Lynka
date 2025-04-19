import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "caret-primary-500 flex min-h-[60px] w-full rounded-sm border border-border/20 bg-input px-3 py-2 text-base text-text shadow-sm outline-none ring-0 transition-all duration-300 hover:border-border focus:border-border focus:outline-none focus:ring-1 focus:ring-input focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
