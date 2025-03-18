"use client";
import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import { PictureInPicture, UserRound } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const BgCurvedHero = ({ ...data }) => {
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

  const primaryBgImage = primaryImage ? getImageAddress(primaryImage.key) : "";
  const secondaryBgImage = getImageAddress(secondaryImage.key);
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
    <div className="relative w-full flex-col items-center justify-center gap-4 overflow-hidden pt-8">
      {primaryBgImage ? (
        <Image
          priority
          width={300}
          height={300}
          src={primaryBgImage}
          alt={title}
          className="absolute right-1/2 top-28 z-20 h-32 w-32 translate-x-1/2 rounded-full object-cover lg:h-36 lg:w-36"
        />
      ) : (
        <div className="absolute right-1/2 top-28 z-20 grid h-32 w-32 translate-x-1/2 place-content-center rounded-full border-2 border-dashed border-white">
          <PictureInPicture className="h-20 w-20 text-white" />
        </div>
      )}

      <div className="absolute right-0 top-0 flex h-full w-full items-center">
        {heroType === "image" && secondaryBgImage ? (
          <Image
            priority
            width={1080}
            height={640}
            src={secondaryBgImage}
            alt={title}
            style={{
              maskImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNi44cmVtIiB2aWV3Qm94PSIwIDAgMTAwIDE2OCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0icm91bmRlZC11cC1jbGlwIj4KICAgICAgPHBvbHlnb24gcG9pbnRzPSIwLDAgMCwxMDAgMC44MTgsOTkuMzQyIDAuODE4LDk5LjM0MiAxMC41MDcsOTIuNCAyMC4zNTMsODcuMDE1IDMwLjMxNyw4My4xODkgNDAuMzU4LDgwLjkyIDUwLjQzNyw4MC4yMDkgNjAuNTE0LDgxLjA1NCA3MC41NDksODMuNDU2IDgwLjUwMSw4Ny40MTUgOTAuMzMxLDkyLjkyOSAxMDAsMTAwIDEwMCwwIDAsMCIgLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InJnYigxNSwgOTEsIDEwNikiIGNsaXAtcGF0aD0idXJsKCNyb3VuZGVkLXVwLWNsaXApIiAvPgo8L3N2Zz4=')`,
              filter: `brightness(${1 - imageBrightness / 100})`,
            }}
            className="position-bottom top-0 z-10 mx-auto h-full w-full bg-white object-cover xl:max-w-[1000px]"
          />
        ) : (
          <div
            style={{
              backgroundColor: heroValue,
              maskImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNi44cmVtIiB2aWV3Qm94PSIwIDAgMTAwIDE2OCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0icm91bmRlZC11cC1jbGlwIj4KICAgICAgPHBvbHlnb24gcG9pbnRzPSIwLDAgMCwxMDAgMC44MTgsOTkuMzQyIDAuODE4LDk5LjM0MiAxMC41MDcsOTIuNCAyMC4zNTMsODcuMDE1IDMwLjMxNyw4My4xODkgNDAuMzU4LDgwLjkyIDUwLjQzNyw4MC4yMDkgNjAuNTE0LDgxLjA1NCA3MC41NDksODMuNDU2IDgwLjUwMSw4Ny40MTUgOTAuMzMxLDkyLjkyOSAxMDAsMTAwIDEwMCwwIDAsMCIgLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InJnYigxNSwgOTEsIDEwNikiIGNsaXAtcGF0aD0idXJsKCNyb3VuZGVkLXVwLWNsaXApIiAvPgo8L3N2Zz4=')`,
            }}
            className="position-bottom top-0 z-10 mx-auto h-full w-full object-cover"
          />
        )}
      </div>

      <div className="z-20 mt-56 flex h-full flex-col items-center gap-4 px-3">
        <h2
          style={{
            fontFamily: loadedTitleFont ? `var(${loadedTitleFont})` : "inherit",
            color: titleColor,
          }}
          className="z-10 text-3xl text-white"
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
          className="z-10 h-full w-full max-w-sm text-wrap pb-4 text-center text-lg font-thin text-white"
        >
          {subtitle}
        </h4>
      </div>
    </div>
  );
};

export default BgCurvedHero;
