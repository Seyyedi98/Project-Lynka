"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import parseJson from "@/utils/parseJSON";
import React from "react";

const LivePageBackground = ({ theme, children }) => {
  const isDesktop = useMediaQuery("(min-width: 600px)");

  const backgroundImageUrl =
    theme.backgroundImage && parseJson(theme.backgroundImage)?.key === "no_key"
      ? isDesktop
        ? parseJson(theme.backgroundImage)?.url.replace("mobile", "desktop")
        : parseJson(theme.backgroundImage)?.url // images form public folder
      : getImageAddress(parseJson(theme.backgroundImage)?.key); // images from bucket

  const styleColor = {
    backgroundColor: theme.backgroundColor,
    background: theme.backgroundColor,
    backgroundSize: theme.backgroundType === "gradient" ? "200% 200%" : "cover",
  };

  const styleImage = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      style={
        theme.backgroundType === "color" ||
        theme.backgroundType === "pattern" ||
        theme.backgroundType === "gradient"
          ? styleColor
          : styleImage
      }
      className={cn(
        `relative flex h-svh w-full flex-col items-center justify-start gap-4 overflow-hidden`,
        theme.isBackgroundAnimated &&
          theme.backgroundType === "gradient" &&
          "animate-bg-move",
      )}
    >
      {children}
    </div>
  );
};

export default LivePageBackground;
