"use client";

import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import { loadFont } from "@/utils/loadFont";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ProtectedPagePasswordCheck from "../../section/livepage-password-check";
import { trackClick } from "@/actions/page/analytics";

const handleClick = async ({
  setIsModalOpen,
  protectedElement,
  href,
  uri,
  elementId,
  isLive,
  title,
}) => {
  if (protectedElement) {
    await setIsModalOpen(true);
  } else {
    if (isLive) {
      window.open(`http://${href}`, "_blank");

      trackClick({
        pageUri: uri,
        elementName: title,
        elementId,
      }).catch((error) => {
        console.error("Failed to update analytics data:", error);
      });
    }
  }
};

const CardFieldGlitch = (props) => {
  const { isLive, font, layout, image, isPremium } = props;
  const [loadedFont, setLoadedFont] = useState(null);
  const imageUrl = image && getImageAddress(JSON.parse(image).key);

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
      backgroundImage: image ? `url(${imageUrl})` : "",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
    [image, imageUrl],
  );

  // Workspace view for free and premium users && premium users live Page
  if (isPremium || !isLive) {
    if (layout === "basic") return <Basic loadedFont={loadedFont} {...props} />;
    if (layout === "roundedImage" || !layout)
      return (
        <RoundedImage
          loadedFont={loadedFont}
          bgImageStyle={bgImageStyle}
          {...props}
        />
      );
    if (layout === "wideFullImage")
      return <WideFullImage loadedFont={loadedFont} {...props} />;
    if (layout === "highFullImage")
      return <HighFullImage loadedFont={loadedFont} {...props} />;
  }

  // Live page view for free users
  if (!isPremium && isLive) {
    if (layout === "basic") return <Basic loadedFont={loadedFont} {...props} />;
    if (
      layout === "roundedImage" ||
      layout === "wideFullImage" ||
      layout === "highFullImage" ||
      !layout
    )
      return (
        <RoundedImage
          loadedFont={loadedFont}
          bgImageStyle={bgImageStyle}
          {...props}
        />
      );
  }
};

export default CardFieldGlitch;

