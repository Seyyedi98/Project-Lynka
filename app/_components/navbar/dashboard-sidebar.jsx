"use client";

import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SidebarLink from "../common/button/sidebar-link";
import HumbergerMenuBtn from "../common/ui/humberger-menu";

const DashboardSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ref = useOutsideClick(() => setIsSidebarOpen(false), true);

  return (
    <>
      {/* <div
        className={cn(
          `h-20 relative sm:hidden  duration-300`,
          isSidebarOpen && "h-[600px]"
        )}
      /> */}

      <nav
        ref={ref}
        className={cn(
          `w-full sm:fixed xl:w-56 h-12 bg-gradient-to-b from-primary-gradient_from
           to-primary-gradient_to overflow-hidden transition-translate pt-6 
           pb-12 px-2 duration-300 right-0 sm:w-20 sm:h-full`,
          isSidebarOpen ? "sm:w-56 h-[600px]" : " top-0"
        )}
      >
        <div className="flex flex-col justify-start relative sm:justify-between h-full">
          <div className="flex justify-between px-4 sm:px-0 text-white">
            <HumbergerMenuBtn
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <span>Logo</span>
          </div>

          {/* NavLinks */}
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col mr-[2px] gap-3 mt-6 sm:mt-0">
              <SidebarLink isFull={isSidebarOpen}>Link</SidebarLink>
              <SidebarLink isFull={isSidebarOpen}>Link</SidebarLink>
              <SidebarLink isFull={isSidebarOpen}>Link</SidebarLink>
            </div>
            <div className="flex flex-col mr-[2px] gap-3 mt-6 sm:mt-0">
              <SidebarLink isFull={isSidebarOpen}>Link</SidebarLink>
              <SidebarLink isFull={isSidebarOpen}>Link</SidebarLink>
              <SidebarLink isFull={isSidebarOpen}>Link</SidebarLink>
            </div>
          </div>
        </div>

        {/* Collapse Button */}
        <div className=" z-50">
          <Button
            className="hidden sm:block xl:hidden mt-auto"
            onClick={(e) => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            {isSidebarOpen ? "<" : ">"}
          </Button>
        </div>
      </nav>
    </>
  );
};

export default DashboardSidebar;
