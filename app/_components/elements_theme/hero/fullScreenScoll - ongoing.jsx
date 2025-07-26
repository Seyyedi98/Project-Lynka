"use client";

import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";

const BasicHero = ({ ...data }) => {
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
  const [showNavbar, setShowNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setShowNavbar(true);
      } else if (currentScrollY < lastScrollY && currentScrollY <= 50) {
        // Scrolling up near top
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const colorBgStyle = useMemo(
    () => ({
      backgroundColor: heroType === "color" ? heroValue : "transparent",
    }),
    [heroType, heroValue],
  );

  const imageBgStyle = useMemo(
    () => ({
      backgroundImage: `url(${secondaryBgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `brightness(${1 - (imageBrightness || 0) / 100})`,
    }),
    [secondaryBgImage, imageBrightness],
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
    <>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className={`relative flex h-screen w-full flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
          showNavbar ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 h-full w-full"
          style={heroType === "color" ? colorBgStyle : imageBgStyle}
        />

        {/* Content Container */}
        <div className="container relative z-20 mx-auto flex flex-col items-center justify-center gap-6 px-4 text-center">
          {/* Profile Image */}
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
            {primaryBgImage ? (
              <Image
                priority
                width={128}
                height={128}
                src={primaryBgImage}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-content-center bg-gray-200">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center gap-3">
            <h1
              style={{
                fontFamily: loadedTitleFont
                  ? `var(${loadedTitleFont})`
                  : "inherit",
                color: titleColor || "#000",
              }}
              className="text-4xl font-bold md:text-5xl"
            >
              {title}
            </h1>
            <p
              style={{
                fontFamily: loadedSubtitleFont
                  ? `var(${loadedSubtitleFont})`
                  : "inherit",
                color: subtitleColor || "#333",
              }}
              className="max-w-md text-lg md:text-xl"
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <div className="h-6 w-4 rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Navbar that appears on scroll */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white px-6 py-3 shadow-md transition-transform duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            {primaryBgImage ? (
              <Image
                width={40}
                height={40}
                src={primaryBgImage}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-content-center bg-gray-200">
                <ImageIcon className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>
          <h1
            style={{
              fontFamily: loadedTitleFont
                ? `var(${loadedTitleFont})`
                : "inherit",
              color: titleColor || "#000",
            }}
            className="text-xl font-bold"
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Spacer to push content below hero */}
      <div className="h-screen"></div>
    </>
  );
};

export default BasicHero;
