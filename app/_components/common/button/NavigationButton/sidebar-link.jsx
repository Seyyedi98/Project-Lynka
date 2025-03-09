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
      className={cn(
        `group/color w-[90%] cursor-pointer rounded-md py-4 sm:rounded-l-full`,
        pathname === path ? "bg-primary/90" : "hover:bg-gray-300/40",
        isExpanded ? "block" : "hidden lg:block",
      )}
    >
      <div
        className={cn(
          `flex items-center justify-center gap-2 px-6 text-base text-icon/70 md:justify-start`,
          pathname === path ? "text-white" : "text-text",
        )}
      >
        <span className="">{children}</span>
        <span className="">{title}</span>
      </div>
    </Link>
  );
};

export default SidebarLink;
