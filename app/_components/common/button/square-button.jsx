import { cn } from "@/lib/utils";
import React from "react";

const SquareButton = ({ state, action, rule, children, className }) => {
  return (
    <div
      onClick={() => action(rule)}
      className={cn(
        `grid h-10 min-w-[72px] flex-1 cursor-pointer place-items-center bg-button text-sm text-text/60 shadow transition-colors duration-200 ${className}`,
        state === rule && "bg-background/50 text-text shadow-none",
      )}
    >
      {children}
    </div>
  );
};

export default SquareButton;
