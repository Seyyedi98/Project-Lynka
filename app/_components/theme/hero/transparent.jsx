import { loadFont } from "@/utils/loadFont";
import Image from "next/image";
import { useEffect, useState } from "react";

const TransparentHero = ({ ...data }) => {
  const {
    title,
    subtitle,
    primaryImage,
    titleFont,
    subTitleFont,
    titleColor,
    subtitleColor,
    heroType,
    heroValue,
  } = data;
  const primaryBgImage = primaryImage.url;
  const [loadedTitleFont, setLoadedTitleFont] = useState(null);
  const [loadedsubtitleFont, setLoadedsubtitleFont] = useState(null);

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const titleFontVariable = await loadFont(titleFont);
        const subtitleFontVariable = await loadFont(subTitleFont);
        setLoadedTitleFont(titleFontVariable);
        setLoadedsubtitleFont(subtitleFontVariable);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [titleFont, subTitleFont]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {primaryBgImage && (
        <Image
          priority
          width={300}
          height={300}
          src={primaryBgImage}
          alt={title}
          className="mt-20 h-36 w-36 rounded-full bg-white object-cover"
        />
      )}
      <div className="flex h-full flex-col items-center gap-4">
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
            fontFamily: loadedsubtitleFont
              ? `var(${loadedsubtitleFont})`
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

export default TransparentHero;
