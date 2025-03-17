"use client";
import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { ImageIcon, PictureInPicture } from "lucide-react";
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

  const primaryBgImage = getImageAddress(primaryImage.key);
  const secondaryBgImage = getImageAddress(secondaryImage.key);
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
      backgroundImage: `url(${secondaryBgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: "blur(10px) opacity(100%)",
      transform: "scale(1.05)",
    }),
    [secondaryBgImage],
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
      <div
        className="absolute right-0 top-0 -mt-2 h-full w-full"
        style={heroType === "color" ? colorBgStyle : imageBgStyle}
      />

      <div className="z-20 h-36 w-36">
        {primaryBgImage ? (
          <Image
            priority
            width={300}
            height={300}
            src={primaryBgImage}
            alt={title}
            className="z-20 h-36 w-36 rounded-full object-cover"
          />
        ) : (
          <div className="grid h-32 w-32 place-content-center rounded-full border-2 border-dashed border-white">
            <ImageIcon className="h-16 w-16 text-white" />
          </div>
        )}
      </div>

      {heroType === "image" && secondaryBgImage && (
        <div className="absolute right-0 top-0 flex h-full w-full items-center">
          <Image
            priority
            width={1080}
            height={640}
            src={secondaryBgImage}
            alt={title}
            className="position-bottom top-0 z-10 mx-auto h-full w-full max-w-[600px] bg-white object-cover xl:max-w-[1000px]"
          />
        </div>
      )}

      <div className="z-20 flex h-full flex-col items-center gap-4 px-3">
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
          className="w-full max-w-sm pb-4 text-center text-lg font-thin text-white"
        >
          {subtitle}
        </h4>
      </div>
    </div>
  );
};

export default NormalHero;
