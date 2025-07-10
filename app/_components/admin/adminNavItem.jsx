"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ children, target, icon }) => {
  const pathname = usePathname();
  const isActive = pathname.split("/").reverse()[0] === target;

  return (
    <Link
      href={target}
      className={`flex w-full items-center space-x-3 space-x-reverse rounded-none p-2 text-right transition-all hover:text-white active:text-white ${
        isActive
          ? "bg-[#000080] text-white visited:text-white"
          : "text-gray-800 hover:bg-[#a0a0a0] hover:text-gray-800"
      } border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf]`}
    >
      <span className="text-lg">{icon}</span>
      <span>{children}</span>
    </Link>
  );
};

export default NavItem;
