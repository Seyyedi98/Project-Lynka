/* eslint-disable @next/next/no-img-element */
"use client";

import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { useEffect, useState } from "react";

const MapFieldDefault = (props) => {
  const {
    coords,
    title,
    subtitleTitle,
    subtitleDescription,
    textColor,
    bgColor,
    borderRadius,
    font,
  } = props;
  const { isSilver } = useUserSubscription();
  const [latitude, longitude] = coords ? coords.split(",") : [null, null];
  const [loadedFont, setLoadedFont] = useState(null);
  const mark = "round";

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const fontVariable = await loadFont(font);
        setLoadedFont(fontVariable);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [font]);

  const handleOpenNeshanMapWithRouting = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="relative w-full">
      {!isSilver && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      {latitude && longitude && (
        // title
        <div
          style={{
            backgroundColor: bgColor,
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: textColor,
            borderRadius: borderRadius,
          }}
          className="flex h-full w-full flex-col gap-1 rounded-3xl bg-slate-800 p-4"
        >
          <div
            className={cn(
              `w-full text-nowrap rounded-md text-center`,
              !isSilver && "opacity-70",
            )}
          >
            {title}
          </div>

          {/* map */}
          <img
            src={`https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&z=15&l=map&size=600,300&lang=fa_IR&pt=${longitude},${latitude},${mark}`}
            alt="نقشه"
            className="mt-4 w-full rounded-2xl"
          />

          {/* navigate */}
          <div className="mt-1 flex">
            <div className="mt-1 flex w-full flex-col justify-start gap-1">
              <div className="text-wrap text-sm">
                <span>{subtitleTitle}</span>
              </div>
              <div className="w-full text-wrap text-xs">
                <span>{subtitleDescription}</span>
              </div>
            </div>

            <button
              onClick={handleOpenNeshanMapWithRouting}
              className="mt-2 flex items-center justify-center rounded-full bg-white px-6 py-2 text-black"
            >
              مسیریابی
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapFieldDefault;
