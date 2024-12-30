"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import {
  BellDot,
  ChartLine,
  CircleUser,
  LogIn,
  LucideHome,
  MessageCircleQuestion,
  Newspaper,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import SidebarLink from "../common/button/sidebar-link";
import Devider from "../common/ui/devider";
import HumbergerMenuBtn from "../common/ui/humberger-menu";

const DashboardSidebar = () => {
  const user = useCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ref = useOutsideClick(() => setIsSidebarOpen(false), true);

  return (
    <>
      <nav
        ref={ref}
        className={cn(
          `w-full sm:fixed xl:w-56 h-12 bg-gradient-to-b from-primary-gradient_from
           to-primary-gradient_to overflow-hidden transition-translate pt-6 
           pb-12 px-2 duration-300 right-0 sm:w-20 sm:h-full`,
          isSidebarOpen ? "sm:w-56 h-dvh" : "top-0"
        )}
      >
        <div className="flex flex-col sm:gap-4 justify-start relative sm:justify-between h-full">
          <div className="flex sm:mr-4 justify-between px-4 sm:px-0 text-white">
            <HumbergerMenuBtn
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <span>Logo</span>
          </div>

          {/* NavLinks */}
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col mr-[2px] gap-3 mt-6 sm:mt-2">
              <SidebarLink
                isFull={isSidebarOpen}
                title="پنل کاربری"
                path="/dashboard"
              >
                <LucideHome className="w-6 h-6" />
              </SidebarLink>
              <SidebarLink isFull={isSidebarOpen} title="فروشگاه" path="/shop">
                <ShoppingCart />
              </SidebarLink>
              <SidebarLink
                isFull={isSidebarOpen}
                title="آمار"
                path="/analytics"
              >
                <ChartLine />
              </SidebarLink>
            </div>

            <div className="flex flex-col mr-[2px] gap-3 mt-6 sm:mt-0">
              <div className="mx-3">
                <Devider />
              </div>
              <SidebarLink
                isFull={isSidebarOpen}
                title="پیام ها"
                path="/notifications"
              >
                <BellDot />
              </SidebarLink>
              <SidebarLink
                isFull={isSidebarOpen}
                title="تازه ها"
                path="/whats-new"
              >
                <Newspaper />
              </SidebarLink>
              <SidebarLink isFull={isSidebarOpen} title="راهنما" path="/help">
                <MessageCircleQuestion />
              </SidebarLink>
              {user ? (
                <SidebarLink isFull={isSidebarOpen} title="user" path="/user">
                  <CircleUser />
                </SidebarLink>
              ) : (
                <SidebarLink
                  isFull={isSidebarOpen}
                  title="ورود"
                  path="/auth/login"
                >
                  <LogIn />
                </SidebarLink>
              )}
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
