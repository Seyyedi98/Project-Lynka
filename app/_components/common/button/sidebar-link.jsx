import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import React from "react";

const SidebarLink = ({ children, isFull }) => {
  return (
    <div className="w-full group cursor-pointer">
      <div
        className={cn(
          `absolute z-0 h-14 w-full sm:w-14 rounded-md duration-200 group-hover:bg-link-hover/30`,
          isFull && "sm:w-[200px]"
        )}
      />
      <div
        className={cn(
          `flex z-10 sm:overflow-scroll items-center justify-start gap-4 sm:gap-5 text-primary-foreground
          px-4 sm:px-0 w-full py-4 duration-500 rounded-sm `,
          isFull && ""
        )}
      >
        <span className="z-10 sm:mr-4">
          <HomeIcon className="w-6 h-6 " />
        </span>
        <span
          className={cn(
            `sm:opacity-0 mt-[2px] z-10 duration-500 sm:-translate-x-20`,
            isFull && " sm:translate-x-0 sm:opacity-100"
          )}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

export default SidebarLink;
