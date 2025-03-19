"use client";

import { loadFont } from "@/utils/loadFont";
import React, { useEffect, useState } from "react";

const DeviderFieldDefault = (props) => {
  const { title, textColor, font, deviderColor } = props;
  const [textFont, setTextFont] = useState(null);

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const textFontVariable = await loadFont(font);
        setTextFont(textFontVariable);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [textFont, font]);

  return (
    <div className="flex w-full items-center justify-center gap-3">
      <span
        style={{ backgroundColor: deviderColor }}
        className="h-[2px] w-full"
      ></span>
      <span
        style={{
          color: textColor,
          fontFamily: textFont ? `var(${textFont})` : "inherit",
        }}
      >
        {title}
      </span>
      <span
        style={{ backgroundColor: deviderColor }}
        className="h-[2px] w-full"
      ></span>
    </div>
  );
};

export default DeviderFieldDefault;
