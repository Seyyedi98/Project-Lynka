"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";
import { ChartBar, LucideHome } from "lucide-react";
import { useState } from "react";
import SidebarLink from "../../common/button/NavigationButton/sidebar-link";
import HumbergerMenuBtn from "../../common/button/PrimaryButton/humberger-menu";
import { GearIcon } from "@radix-ui/react-icons";

const DashboardSidebar = () => {
  const user = useCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ref = useOutsideClick(() => setIsSidebarOpen(false), true);

  return (
    <nav ref={ref} className={cn(`relative z-40 h-full`)}>
      <div
        className={cn(
          `fixed top-4 z-40 transition-all duration-200 lg:hidden`,
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
            ? "w-full opacity-95 sm:w-56"
            : "w-1 opacity-0 lg:w-56 lg:opacity-95",
        )}
      >
        <SidebarLink
          isExpanded={isSidebarOpen}
          title="پنل کاربری"
          path="/dashboard"
        >
          <LucideHome className="h-5 w-5" />
        </SidebarLink>

        <SidebarLink
          isExpanded={isSidebarOpen}
          title="آمار"
          path="/dashboard/analytics"
        >
          <ChartBar className="h-5 w-5" />
        </SidebarLink>

        <SidebarLink
          isExpanded={isSidebarOpen}
          title="تنظیمات"
          path="/dashboard/settings"
        >
          <GearIcon className="h-5 w-5" />
        </SidebarLink>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
