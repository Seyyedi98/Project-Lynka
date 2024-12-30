"use client";

import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLink = ({ children, isExpanded, title, path }) => {
  const pathname = usePathname();

  return (
    <Link href={path} className="w-full group/color cursor-pointer">
      <div
        className={cn(
          `absolute z-0 h-14 w-full xl:w-[200px] sm:w-14 rounded-md duration-200`,
          isExpanded && "sm:w-[200px]",
          !isExpanded && "sm:group-hover:w-[200px]",
          pathname === path
            ? "bg-link-hover/40"
            : "group-hover/color:bg-link-hover/20"
        )}
      />
      <div
        className={cn(
          `flex z-10 items-center justify-start gap-4 text-primary-foreground
          px-4 sm:px-0 h-14 w-full py-4 duration-500 rounded-sm `
        )}
      >
        <span className="z-10 sm:mr-4">{children}</span>
        <span
          className={cn(
            `sm:opacity-0 text-nowrap z-10 duration-500 xl:translate-x-0 xl:opacity-100 sm:-translate-x-20`,
            isExpanded && "sm:translate-x-0 sm:opacity-100",
            !isExpanded &&
              "sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
          )}
        >
          {title}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLink;