const Basic = ({
  title,
  href,
  isLive,
  bgColor,
  textColor,
  loadedFont,
  image,
  borderRadius,
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonStyle = {
    padding: "16px 20px",
    fontSize: "18px",
    background: `linear-gradient(45deg, transparent 5%, ${bgColor} 5%)`,
    border: "0",
    color: "#fff",
    letterSpacing: "3px",
    lineHeight: "1",
    boxShadow: "6px 0px 0px #00e6f6",
    outline: "transparent",
    position: "relative",
    width: "100%",
    textAlign: "center",
  };

  return (
    <>
      <button
        onClick={() =>
          handleClick({
            setIsModalOpen,
            href,
            protectedElement,
            uri,
            elementId,
            title,
            isLive,
          })
        }
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `btn-glitch-basic flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 text-lg font-medium text-white shadow-lg`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        style={{
          fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          color: textColor,
          ...buttonStyle,
        }}
      >
        {title}
        <span
          className="btn-glitch-after"
          data-content={title}
          style={{ "--bg-color": bgColor }}
        ></span>
      </button>

      {isModalOpen && (
        <div className="absolute right-0 top-0 h-svh w-full">
          <ProtectedPagePasswordCheck
            uri={uri}
            elementId={elementId}
            title={title}
            href={href}
            password={password}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      )}
    </>
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
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonStyle = {
    padding: "16px 20px",
    fontSize: "18px",
    background: `linear-gradient(45deg, transparent 5%, ${bgColor} 5%)`,
    border: "0",
    color: "#fff",
    letterSpacing: "3px",
    lineHeight: "1",
    boxShadow: "6px 0px 0px #00e6f6",
    outline: "transparent",
    position: "relative",
    width: "100%",
    textAlign: "center",
  };

  return (
    <>
      <button
        onClick={() =>
          handleClick({
            setIsModalOpen,
            href,
            protectedElement,
            uri,
            elementId,
            title,
            isLive,
          })
        }
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `btn-glitch-rounded flex h-28 w-full cursor-pointer items-center justify-start gap-4 p-2 px-4 text-lg font-medium text-white shadow-lg`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        style={{
          fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          color: textColor,
          borderRadius: borderRadius,
          ...buttonStyle,
        }}
      >
        <div
          className={cn(
            `h-20 w-20 rounded-xl`,
            !image && "border-2 border-dashed border-white",
          )}
          style={bgImageStyle}
        />

        <div>
          <p>{title}</p>
        </div>
        <span
          className="btn-glitch-after"
          data-content={title}
          style={{ "--bg-color": bgColor }}
        ></span>
      </button>

      <div
        className={cn(
          `absolute right-0 top-0 hidden h-svh w-full`,
          isModalOpen && "block",
        )}
      >
        <ProtectedPagePasswordCheck
          uri={uri}
          elementId={elementId}
          title={title}
          href={href}
          password={password}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
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
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = image && getImageAddress(JSON.parse(image).key);

  const buttonStyle = {
    padding: "16px 20px",
    fontSize: "18px",
    background: `linear-gradient(45deg, transparent 5%, ${bgColor} 5%)`,
    border: "0",
    color: "#fff",
    letterSpacing: "3px",
    lineHeight: "1",
    boxShadow: "6px 0px 0px #00e6f6",
    outline: "transparent",
    position: "relative",
    width: "100%",
    textAlign: "center",
  };

  return (
    <>
      <button
        onClick={() =>
          handleClick({
            setIsModalOpen,
            href,
            protectedElement,
            uri,
            elementId,
            title,
            isLive,
          })
        }
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `btn-glitch-wide relative flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden p-2 text-lg font-medium text-white shadow-lg`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        style={{
          fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          color: textColor,
          borderRadius: borderRadius,
          ...buttonStyle,
        }}
      >
        {imageUrl && (
          <Image
            className="absolute right-0 top-0 z-10 h-28 object-cover"
            height={360}
            width={720}
            alt="card Image"
            src={imageUrl}
            loading="lazy"
          />
        )}
        <p className="z-10">{title}</p>
        <span
          className="btn-glitch-after"
          data-content={title}
          style={{ "--bg-color": bgColor }}
        ></span>
      </button>
      <div
        className={cn(
          `absolute right-0 top-0 hidden h-svh w-full`,
          isModalOpen && "block",
        )}
      >
        <ProtectedPagePasswordCheck
          uri={uri}
          elementId={elementId}
          title={title}
          href={href}
          password={password}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
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
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = image && getImageAddress(JSON.parse(image).key);

  const buttonStyle = {
    padding: "16px 20px",
    fontSize: "18px",
    background: `linear-gradient(45deg, transparent 5%, ${bgColor} 5%)`,
    border: "0",
    color: "#fff",
    letterSpacing: "3px",
    lineHeight: "1",
    boxShadow: "6px 0px 0px #00e6f6",
    outline: "transparent",
    position: "relative",
    width: "100%",
    textAlign: "center",
  };

  return (
    <>
      <button
        onClick={() =>
          handleClick({
            setIsModalOpen,
            href,
            protectedElement,
            uri,
            elementId,
            title,
            isLive,
          })
        }
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `btn-glitch-high flex w-full cursor-pointer flex-col items-start justify-center gap-2 overflow-hidden text-lg font-medium text-white shadow-lg`,
          !isLive || (href === "" && "pointer-events-none"),
          !imageUrl && "h-48",
        )}
        style={{
          fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          color: textColor,
          borderRadius: borderRadius,
          ...buttonStyle,
        }}
      >
        {imageUrl && (
          <Image
            height={720}
            width={720}
            alt="card Image"
            src={imageUrl}
            loading="lazy"
          />
        )}
        <p className="px-3 py-1">{title}</p>
        <span
          className="btn-glitch-after"
          data-content={title}
          style={{ "--bg-color": bgColor }}
        ></span>
      </button>
      <div
        className={cn(
          `absolute right-0 top-0 hidden h-svh w-full`,
          isModalOpen && "block",
        )}
      >
        <ProtectedPagePasswordCheck
          uri={uri}
          elementId={elementId}
          title={title}
          href={href}
          password={password}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};
