"use client";

import { logout } from "@/actions/auth/logout";
import { cn } from "@/lib/utils";
import { EllipsisVertical, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserButton = ({ children, isExpanded, title, path }) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center">
      <Link href={path} className="group/color w-full cursor-pointer">
        <div
          className={cn(
            `absolute z-0 h-14 w-full rounded-md duration-200 sm:w-14 xl:w-[200px]`,
            isExpanded && "sm:w-[200px]",
            !isExpanded && "sm:group-hover:w-[200px]",
            pathname === path
              ? "bg-link-hover/40"
              : "group-hover/color:bg-link-hover/20",
          )}
        />
        <div
          className={cn(
            `z-10 flex h-14 w-full items-center justify-start gap-4 rounded-sm px-4 py-4 text-primary-foreground duration-500 sm:px-0`,
          )}
        >
          <span className="z-10 sm:mr-4">{children}</span>
          <span
            className={cn(
              `z-10 mb-1 text-nowrap duration-500 sm:-translate-x-20 sm:opacity-0 xl:translate-x-0 xl:opacity-100`,
              isExpanded && "sm:translate-x-0 sm:opacity-100",
              !isExpanded &&
                "sm:group-hover:translate-x-0 sm:group-hover:opacity-100",
            )}
          >
            {title}
          </span>
        </div>
      </Link>

      <div
        className={cn(
          `text-text hover:bg-link-hover/40 z-[12] ml-4 mr-auto cursor-pointer rounded-lg p-3 duration-200 sm:absolute sm:ml-2 sm:-translate-x-[70px] sm:group-hover:block`,
          !isExpanded && "hidden sm:block",
        )}
        onClick={(e) => {
          e.stopPropagation();
          logout();
        }}
      >
        <LogOut className="rotate-180" />
      </div>
    </div>
  );
};

export default UserButton;
