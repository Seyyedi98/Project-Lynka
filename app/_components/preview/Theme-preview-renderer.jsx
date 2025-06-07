/* eslint-disable @next/next/no-img-element */
import { HeroController } from "@/app/_components/controller/hero-controller";
import getImageAddress from "@/utils/get-image-address";
import parseJson from "@/utils/parseJSON";
import { useMemo } from "react";
import { ElementThemeController } from "../controller/element-theme-controller";

const ThemePreviewRenderer = ({ theme }) => {
  const {
    themeCategory,
    backgroundType,
    backgroundColor,
    backgroundImage,
    heroType,
    heroStyle,
    heroValue,
    heroTitleFont,
    heroSubtitleFont,
    heroTitleColor,
    heroSubtitleColor,
    isBackgroundAnimated,
    elementStyle,
    elementColor,
    elementTextColor,
    borderColor,
    borderRadius,
  } = theme;

  // Render Elements
  const HeroElementRender = HeroController[heroStyle][0];
  const TextElementRender = ElementThemeController.TextField[elementStyle][0];
  const CardElementRender = ElementThemeController.CardField[elementStyle][0];
  const SocialsElementRender =
    ElementThemeController.SocialsField[elementStyle][0];

  // Background
  const backgroundImageUrl =
    backgroundImage && parseJson(backgroundImage)?.key === "no_key"
      ? parseJson(backgroundImage)?.url
      : getImageAddress(parseJson(backgroundImage)?.key);

  const colorBgStyle = useMemo(
    () => ({
      backgroundColor: backgroundType === "image" ? "" : backgroundColor,
      background: backgroundColor,
    }),
    [backgroundType, backgroundColor],
  );
  const imageBgStyle = useMemo(
    () => ({
      backgroundImage:
        backgroundType === "image" && `url(${backgroundImageUrl})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
    [backgroundType, backgroundImageUrl],
  );

  // Fake elements data
  const socials = [
    { platform: "telegram", userId: "x" },
    { platform: "youtube", userId: "x" },
    { platform: "github", userId: "x" },
  ];

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={
        backgroundType === "color" ||
        backgroundType === "pattern" ||
        backgroundType === "gradient"
          ? colorBgStyle
          : imageBgStyle
      }
    >
      <div className="pointer-events-none -translate-y-20 scale-[75%] pt-12 sm:scale-[40%] sm:pt-0">
        <HeroElementRender
          // title="عنوان"
          // subtitle={subtitle}
          // primaryImage={primaryImage}
          titleFont={heroTitleFont}
          subtitleFont={heroSubtitleFont}
          titleColor={heroTitleColor}
          subtitleColor={heroSubtitleColor}
        />
      </div>
      <div className="pointer-events-none -translate-y-[175px] scale-[80%] sm:scale-[65%]">
        <TextElementRender
          title="صفحه من"
          textColor={elementTextColor}
          bgColor={elementColor}
          borderColor={borderColor}
          borderRadius={borderRadius}
          lineHeight={2}
          textAlign="center"
        />
      </div>
      <div className="pointer-events-none -translate-y-[180px] scale-[80%] sm:scale-[65%]">
        <TextElementRender
          title="فروشگاه من"
          textColor={elementTextColor}
          bgColor={elementColor}
          borderColor={borderColor}
          borderRadius={borderRadius}
          lineHeight={2}
          textAlign="center"
        />
      </div>
      <div className="pointer-events-none -translate-y-[210px] scale-[80%] sm:scale-[65%]">
        <CardElementRender
          title="فروشگاه من"
          layout="highFullImage"
          image='{"key":"800217089-10696.904317455173.jpg"}'
          textColor={elementTextColor}
          bgColor={elementColor}
          borderColor={borderColor}
          borderRadius={borderRadius}
          lineHeight={2}
          textAlign="center"
        />
      </div>
    </div>
  );
};

export default ThemePreviewRenderer;
