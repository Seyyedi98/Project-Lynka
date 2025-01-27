import { cn } from "@/lib/utils";
import React from "react";

const SquareButton = ({ state, action, rule, children }) => {
  return (
    <div
      onClick={() => action(rule)}
      className={cn(
        `grid h-20 w-20 min-w-20 cursor-pointer place-items-center rounded-md border border-slate-100 bg-white transition-colors duration-200 hover:bg-slate-100`,
        state === rule && "border-primary-500",
      )}
    >
      {children}
    </div>
  );
};

export default SquareButton;
