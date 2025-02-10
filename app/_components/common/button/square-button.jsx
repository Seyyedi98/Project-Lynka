import { cn } from "@/lib/utils";
import React from "react";

const SquareButton = ({ state, action, rule, children, className }) => {
  return (
    <div
      onClick={() => action(rule)}
      className={cn(
        `grid h-10 w-[72px] min-w-[72px] cursor-pointer place-items-center rounded-md border bg-button text-sm transition-colors duration-200 ${className}`,
        state === rule && "bg-background",
      )}
    >
      {children}
    </div>
  );
};

export default SquareButton;
