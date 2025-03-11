"use client";
import { loadFont } from "@/utils/loadFont";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const NormalHero = ({ ...data }) => {
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
  } = data;

  const primaryBgImage = primaryImage.url;
  const secondaryBgImage = secondaryImage.url;
  const [loadedTitleFont, setLoadedTitleFont] = useState(null);
  const [loadedSubtitleFont, setLoadedSubtitleFont] = useState(null);

  const colorBgStyle = useMemo(
    () => ({
      backgroundColor: heroType === "color" && heroValue,
      background: heroType === "color" && heroValue,
    }),
    [heroType, heroValue],
  );

  const imageBgStyle = useMemo(
    () => ({
      backgroundImage: heroType === "image" && secondaryImage,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
    [heroType, secondaryImage],
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
    <div
      style={colorBgStyle}
      className="relative flex w-full flex-col items-center justify-center gap-4"
    >
      {primaryBgImage ? (
        <Image
          priority
          width={400}
          height={400}
          src={primaryBgImage}
          alt={title}
          className="z-10 mt-12 h-36 w-36 rounded-full bg-white object-cover"
        />
      ) : (
        <div className="mt-12 grid h-32 w-32 place-content-center rounded-full border-2 border-dashed border-white">
          <UserRound className="h-20 w-20 text-white" />
        </div>
      )}
      {heroType === "image" && secondaryBgImage && (
        <Image
          priority
          width={400}
          height={400}
          src={secondaryBgImage}
          alt={title}
          className="w-fullz-0 absolute right-0 top-0 h-full bg-white object-cover"
        />
      )}
      <div className="z-10 flex h-full flex-col items-center gap-4">
        <h2
          style={{
            fontFamily: loadedTitleFont ? `var(${loadedTitleFont})` : "inherit",
            color: titleColor,
          }}
          className="text-3xl text-white"
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
          className="pb-4 text-center text-lg font-thin text-white"
        >
          {subtitle}
        </h4>
      </div>
    </div>
  );
};

export default NormalHero;
