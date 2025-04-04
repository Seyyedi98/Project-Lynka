"use client";

import { cn } from "@/lib/utils";
import ShiftingCountdown from "../../common/countdown";

const CountdownFieldDefault = (props) => {
  const { isLive, isPremium } = props;

  return (
    <div className="relative w-full">
      {!isPremium && !isLive && (
        <div className="absolute left-1/2 top-1/2 z-10 w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div className={cn(`w-full`, !isPremium && "opacity-70")}>
        {isPremium || !isLive ? <ShiftingCountdown {...props} /> : null}
      </div>
    </div>
  );
};

export default CountdownFieldDefault;
