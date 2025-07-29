"use client";

import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CollageHero = ({ ...data }) => {
  const {
    title,
    subtitle,
    primaryImage,
    secondaryImage,
    titleFont,
    subtitleFont,
    titleColor,
    heroType,
    heroValue,
    subtitleColor,
  } = data;

  const primaryBgImage = primaryImage
    ? getImageAddress(JSON.parse(primaryImage).key)
    : "";
  const secondaryBgImage = secondaryImage
    ? getImageAddress(JSON.parse(secondaryImage).key)
    : "";

  const [loadedTitleFont, setLoadedTitleFont] = useState(null);
  const [loadedSubtitleFont, setLoadedSubtitleFont] = useState(null);
  const [loadedWelcomeFont, setLoadedWelcomeFont] = useState(null);

  useEffect(() => {
    const fetchFont = async () => {
      try {
        if (titleFont) setLoadedTitleFont(await loadFont(titleFont));
        if (subtitleFont) setLoadedSubtitleFont(await loadFont(subtitleFont));
        setLoadedWelcomeFont(await loadFont({ family: "Dancing Script" }));
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [titleFont, subtitleFont]);

  const backgroundStyle = {
    backgroundColor: heroValue || "#f8fafc",
    backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 0)",
    backgroundSize: "15px 15px",
  };

  return (
    <div
      className="relative mb-4 flex w-full items-center justify-center overflow-hidden pb-8 pt-12"
      style={backgroundStyle}
    >
      <div className="grid w-full max-w-2xl grid-cols-2 gap-4 px-4 md:gap-8">
        {/* 1. Top-Right Image - Now with a "taped-on" style */}
        <div className="flex items-center justify-center">
          <div className="relative -rotate-3 transform transition-transform hover:scale-105">
            {/* Tape 1 */}
            <div className="absolute -left-3 -top-2 z-10 h-6 w-16 -rotate-45 transform bg-yellow-200/60 shadow-sm backdrop-blur-sm"></div>
            {/* Tape 2 */}
            <div className="absolute -bottom-2 -right-3 z-10 h-6 w-16 -rotate-45 transform bg-yellow-200/60 shadow-sm backdrop-blur-sm"></div>

            {secondaryBgImage ? (
              <Image
                priority
                width={200}
                height={200}
                src={secondaryBgImage}
                alt={title || "Decorative Image"}
                className="h-40 w-40 rounded-md border-4 border-white object-cover shadow-lg"
              />
            ) : (
              <div className="grid h-40 w-40 place-content-center rounded-md border-4 border-white bg-slate-200 shadow-lg">
                <CameraIcon className="h-16 w-16 text-slate-400" />
              </div>
            )}
          </div>
        </div>

        {/* 2. Welcome Note - Now with more padding */}
        <div className="flex items-center justify-center">
          <div className="flex -rotate-12 transform items-center justify-center rounded-md bg-slate-100 p-4 shadow-md transition-transform hover:rotate-[-4deg] hover:scale-105">
            <h3
              className="text-xl text-slate-600"
              style={{
                fontFamily: loadedWelcomeFont
                  ? `var(${loadedWelcomeFont})`
                  : "cursive",
              }}
            >
              Welcome
            </h3>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="col-span-2 flex flex-row items-center justify-around gap-4">
          <div dir="rtl" className="text-right">
            <h2
              style={{
                fontFamily: loadedTitleFont
                  ? `var(${loadedTitleFont})`
                  : "inherit",
                color: titleColor || "#1f2937",
              }}
              className="text-4xl font-bold"
            >
              {title}
            </h2>
            <h4
              style={{
                fontFamily: loadedSubtitleFont
                  ? `var(${loadedSubtitleFont})`
                  : "inherit",
                color: subtitleColor || "#4b5563",
              }}
              className="mt-2 w-full max-w-sm text-lg font-light"
            >
              {subtitle}
            </h4>
          </div>

          {/* 3. Polaroid Photo - Now with a push-pin */}
          <div className="flex-shrink-0">
            <div className="relative rotate-6 transform transition-transform hover:rotate-3 hover:scale-105">
              {/* The Red Pin */}
              <div className="absolute left-1/2 top-0 z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 bg-gradient-to-br from-red-400 to-red-600 shadow-md ring-2 ring-white/50"></div>

              <div className="rounded-sm bg-white p-3 pb-12 shadow-xl">
                {primaryBgImage ? (
                  <Image
                    priority
                    width={200}
                    height={200}
                    src={primaryBgImage}
                    alt={title || "Profile"}
                    className="h-40 w-40 object-cover"
                  />
                ) : (
                  <div className="grid h-40 w-40 place-content-center bg-slate-200">
                    <CameraIcon className="h-16 w-16 text-slate-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollageHero;
