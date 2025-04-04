"use client";

import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";

const RssFieldDefault = ({ href }) => {
  const { isPremium } = useUserSubscription();

  return (
    <div className="relative w-full">
      {!isPremium && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isPremium && "opacity-70",
        )}
      >
        rss field
      </div>
    </div>
  );
};

export default VideoFieldDefault;
