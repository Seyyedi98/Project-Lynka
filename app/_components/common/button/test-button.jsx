"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const types = cva("h-12 w-24 rounded-lg p-2", {
  variants: {
    variant: {
      normal: "bg-sky-400",
      pro: "bg-brand-500",
    },
  },
});

const TestButton = ({ className, variant, asChild = false, ...props }) => {
  return <div className={cn(types({ variant, className }))}>TestButton</div>;
};

export default TestButton;
