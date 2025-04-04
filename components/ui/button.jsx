import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-stone-900/90 hover:text-white text-white shadow-md border-[1px] border-white/30 hover:bg-stone-900/80",
        primary: "text-primary bg-button-600/90 hover:bg-button-600",
        primary_2:
          "text-white hover:bg-primary-hover duration-200 transition-color font-medium bg-primary rounded-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-[1px] dark:text-text/40 hover:dark:text-text/80 text-text/60 hover:text-text/80 border-border/60 bg-none hover:border-border hover:border-1  shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-2 py-2",
        sm: "h-8 rounded-sm px-3 sm:px-6 text-xs",
        md: "h-10 px-3",
        lg: "h-10 rounded-md px-8",
        rounded: "rounded-full h-7 px-4",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
