"use clinet";

import { cn } from "@/lib/utils";
import { useState } from "react";

const PageSettings = () => {
  const [selectedTab, setSelectedTab] = useState("content");

  const TabItems = ["content", "style", "Theme", "analytics"];
  const itemBorder = TabItems.indexOf(selectedTab) * 48;

  return (
    <div className="pt-1">
      <ul className="relative flex items-center justify-start gap-4 border-b-2 pb-2 font-medium text-muted-foreground">
        {TabItems.map((item) => (
          <TabItem
            key={item}
            title={item}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}

        <span
          className={cn(
            `absolute bottom-0 border border-primary-500 transition-all duration-300`,
            selectedTab === TabItems[0] && "right-[3px] w-14",
            selectedTab === TabItems[1] && "right-[87px] w-12",
            selectedTab === TabItems[2] && "right-[160px] w-[60px]",
            selectedTab === TabItems[3] && "right-[236px] w-[70px]",
          )}
        />
      </ul>

      <div className="mt-4 text-right">
        {selectedTab === TabItems[0] && <div>content</div>}
        {selectedTab === TabItems[1] && <div>style</div>}
        {selectedTab === TabItems[2] && <div>theme</div>}
        {selectedTab === TabItems[3] && <div>anal</div>}
      </div>
    </div>
  );
};

export default PageSettings;

const TabItem = ({ title, selectedTab, setSelectedTab }) => {
  return (
    <li
      className={cn(
        `relative w-16 cursor-pointer text-center transition-colors duration-200 hover:text-primary-400`,
        selectedTab === title && "text-primary-600 hover:text-primary-600",
      )}
      onClick={() => setSelectedTab(title)}
    >
      {title}
    </li>
  );
};
