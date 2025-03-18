"use client";
import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const TransparentHero = ({ ...data }) => {
  const {
    title,
    subtitle,
    primaryImage,
    titleFont,
    subtitleFont,
    titleColor,
    subtitleColor,
  } = data;

  const primaryBgImage = primaryImage ? getImageAddress(primaryImage.key) : "";
  const [loadedTitleFont, setLoadedTitleFont] = useState(null);
  const [loadedSubtitleFont, setLoadedSubtitleFont] = useState(null);

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
    <div className="mt-12 flex flex-col items-center justify-center gap-4">
      {primaryBgImage ? (
        <Image
          priority
          width={400}
          height={400}
          src={primaryBgImage}
          alt={title}
          className="h-36 w-36 rounded-full bg-white object-cover"
        />
      ) : (
        <div className="grid h-32 w-32 place-content-center rounded-full border-2 border-dashed border-white">
          <ImageIcon className="h-16 w-16 text-white" />
        </div>
      )}
      <div className="flex h-full flex-col items-center gap-4 px-3">
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

export default TransparentHero;
