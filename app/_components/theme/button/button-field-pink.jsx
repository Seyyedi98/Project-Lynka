"use client";
import { loadFont } from "@/utils/loadFont";
import { useEffect, useState } from "react";

const ButtonFieldPink = ({ title, href, isLive, font, textColor }) => {
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
    <>
      {isLive && (
        <a
          href={`http://${href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-[#F2A490] p-2 text-white shadow-lg"
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
      )}

      {!isLive && (
        <div className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#F2A490] p-2 text-white shadow-lg">
          <p
            style={{
              fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
              color: textColor,
            }}
          >
            {title}
          </p>
        </div>
      )}
    </>
  );
};

export default ButtonFieldPink;
