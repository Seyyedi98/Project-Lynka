"use clinet";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageBackgroundSettings from "../section/workspace/page-background-settings";
import PageDataSettings from "../section/workspace/page-data-settings";
import PageLoadingSettings from "../section/workspace/page-loading-settings";

const PageSettings = () => {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.page.theme);

  const [selectedTab, setSelectedTab] = useState("مرورگر");
  const TabItems = ["مرورگر", "پس زمینه", "Theme", "لودینگ", "analytics"];

  const setPageBackground = function (velue) {
    const payload = { ...theme, backgroundValue: velue };
    dispatch({ type: "page/setTheme", payload });
  };

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
            selectedTab === TabItems[1] && "right-[75px] w-[72px]",
            selectedTab === TabItems[2] && "right-[164px] w-[56px]",
            selectedTab === TabItems[3] && "right-[242px] w-[58px]",
            selectedTab === TabItems[4] && "right-[320px] w-[65px]",
          )}
        />
      </ul>

      <div className="mt-4 text-right transition-all duration-200">
        {selectedTab === TabItems[0] && <PageDataSettings />}
        {selectedTab === TabItems[1] && (
          <PageBackgroundSettings setPageBackground={setPageBackground} />
        )}
        {selectedTab === TabItems[2] && <div>theme</div>}
        {selectedTab === TabItems[3] && <PageLoadingSettings />}
        {selectedTab === TabItems[4] && <div>analytics</div>}
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
