"use client";

import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { useState } from "react";

const DashboardSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ref = useOutsideClick(() => setIsSidebarOpen(false), true);

  const toggleHumbergerMenu = () => {
    setIsSidebarOpen();
  };

  return (
    <nav
      onClick={(e) => {
        setIsSidebarOpen(true);
      }}
      ref={ref}
      className={cn(
        `fixed top-0 w-full lg:w-48 h-12 bg-red-500 overflow-hidden transition-translate py-4 px-2 duration-300 right-0 sm:w-12 sm:h-full`,
        isSidebarOpen && "sm:w-48 h-96 "
      )}
    >
      <div className="flex justify-between">
        <div
          className="sm:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          menu
        </div>
        <div className="flex sm:flex-col gap-2">
          <div onClick={() => console.log("test")}>item</div>
          <div onClick={() => console.log("test")}>item</div>
          <div onClick={() => console.log("test")}>item</div>
          <div onClick={() => console.log("test")}>item</div>
          <div onClick={() => console.log("test")}>item</div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
