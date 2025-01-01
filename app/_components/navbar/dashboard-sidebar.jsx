"use client";

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
import UserButton from "../auth/user-button";

const DashboardSidebar = () => {
  const user = useCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ref = useOutsideClick(() => setIsSidebarOpen(false), true);

  return (
    <>
      <nav
        ref={ref}
        className={cn(
          `transition-translate group right-0 z-10 h-12 w-full overflow-hidden bg-gradient-to-b from-primary-gradient_from to-primary-gradient_to px-2 pb-12 pt-6 duration-200 sm:fixed sm:h-full sm:w-20 sm:pb-4 xl:w-56`,
          isSidebarOpen ? "h-dvh pb-4 sm:w-56" : "top-0",
          !isSidebarOpen && "sm:hover:w-56",
        )}
      >
        <div className="relative flex h-full flex-col justify-start sm:justify-between sm:gap-4">
          <div className="flex justify-between px-4 text-white sm:mr-4 sm:px-0">
            <HumbergerMenuBtn
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <span>Logo</span>
          </div>

          {/* NavLinks */}
          <div className="flex h-full flex-col justify-between">
            <div className="mr-[2px] mt-6 flex flex-col gap-3 sm:mt-2">
              <SidebarLink
                isExpanded={isSidebarOpen}
                title="پنل کاربری"
                path="/dashboard"
              >
                <LucideHome className="h-6 w-6" />
              </SidebarLink>
              <SidebarLink
                isExpanded={isSidebarOpen}
                title="فروشگاه"
                path="/shop"
              >
                <ShoppingCart />
              </SidebarLink>
              <SidebarLink
                isExpanded={isSidebarOpen}
                title="آمار"
                path="/analytics"
              >
                <ChartLine />
              </SidebarLink>
            </div>

            <div className="mr-[2px] mt-6 flex flex-col gap-3 sm:mt-0">
              <div className="mx-3">
                <Devider />
              </div>
              <SidebarLink
                isExpanded={isSidebarOpen}
                title="پیام ها"
                path="/notifications"
              >
                <BellDot />
              </SidebarLink>
              <SidebarLink
                isExpanded={isSidebarOpen}
                title="تازه ها"
                path="/whats-new"
              >
                <Newspaper />
              </SidebarLink>
              <SidebarLink
                isExpanded={isSidebarOpen}
                title="راهنما"
                path="/help"
              >
                <MessageCircleQuestion />
              </SidebarLink>
              <UserButton
                isExpanded={isSidebarOpen}
                title={user?.name || "پروفایل"}
                path="/user"
              >
                <CircleUser />
              </UserButton>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardSidebar;
