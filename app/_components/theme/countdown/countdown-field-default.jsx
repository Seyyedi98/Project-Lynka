"use client";

import { useUserSubscription } from "@/hooks/useUserSubscription";
import ShiftingCountdown from "../../common/countdown";
import { cn } from "@/lib/utils";

const CountdownFieldDefault = (props) => {
  const { isLive } = props;
  const { isSilver } = useUserSubscription();

  return (
    <div className="relative w-full">
      {!isSilver && !isLive && (
        <div className="absolute left-1/2 top-1/2 z-10 w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div className={cn(`w-full`, !isSilver && "opacity-70")}>
        {isSilver || !isLive ? <ShiftingCountdown {...props} /> : null}
      </div>
    </div>
  );
};

export default CountdownFieldDefault;
