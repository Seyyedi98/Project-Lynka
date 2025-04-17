"use clinet";

import { cn } from "@/lib/utils";
import { useState } from "react";
import PageLoadingSettings from "../section/workspace/page-loading-settings";
import WorkspaceSettings from "../section/workspace/workspace-settings";
import PageAnalytics from "../section/workspace/page-analytics";

const PageSettings = () => {
  const [selectedTab, setSelectedTab] = useState("تنظیمات");
  const MobileTabItems = ["تنظیمات", "لودینگ"];
  const DesktopTabItems = ["تنظیمات", "لودینگ"];

  return (
    <div className="pt-1">
      {/* Mobile Tab */}
      <ul className="relative flex items-center justify-start gap-4 border-b-2 pb-2 font-medium text-muted-foreground md:hidden">
        {MobileTabItems.map((item) => (
          <TabItem
            key={item}
            title={item}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}

        <span
          className={cn(
            `absolute bottom-0 border border-primary transition-all duration-300`,
            selectedTab === MobileTabItems[0] && "right-[3px] w-[60px]",
            selectedTab === MobileTabItems[1] && "right-[81.5px] w-[60px]",
            // selectedTab === MobileTabItems[2] && "right-[160px] w-[60px]",
          )}
        />
      </ul>

      {/* Mobile Menu */}
      <div className="mt-4 text-right transition-all duration-200 md:hidden">
        {selectedTab === MobileTabItems[0] && <WorkspaceSettings />}
        {selectedTab === MobileTabItems[1] && <PageLoadingSettings />}
      </div>

      {/* Desktop Tap */}
      <ul className="relative hidden items-center justify-start gap-4 border-b-2 pb-2 font-medium text-muted-foreground md:flex">
        {DesktopTabItems.map((item) => (
          <TabItem
            key={item}
            title={item}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}

        <span
          className={cn(
            `absolute bottom-0 border border-primary transition-all duration-300`,
            selectedTab === DesktopTabItems[0] && "right-[3px] w-[60px]",
            selectedTab === DesktopTabItems[1] && "right-[81.5px] w-[60px]",
            selectedTab === DesktopTabItems[2] && "right-[160px] w-[60px]",
          )}
        />
      </ul>

      {/* Desktop Menu */}
      <div className="mt-4 hidden text-right transition-all duration-200 md:block">
        {selectedTab === DesktopTabItems[0] && <WorkspaceSettings />}
        {selectedTab === DesktopTabItems[1] && <PageLoadingSettings />}
        {/* {selectedTab === DesktopTabItems[2] && <div>analytics</div>} */}
      </div>
    </div>
  );
};

export default PageSettings;

const TabItem = ({ title, selectedTab, setSelectedTab }) => {
  return (
    <li
      className={cn(
        `hover:text-primary-400 relative w-16 cursor-pointer text-center transition-colors duration-200`,
        selectedTab === title && "text-primary-600 hover:text-primary-600",
      )}
      onClick={() => setSelectedTab(title)}
    >
      {title}
    </li>
  );
};
