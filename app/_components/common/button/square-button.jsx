import { cn } from "@/lib/utils";
import React from "react";

const SquareButton = ({ state, action, rule, children, className }) => {
  return (
    <div
      onClick={() => action(rule)}
      className={cn(
        `grid h-10 w-20 min-w-20 cursor-pointer place-items-center rounded-md border bg-button transition-colors duration-200 ${className}`,
        state === rule && "bg-background",
      )}
    >
      {children}
    </div>
  );
};

export default SquareButton;
