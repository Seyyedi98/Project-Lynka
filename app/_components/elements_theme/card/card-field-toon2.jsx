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

const CardFieldToon2 = (props) => {
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

export default CardFieldToon2;

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
    fontWeight: "600",
    color: textColor || "#382b22",
    textTransform: "uppercase",
    padding: "1.25em 2em",
    background: bgColor || "#fff0f0",
    border: "2px solid #b18597",
    borderRadius: borderRadius || "0.75em",
    transformStyle: "preserve-3d",
    transition:
      "transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1)",
    position: "relative",
    display: "block",
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
          `toon-button-basic mb-4`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        <span className="toon-button-inner" style={buttonStyle}>
          <p
            style={{
              fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
              position: "relative",
            }}
          >
            {title}
          </p>
        </span>
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
    fontWeight: "600",
    color: textColor || "#382b22",
    textTransform: "uppercase",
    padding: "1.25em 2em",
    background: bgColor || "#fff0f0",
    border: "2px solid #b18597",
    borderRadius: borderRadius || "0.75em",
    transformStyle: "preserve-3d",
    transition:
      "transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    minHeight: "112px",
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
          `toon-button-rounded mb-2`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        <span className="toon-button-rounded-inner" style={buttonStyle}>
          <div
            className={cn(
              "toon-button-image",
              image
                ? ""
                : `border-2 border-dashed border-[${textColor || "#382b22"}]`,
            )}
            style={{
              ...bgImageStyle,
              height: "80px",
              width: "80px",
              minWidth: "80px",
              borderRadius: "8px",
              overflow: "hidden",
              position: "relative",
              zIndex: 1,
            }}
          />
          <p
            style={{
              fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
              position: "relative",
              zIndex: 1,
            }}
          >
            {title}
          </p>
        </span>
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
    fontWeight: "600",
    color: textColor || "#382b22",
    textTransform: "uppercase",
    padding: "1.25em 2em",
    background: bgColor || "#fff0f0",
    border: "2px solid #b18597",
    borderRadius: borderRadius || "0.75em",
    transformStyle: "preserve-3d",
    transition:
      "transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    height: "112px",
  };

  return (
    <>
      <a
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
        rel="noopener noreferrer mb-2"
        className={cn(
          `toon-button-wide`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        <span className="toon-button-wide-inner" style={buttonStyle}>
          {imageUrl && (
            <Image
              className="toon-button-wide-image rounded-lg"
              height={360}
              width={720}
              alt="card Image"
              src={imageUrl}
              loading="lazy"
            />
          )}
          <p
            style={{
              fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
              position: "relative",
              zIndex: 20,
            }}
          >
            {title}
          </p>
        </span>
      </a>
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
    fontWeight: "600",
    color: textColor || "#382b22",
    textTransform: "uppercase",
    background: bgColor || "#fff0f0",
    border: "2px solid #b18597",
    borderRadius: borderRadius || "0.75em",
    transformStyle: "preserve-3d",
    transition:
      "transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: "192px",
  };

  return (
    <>
      <a
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
          `toon-button-high mb-`,
          !isLive || (href === "" && "pointer-events-none"),
          !imageUrl && "min-h-48",
        )}
      >
        <span className="toon-button-high-inner" style={buttonStyle}>
          {imageUrl && (
            <Image
              className="toon-button-high-image rounded-t-lg"
              height={720}
              width={720}
              alt="card Image"
              src={imageUrl}
              loading="lazy"
            />
          )}
          <p
            className="px-3 pb-2"
            style={{
              fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
              position: "relative",
              zIndex: 20,
            }}
          >
            {title}
          </p>
        </span>
      </a>
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
