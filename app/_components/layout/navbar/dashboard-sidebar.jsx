"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";
import {
  ChartSplineIcon,
  ClipboardPenIcon,
  LibraryIcon,
  LucideHome,
  Settings,
} from "lucide-react";
import { useState } from "react";
import SidebarLink from "../../common/button/NavigationButton/sidebar-link";
import HumbergerMenuBtn from "../../common/button/PrimaryButton/humberger-menu";

const DashboardSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ref = useOutsideClick(() => setIsSidebarOpen(false), true);

  return (
    <nav ref={ref} className={cn(`relative z-50 h-full`)}>
      <div
        className={cn(
          `fixed top-4 z-40 transition-all duration-200 sm:hidden xl:hidden`,
          isSidebarOpen ? "left-4 sm:hidden" : "right-4",
        )}
      >
        <HumbergerMenuBtn
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div
        className={cn(
          `fixed right-0 top-0 flex h-full flex-col items-center gap-2 bg-card pt-20 transition-all duration-200 sm:items-start sm:bg-card`,
          isSidebarOpen
            ? "w-full opacity-95 backdrop-blur-lg sm:w-16"
            : "w-1 opacity-0 sm:w-16 sm:opacity-95 xl:opacity-95",
        )}
      >
        <SidebarLink
          isExpanded={isSidebarOpen}
          title="پنل کاربری"
          path="/dashboard"
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <LucideHome className="h-6 w-6" />
        </SidebarLink>

        <SidebarLink
          isExpanded={isSidebarOpen}
          title="آمار"
          path="/dashboard/analytics"
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <ChartSplineIcon className="h-6 w-6" />
        </SidebarLink>

        <SidebarLink
          isExpanded={isSidebarOpen}
          title="فرم ها"
          path="/dashboard/submits"
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <ClipboardPenIcon className="h-6 w-6" />
        </SidebarLink>

        <SidebarLink
          isExpanded={isSidebarOpen}
          title="راهنما"
          path="/dashboard/docs"
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <LibraryIcon className="h-6 w-6" />
        </SidebarLink>

        <SidebarLink
          isExpanded={isSidebarOpen}
          title="تنظیمات"
          path="/dashboard/profile"
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <Settings className="h-6 w-6" />
        </SidebarLink>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
