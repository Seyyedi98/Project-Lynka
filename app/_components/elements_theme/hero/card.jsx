"use client";

import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const CardHero = ({ ...data }) => {
  const {
    title,
    subtitle,
    primaryImage,
    secondaryImage,
    titleFont,
    subtitleFont,
    titleColor = "#fff",
    subtitleColor = "#fff",
    heroType,
    heroValue,
    imageBrightness,
  } = data;

  const primaryBgImage = primaryImage
    ? getImageAddress(JSON.parse(primaryImage).key)
    : "";
  const secondaryBgImage = secondaryImage
    ? getImageAddress(JSON.parse(secondaryImage).key)
    : "";

  const [loadedTitleFont, setLoadedTitleFont] = useState(null);
  const [loadedSubtitleFont, setLoadedSubtitleFont] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

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
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background */}
      <div className="relative h-full w-full">
        {heroType === "image" && secondaryBgImage ? (
          <div className="relative h-full w-full">
            <Image
              priority
              width={600}
              height={900}
              src={secondaryBgImage}
              alt={title}
              className="h-full w-full object-cover"
              style={{
                filter: `brightness(${isHovered ? 0.9 : 1 - imageBrightness / 100})`,
                transition: "filter 0.3s ease",
              }}
            />
          </div>
        ) : (
          <div className="h-64 w-full" style={colorBgStyle} />
        )}

        <div
          className={`absolute inset-0 flex flex-col justify-between p-6 transition-all duration-300 ${isHovered ? "bg-black/20" : "bg-black/10"}`}
        >
          <div className="mt-auto">
            <div className="flex items-center gap-3">
              {primaryBgImage ? (
                <Image
                  width={40}
                  height={40}
                  src={primaryBgImage}
                  alt={title}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="grid h-10 w-10 place-content-center rounded-full border border-dashed border-white/50">
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
              )}

              <div>
                <h2
                  style={{
                    fontFamily: loadedTitleFont
                      ? `var(${loadedTitleFont})`
                      : "inherit",
                    color: titleColor,
                  }}
                  className="text-lg font-bold text-white drop-shadow-md"
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
                  className="text-sm font-medium text-white/90 drop-shadow-md"
                >
                  {subtitle}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHero;
