"use client";

import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const BubbleHero = ({ ...data }) => {
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
  const [bubbleShapes, setBubbleShapes] = useState([]);

  // Create bubbles
  useEffect(() => {
    const initialBubbles = [
      {
        id: 1,
        size: 120,
        x: 30,
        y: 30,
        borderRadius: "60% 40% 50% 50%",
        animationDuration: 1800,
        animationDelay: 0,
      },
      {
        id: 2,
        size: 80,
        x: 70,
        y: 50,
        borderRadius: "50% 30% 60% 40%",
        animationDuration: 2200,
        animationDelay: 600,
      },
      {
        id: 3,
        size: 100,
        x: 60,
        y: 70,
        borderRadius: "40% 60% 30% 70%",
        animationDuration: 2500,
        animationDelay: 300,
      },
    ];
    setBubbleShapes(initialBubbles);

    // shape morphing
    const intervals = initialBubbles.map((bubble) => {
      return setInterval(() => {
        setBubbleShapes((prevBubbles) =>
          prevBubbles.map((b) =>
            b.id === bubble.id
              ? {
                  ...b,
                  borderRadius: `${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}%`,
                }
              : b,
          ),
        );
      }, bubble.animationDuration);
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, []);

  // Load fonts
  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const titleFontVariable = await loadFont(titleFont);
        const subtitleFontVariable = await loadFont(subtitleFont);
        setLoadedTitleFont(titleFontVariable);
        setLoadedSubtitleFont(subtitleFontVariable);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };

    fetchFonts();
  }, [titleFont, subtitleFont]);

  const colorBgStyle = useMemo(
    () => ({
      backgroundColor: heroValue,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 10,
    }),
    [heroValue],
  );

  const solidBgStyle = useMemo(
    () => ({
      backgroundColor: heroValue,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 10,
    }),
    [heroValue],
  );

  return (
    <div className="relative flex min-h-[200px] w-full flex-col items-center justify-center gap-4 overflow-hidden pt-8 md:min-h-[300px]">
      {/* Solid background */}
      <div style={heroType === "color" ? colorBgStyle : solidBgStyle} />

      <div
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{ zIndex: 15 }}
      >
        {bubbleShapes.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute overflow-hidden"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `clamp(20%, ${bubble.x}%, 80%)`,
              top: `clamp(20%, ${bubble.y}%, 80%)`,
              borderRadius: bubble.borderRadius,
              transition: `border-radius ${bubble.animationDuration}ms ease-in-out`,
              transitionDelay: `${bubble.animationDelay}ms`,
              transform: "translate(-50%, -50%)",
              overflow: "hidden",
              opacity: 0.85,
              filter: "drop-shadow(0 0 5px rgba(255,255,255,0.4))",
              zIndex: 20,
            }}
          >
            <Image
              priority
              width={bubble.size}
              height={bubble.size}
              src={secondaryBgImage}
              alt={title}
              className="h-full w-full object-cover"
              style={{
                filter: `brightness(${1 - (imageBrightness || 0) / 100})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="z-30 h-36 w-36">
        {primaryBgImage ? (
          <Image
            priority
            width={300}
            height={300}
            src={primaryBgImage}
            alt={title}
            className="z-30 h-36 w-36 rounded-full object-cover"
          />
        ) : (
          <div className="grid h-32 w-32 place-content-center rounded-full border-2 border-dashed border-white">
            <ImageIcon className="h-16 w-16 text-white" />
          </div>
        )}
      </div>

      <div className="z-30 flex h-full flex-col items-center gap-4 px-3 text-center">
        <h2
          style={{
            fontFamily: loadedTitleFont ? `var(${loadedTitleFont})` : "inherit",
            color: titleColor || "#ffffff",
          }}
          className="text-3xl font-bold text-white"
        >
          {title}
        </h2>
        <h4
          style={{
            fontFamily: loadedSubtitleFont
              ? `var(${loadedSubtitleFont})`
              : "inherit",
            color: subtitleColor || "#ffffff",
          }}
          className="w-full max-w-sm text-wrap pb-4 text-lg font-thin text-white"
        >
          {subtitle}
        </h4>
      </div>
    </div>
  );
};

export default BubbleHero;
