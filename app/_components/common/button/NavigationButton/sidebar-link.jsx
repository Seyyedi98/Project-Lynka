"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLink = ({
  children,
  isExpanded,
  setIsSidebarOpen,
  title,
  path,
}) => {
  const pathname = usePathname();

  return (
    <Link
      style={{ textDecoration: "none" }}
      href={path}
      onClick={() => setIsSidebarOpen(false)}
      className={cn(
        `group/color w-[90%] cursor-pointer rounded-l-sm py-4`,
        pathname === path
          ? "font-semibold sm:border-r-4 sm:border-border/70 sm:font-medium"
          : "hover:bg-gray-300/40 sm:border-r-4 sm:border-transparent",
        isExpanded ? "block" : "hidden sm:block",
      )}
    >
      <div
        className={cn(
          `flex items-center justify-center gap-2 px-4 text-base text-icon/70 md:justify-start`,
          pathname === path ? "text-primary/80" : "text-text-light",
        )}
      >
        <span className="">{children}</span>
        <span className="sm:hidden">{title}</span>
      </div>
    </Link>
  );
};

export default SidebarLink;
