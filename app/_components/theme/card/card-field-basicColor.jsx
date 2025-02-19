"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const CardFieldBasicColor = (props) => {
  const {
    title,
    href,
    isLive,
    font,
    bgColor,
    textColor,
    layout,
    image,
    borderRadius,
    isSilver,
  } = props;
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

  const bgImageStyle = useMemo(
    () => ({
      backgroundImage: image ? `url(${JSON.parse(image).url})` : "",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
    [image],
  );

  // Workspace view for free and premium users && premium users live Page
  if (isSilver || !isLive) {
    if (layout === "basic") return <Basic {...props} />;
    if (layout === "roundedImage" || !layout)
      return <RoundedImage bgImageStyle={bgImageStyle} {...props} />;
    if (layout === "wideFullImage") return <WideFullImage {...props} />;
    if (layout === "highFullImage") return <HighFullImage {...props} />;
  }

  // Live page view for free users
  if (!isSilver && isLive) {
    if (layout === "basic") return <Basic {...props} />;
    if (
      layout === "roundedImage" ||
      layout === "wideFullImage" ||
      layout === "highFullImage" ||
      !layout
    )
      return <RoundedImage bgImageStyle={bgImageStyle} {...props} />;
  }
};

export default CardFieldBasicColor;

const Basic = ({
  title,
  href,
  isLive,
  bgColor,
  textColor,
  loadedFont,
  image,
  borderRadius,
}) => {
  return (
    <a
      style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
      href={`http://${href}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        `flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 text-lg font-medium text-white shadow-lg`,
        !isLive || (href === "" && "pointer-events-none"),
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

const RoundedImage = ({
  title,
  href,
  isLive,
  bgColor,
  textColor,
  loadedFont,
  image,
  bgImageStyle,
  borderRadius,
}) => {
  return (
    <a
      style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
      href={`http://${href}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        `flex h-28 w-full cursor-pointer items-center justify-start gap-4 p-2 px-4 text-lg font-medium text-white shadow-lg`,
        !isLive || (href === "" && "pointer-events-none"),
      )}
    >
      <div
        className={cn(
          `h-20 w-20 rounded-xl`,
          !image && "border-2 border-dashed border-white",
        )}
        style={bgImageStyle}
      />

      <div>
        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: textColor,
          }}
        >
          {title}
        </p>

        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: textColor,
          }}
          className="text-wrap text-sm"
        >
          {title}
        </p>
      </div>
    </a>
  );
};

const WideFullImage = ({
  title,
  href,
  isLive,
  bgColor,
  textColor,
  loadedFont,
  image,
  borderRadius,
}) => {
  return (
    <a
      style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
      href={`http://${href}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        `relative flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden p-2 text-lg font-medium text-white shadow-lg`,
        !isLive || (href === "" && "pointer-events-none"),
      )}
    >
      {image && (
        <Image
          className="absolute right-0 top-0 z-10 h-28 object-cover"
          height={360}
          width={720}
          alt="card Image"
          src={JSON.parse(image).url}
        />
      )}
      <p
        className="z-20"
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

const HighFullImage = ({
  title,
  href,
  isLive,
  bgColor,
  textColor,
  loadedFont,
  image,
  borderRadius,
}) => {
  return (
    <a
      style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
      href={`http://${href}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        `flex w-full cursor-pointer flex-col items-start justify-center gap-2 overflow-hidden text-lg font-medium text-white shadow-lg`,
        !isLive || (href === "" && "pointer-events-none"),
        !image && "h-48",
      )}
    >
      {image && (
        <Image
          height={720}
          width={720}
          alt="card Image"
          src={JSON.parse(image).url}
        />
      )}
      <p
        className="px-3 pb-2"
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
