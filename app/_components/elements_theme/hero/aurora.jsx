"use client";

import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const AuroraHero = ({ ...data }) => {
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
  } = data;

  const profileImage = primaryImage
    ? getImageAddress(JSON.parse(primaryImage).key)
    : "";

  const backgroundImage = secondaryImage
    ? getImageAddress(JSON.parse(secondaryImage).key)
    : "";

  const [loadedTitleFont, setLoadedTitleFont] = useState(null);
  const [loadedSubtitleFont, setLoadedSubtitleFont] = useState(null);

  useEffect(() => {
    const fetchFont = async () => {
      try {
        if (titleFont) {
          const titleFontVariable = await loadFont(titleFont);
          setLoadedTitleFont(titleFontVariable);
        }
        if (subtitleFont) {
          const subtitleFontVariable = await loadFont(subtitleFont);
          setLoadedSubtitleFont(subtitleFontVariable);
        }
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [titleFont, subtitleFont]);

  const renderBackground = () => {
    if (heroType === "image" && backgroundImage) {
      return (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e6b,transparent)]"></div>
          </div>
          <Image
            priority
            fill
            src={backgroundImage}
            alt={title || "Background"}
            className="scale-110 object-cover opacity-50 blur-xl"
          />
        </>
      );
    }

    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e6b,transparent)]"></div>
        <div className="relative h-full w-full">
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-[-20%] right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden pb-8 pt-8 text-white">
      {/* Background Container */}
      <div className="absolute left-0 top-0 h-full w-full">
        {renderBackground()}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        <div className="h-36 w-36">
          {profileImage ? (
            <Image
              priority
              width={144}
              height={144}
              src={profileImage}
              alt={title || "Profile"}
              className="h-36 w-36 rounded-full border-2 border-white/50 object-cover shadow-lg"
            />
          ) : (
            <div className="grid h-36 w-36 place-content-center rounded-full border-2 border-dashed border-white/80 bg-white/10">
              <ImageIcon className="h-16 w-16 text-white/80" />
            </div>
          )}
        </div>

        <div className="flex h-full flex-col items-center gap-2 px-4 text-center">
          <h2
            style={{
              fontFamily: loadedTitleFont
                ? `var(${loadedTitleFont})`
                : "inherit",
              color: titleColor || "#FFFFFF",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            className="text-3xl font-bold"
          >
            {title}
          </h2>
          <h4
            style={{
              fontFamily: loadedSubtitleFont
                ? `var(${loadedSubtitleFont})`
                : "inherit",
              color: subtitleColor || "#E5E7EB",
              textShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
            }}
            className="w-full max-w-md text-lg font-light"
          >
            {subtitle}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AuroraHero;
