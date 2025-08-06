"use client";

import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const BasicHero = ({ ...data }) => {
  const {
    title,
    subtitle,
    primaryImage,
    secondaryImage,
    titleFont,
    subtitleFont,
    titleColor,
    subtitleColor,
    heroType,
    heroValue,
    imageBrightness,
  } = data;

  const [loadedTitleFont, setLoadedTitleFont] = useState(null);
  const [loadedSubtitleFont, setLoadedSubtitleFont] = useState(null);

  const colorBgStyle = useMemo(
    () => ({
      backgroundColor: heroType === "color" && heroValue,
      background: heroType === "color" && heroValue,
    }),
    [heroType, heroValue],
  );

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const titleFontVariable = await loadFont(titleFont);
        const subtitleFontVariable = await loadFont(subtitleFont);
        setLoadedTitleFont(titleFontVariable);
        setLoadedSubtitleFont(subtitleFontVariable);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [titleFont, subtitleFont]);

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden pt-8">
      <div className="absolute right-0 top-0 -mt-2 h-full w-full" />

      <div className="z-20 mt-10 flex h-full flex-col items-center gap-4 px-3">
        <h2
          style={{
            fontFamily: loadedTitleFont ? `var(${loadedTitleFont})` : "inherit",
            color: titleColor,
          }}
          className="mb-2 text-3xl font-bold text-white"
        >
          {title}
        </h2>
        <h4
          style={{
            fontFamily: loadedSubtitleFont
              ? `var(${loadedSubtitleFont})`
              : "inherit",
            color: subtitleColor,
          }}
          className="w-full max-w-sm text-wrap pb-4 text-center text-lg font-thin text-white"
        >
          {subtitle}
        </h4>
      </div>
    </div>
  );
};

export default BasicHero;
