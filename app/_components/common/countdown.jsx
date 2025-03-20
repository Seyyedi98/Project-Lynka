"use client";

import { useAnimate } from "framer-motion";
import moment from "moment-jalaali";
import { useEffect, useRef, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = (props) => {
  const { countdownDate, message, borderRadius } = props;
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);

  // Check if the countdown has finished
  useEffect(() => {
    const end = moment(countdownDate.countdownDate, "jYYYY/jMM/jDD HH:mm");
    const now = moment(); // Current time in Shamsi
    const distance = +end - +now;

    if (distance <= 0) {
      setIsCountdownFinished(true);
    }
  }, [countdownDate]);

  return (
    <div
      style={{ borderRadius: borderRadius }}
      className="mx-auto flex w-full max-w-5xl items-center bg-white"
    >
      {isCountdownFinished && message ? (
        <div className="flex h-24 w-full items-center justify-center text-wrap text-center text-base font-medium text-black">
          {message}
        </div>
      ) : (
        <>
          <CountdownItem
            unit="Second"
            text="ثانیه"
            countdownDate={countdownDate}
            onFinish={() => setIsCountdownFinished(true)}
          />
          <CountdownItem
            unit="Minute"
            text="دقیقه"
            countdownDate={countdownDate}
            onFinish={() => setIsCountdownFinished(true)}
          />
          <CountdownItem
            unit="Hour"
            text="ساعت"
            countdownDate={countdownDate}
            onFinish={() => setIsCountdownFinished(true)}
          />
          <CountdownItem
            unit="Day"
            text="روز"
            countdownDate={countdownDate}
            onFinish={() => setIsCountdownFinished(true)}
          />
        </>
      )}
    </div>
  );
};

const CountdownItem = ({ unit, text, countdownDate, onFinish }) => {
  const { ref, time } = useTimer(unit, countdownDate, onFinish);

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

const useTimer = (unit, countdownDate, onFinish) => {
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

    // Stop the countdown if the distance is zero or negative
    if (distance <= 0) {
      clearInterval(intervalRef.current || undefined);
      setTime(0); // Set time to 0 when countdown finishes
      onFinish(); // Notify parent that the countdown has finished
      return;
    }

    let newTime = 0;

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
