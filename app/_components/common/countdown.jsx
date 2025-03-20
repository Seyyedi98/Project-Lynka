"use client";

import { useAnimate } from "framer-motion";
import moment from "moment-jalaali";
import { useEffect, useRef, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = (countdownDate) => {
  return (
    <div className="mx-auto flex w-full max-w-5xl items-center rounded-md bg-white">
      <CountdownItem unit="Second" text="ثانیه" countdownDate={countdownDate} />
      <CountdownItem unit="Minute" text="دقیقه" countdownDate={countdownDate} />
      <CountdownItem unit="Hour" text="ساعت" countdownDate={countdownDate} />
      <CountdownItem unit="Day" text="روز" countdownDate={countdownDate} />
    </div>
  );
};

const CountdownItem = ({ unit, text, countdownDate }) => {
  const { ref, time } = useTimer(unit, countdownDate);

  return (
    <div className="flex h-24 w-1/4 flex-col items-center justify-center gap-1 border-r-[1px] border-slate-200 md:h-36 md:gap-2">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl"
        >
          {time}
        </span>
      </div>
      <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base">
        {text}
      </span>
    </div>
  );
};

export default ShiftingCountdown;

const useTimer = (unit, countdownDate) => {
  const [ref, animate] = useAnimate();

  const intervalRef = useRef(null);
  const timeRef = useRef(0);

  const [time, setTime] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, [countdownDate]);

  const handleCountdown = async () => {
    // Convert the countdownDate to Shamsi
    const end = moment(countdownDate.countdownDate, "jYYYY/jMM/jDD HH:mm");
    const now = moment(); // Current time in Shamsi

    const distance = +end - +now;

    let newTime = 0;

    const DAY = 86400000; // milliseconds in a day
    const HOUR = 3600000; // milliseconds in an hour
    const MINUTE = 60000; // milliseconds in a minute
    const SECOND = 1000; // milliseconds in a second

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 },
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Enter animation
      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 },
      );
    }
  };

  return { ref, time };
};
