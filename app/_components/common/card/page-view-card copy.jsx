"use client";

import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";

const PageViewCard = ({ page }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div
      onClick={() => setIsFullScreen(!isFullScreen)}
      className={cn(
        `h-[450px] w-[300px] cursor-pointer rounded-xl border bg-card shadow-md duration-200 hover:scale-105 hover:shadow-lg md:h-[500px] md:w-[320px]`,
        // isFullScreen && "fixed left-0 top-0 h-full w-full",
      )}
    >
      <div className={cn(`flex h-full flex-col items-center justify-center`)}>
        <div className="h-4/5 w-full rounded-t-xl border-b-2"></div>
        <div className="grid h-1/5 w-full grid-cols-2 grid-rows-2 rounded-b-xl text-neutral-400/80">
          <div className="mr-2 flex items-center justify-start">
            <span className="duration-200 hover:text-black">
              <EllipsisVertical />
            </span>
          </div>
          <div className="flex items-center justify-end">
            <span className="ml-4 rounded-sm border-2 px-4 py-1">plan</span>
          </div>
          <div className="col-span-2 m-2 ml-4 text-left capitalize text-stone-900">
            {page.uri}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageViewCard;
