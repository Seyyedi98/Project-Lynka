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

const CardFieldAqua = (props) => {
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

export default CardFieldAqua;

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
    color: textColor || "#090909",
    padding: "0.7em 1.7em",
    fontSize: "18px",
    borderRadius: borderRadius || "0.5em",
    background: bgColor || "#e8e8e8",
    border: `1px solid ${bgColor || "#e8e8e8"}`,
    width: "100%",
    textAlign: "center",
    marginBottom: "1rem",
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
          `aqua-button-basic`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        style={buttonStyle}
      >
        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          }}
        >
          {title}
        </p>
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
    color: textColor || "#090909",
    padding: "0.7em 1.7em",
    fontSize: "18px",
    borderRadius: borderRadius || "0.5em",
    background: bgColor || "#e8e8e8",
    border: `1px solid ${bgColor || "#e8e8e8"}`,
    width: "100%",
    textAlign: "left",
    marginBottom: "1rem",
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
          `aqua-button-rounded`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        style={buttonStyle}
      >
        <div className="aqua-button-content">
          <div
            className={cn(
              "aqua-button-image",
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
            }}
          >
            {title}
          </p>
        </div>
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
    color: textColor || "#090909",
    padding: "0",
    fontSize: "18px",
    borderRadius: borderRadius || "0.5em",
    background: bgColor || "#e8e8e8",
    border: `1px solid ${bgColor || "#e8e8e8"}`,
    width: "100%",
    marginBottom: "1rem",
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
        rel="noopener noreferrer "
        className={cn(
          `aqua-button-wide`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        style={buttonStyle}
      >
        {imageUrl && (
          <Image
            className="aqua-button-wide-image rounded-lg"
            height={360}
            width={720}
            alt="card Image"
            src={imageUrl}
            loading="lazy"
          />
        )}
        <div className="aqua-button-wide-title">
          <p
            style={{
              fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            }}
          >
            {title}
          </p>
        </div>
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
    color: textColor || "#090909",
    padding: "0",
    fontSize: "18px",
    borderRadius: borderRadius || "0.5em",
    background: bgColor || "#e8e8e8",
    border: `1px solid ${bgColor || "#e8e8e8"}`,
    width: "100%",
    marginBottom: "1rem",
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
          `aqua-button-high`,
          !isLive || (href === "" && "pointer-events-none"),
          !imageUrl && "min-h-48",
        )}
        style={buttonStyle}
      >
        {imageUrl && (
          <Image
            className="aqua-button-high-image rounded-t-lg"
            height={720}
            width={720}
            alt="card Image"
            src={imageUrl}
            loading="lazy"
          />
        )}
        <div className="aqua-button-high-title">
          <p
            style={{
              fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            }}
          >
            {title}
          </p>
        </div>
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
