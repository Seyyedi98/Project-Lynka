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

const CardFieldHexa = (props) => {
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

export default CardFieldHexa;

const Basic = ({
  title,
  href,
  isLive,
  textColor,
  loadedFont,
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonStyle = {
    "--color": textColor || "#afffff",
    padding: "1.2em 1.5em",
    fontSize: "17px",
    border: "0",
    textTransform: "uppercase",
    boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.6)",
    clipPath:
      "polygon(0% var(--curve-size), var(--curve-size) 0, 100% 0, 100% calc(100% - var(--curve-size)), calc(100% - var(--curve-size)) 100%, 0 100%)",
    transition: "color 250ms",
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <button
        className="btn-hexa-basic"
        style={buttonStyle}
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
      >
        <span
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          }}
        >
          {title}
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
  textColor,
  loadedFont,
  image,
  bgImageStyle,
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonStyle = {
    "--color": textColor || "#afffff",
    padding: "1em",
    border: "0",
    boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.6)",
    clipPath:
      "polygon(0% var(--curve-size), var(--curve-size) 0, 100% 0, 100% calc(100% - var(--curve-size)), calc(100% - var(--curve-size)) 100%, 0 100%)",
    transition: "color 250ms",
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <button
        className="btn-hexa-rounded h-28"
        style={buttonStyle}
        onClick={() =>
          isLive &&
          href &&
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
            }}
          >
            {title}
          </p>
        </div>
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

const WideFullImage = ({
  title,
  href,
  isLive,
  textColor,
  loadedFont,
  image,
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = image && getImageAddress(JSON.parse(image).key);

  const buttonStyle = {
    "--color": textColor || "#afffff",
    padding: "2.5em 1em 2.5em 1em",
    border: "0",
    boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.6)",
    clipPath:
      "polygon(0% var(--curve-size), var(--curve-size) 0, 100% 0, 100% calc(100% - var(--curve-size)), calc(100% - var(--curve-size)) 100%, 0 100%)",
    transition: "color 250ms",
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <button
        className="btn-hexa-wide h-28"
        style={buttonStyle}
        onClick={() =>
          isLive &&
          href &&
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
        <span
          className="z-20"
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          }}
        >
          {title}
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

const HighFullImage = ({
  title,
  href,
  isLive,
  textColor,
  loadedFont,
  image,
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = image && getImageAddress(JSON.parse(image).key);

  const buttonStyle = {
    "--color": textColor || "#afffff",
    padding: "0",
    border: "0",
    boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.6)",
    clipPath:
      "polygon(0% var(--curve-size), var(--curve-size) 0, 100% 0, 100% calc(100% - var(--curve-size)), calc(100% - var(--curve-size)) 100%, 0 100%)",
    transition: "color 250ms",
    width: "100%",
    height: imageUrl ? "auto" : "12rem",
  };

  return (
    <>
      <button
        className="btn-hexa-high"
        style={buttonStyle}
        onClick={() =>
          isLive &&
          href &&
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
        <span
          className="px-3 py-2"
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          }}
        >
          {title}
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
