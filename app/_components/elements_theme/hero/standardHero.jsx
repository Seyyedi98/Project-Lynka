"use client";

import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const StandardHero = ({ ...data }) => {
  const {
    title,
    subtitle,
    primaryImage,
    secondaryImage,
    titleFont,
    subtitleFont,
    titleColor = "#ffffff",
    subtitleColor = "#ffffff",
    heroType,
    heroValue = "#000000",
    imageBrightness = 0.3,
    height = 300,
  } = data;

  const primaryBgImage = primaryImage
    ? getImageAddress(JSON.parse(primaryImage).key)
    : "";
  const secondaryBgImage = secondaryImage
    ? getImageAddress(JSON.parse(secondaryImage).key)
    : "";

  const [loadedTitleFont, setLoadedTitleFont] = useState(null);
  const [loadedSubtitleFont, setLoadedSubtitleFont] = useState(null);

  const topSectionHeight = height / 2; // 150px for 300px height

  const backgroundStyle = useMemo(() => {
    if (heroType === "image" && secondaryBgImage) {
      return {
        backgroundImage: `url(${secondaryBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: `${topSectionHeight}px`,
        filter: `brightness(${1 - imageBrightness / 100})`,
      };
    }
    return {
      backgroundColor: heroValue,
      height: `${topSectionHeight}px`,
    };
  }, [
    heroType,
    heroValue,
    secondaryBgImage,
    topSectionHeight,
    imageBrightness,
  ]);

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
    <div className="relative w-full" style={{ height: `${height}px` }}>
      {/*Background Image */}
      <div className="w-full" style={backgroundStyle} />

      {/* Profile Image Container*/}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white">
          {primaryBgImage ? (
            <Image
              priority
              fill
              src={primaryBgImage}
              alt={title}
              className="object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-content-center bg-gray-200">
              <ImageIcon className="h-12 w-12 text-gray-500" />
            </div>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div
        className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-2 p-4"
        style={{ height: `${topSectionHeight}px` }}
      >
        <h2
          style={{
            fontFamily: loadedTitleFont ? `var(${loadedTitleFont})` : "inherit",
            color: titleColor,
          }}
          className="mt-8 text-center text-2xl font-bold"
        >
          {title}
        </h2>
        {subtitle && (
          <h4
            style={{
              fontFamily: loadedSubtitleFont
                ? `var(${loadedSubtitleFont})`
                : "inherit",
              color: subtitleColor,
            }}
            className="w-full text-wrap text-center text-base font-normal opacity-90"
          >
            {subtitle}
          </h4>
        )}
      </div>
    </div>
  );
};

export default StandardHero;
