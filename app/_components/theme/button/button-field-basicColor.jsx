"use client";
import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { useEffect, useState } from "react";

const ButtonFieldDefault = ({
  title,
  href,
  isLive,
  font,
  theme,
  bgColor,
  textColor,
  borderRadius,
}) => {
  const [loadedFont, setLoadedFont] = useState(null);
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

  return (
    <a
      style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
      href={`http://${href}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        `flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 text-lg font-medium text-white shadow-lg`,
        !isLive || (href === " " && "pointer-events-none"),
      )}
    >
      <p
        style={{
          fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          color: textColor,
        }}
      >
        {title}
      </p>
    </a>
  );
};

export default ButtonFieldDefault;
