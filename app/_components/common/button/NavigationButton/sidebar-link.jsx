"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLink = ({ children, isExpanded, title, path }) => {
  const pathname = usePathname();

  return (
    <Link
      style={{ textDecoration: "none" }}
      href={path}
      className="group/color w-full cursor-pointer"
    >
      <div
        className={cn(
          `absolute z-0 h-14 w-full rounded-md duration-200 sm:w-14 xl:w-[200px]`,
          isExpanded && "sm:w-[200px]",
          !isExpanded && "sm:group-hover:w-[200px]",
          pathname === path ? "bg-button/40" : "group-hover/color:bg-button/20",
        )}
      />
      <div
        className={cn(
          `z-10 flex h-14 w-full items-center justify-start gap-4 rounded-sm px-4 py-4 text-primary duration-500 sm:px-0`,
        )}
      >
        <span className="z-10 sm:mr-4">{children}</span>
        <span
          className={cn(
            `z-10 text-nowrap text-white duration-500 sm:-translate-x-20 sm:opacity-0 xl:translate-x-0 xl:opacity-100`,
            isExpanded && "sm:translate-x-0 sm:opacity-100",
            !isExpanded &&
              "sm:group-hover:translate-x-0 sm:group-hover:opacity-100",
          )}
        >
          {title}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLink;
