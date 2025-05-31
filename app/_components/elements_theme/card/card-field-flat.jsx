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

const CardFieldFlat = (props) => {
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

export default CardFieldFlat;

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

  return (
    <>
      <style>
        {`
          .button__flat {
            background-color: ${bgColor || "#eee"};
            border: none;
            padding: 1rem;
            font-size: 1rem;
            width: 100%;
            border-radius: ${borderRadius || "1rem"};
            color: ${textColor || "lightcoral"};
            box-shadow: 0 0.4rem #dfd9d9;
            cursor: pointer;
            margin-bottom: 1rem;
            text-align: center;
            transition: all 0.2s;
          }

          .button__flat:active {
            color: white;
            box-shadow: 0 0.2rem #dfd9d9;
            transform: translateY(0.2rem);
          }

          .button__flat:hover:not(:disabled) {
            background: ${textColor || "lightcoral"};
            color: white;
            text-shadow: 0 0.1rem #bcb4b4;
          }

          .button__flat:disabled {
            cursor: auto;
            color: grey;
          }
        `}
      </style>
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
          `button__flat`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
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

  return (
    <>
      <style>
        {`
          .button__flat-rounded {
            background-color: ${bgColor || "#eee"};
            border: none;
            padding: 1rem;
            font-size: 1rem;
            width: 100%;
            border-radius: ${borderRadius || "1rem"};
            color: ${textColor || "lightcoral"};
            box-shadow: 0 0.4rem #dfd9d9;
            cursor: pointer;
            margin-bottom: 1rem;
            transition: all 0.2s;
          }

          .button__flat-rounded:active {
            color: white;
            box-shadow: 0 0.2rem #dfd9d9;
            transform: translateY(0.2rem);
          }

          .button__flat-rounded:hover:not(:disabled) {
            background: ${textColor || "lightcoral"};
            color: white;
            text-shadow: 0 0.1rem #bcb4b4;
          }

          .button__flat-rounded:disabled {
            cursor: auto;
            color: grey;
          }

          .button__flat-image {
            height: 80px;
            width: 80px;
            min-width: 80px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            z-index: 1;
          }

          .button__flat-content {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
        `}
      </style>
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
          `button__flat-rounded`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        <div className="button__flat-content">
          <div
            className={cn(
              "button__flat-image",
              image
                ? ""
                : `border-2 border-dashed border-[${textColor || "#382b22"}]`,
            )}
            style={bgImageStyle}
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

  return (
    <>
      <style>
        {`
          .button__flat-wide {
            background-color: ${bgColor || "#eee"};
            border: none;
            padding: 0;
            font-size: 1rem;
            width: 100%;
            border-radius: ${borderRadius || "1rem"};
            color: ${textColor || "lightcoral"};
            box-shadow: 0 0.4rem #dfd9d9;
            cursor: pointer;
            margin-bottom: 1rem;
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
          }

          .button__flat-wide:active {
            color: white;
            box-shadow: 0 0.2rem #dfd9d9;
            transform: translateY(0.2rem);
          }

          .button__flat-wide:hover:not(:disabled) {
            background: ${textColor || "lightcoral"};
            color: white;
            text-shadow: 0 0.1rem #bcb4b4;
          }

          .button__flat-wide:disabled {
            cursor: auto;
            color: grey;
          }

          .button__flat-wide-image {
            position: relative;
            z-index: 10;
            height: 112px;
            object-fit: cover;
            width: 100%;
          }

          .button__flat-wide-title {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1rem;
            z-index: 20;
            text-align: center;
          }
        `}
      </style>
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
        rel="noopener noreferrer "
        className={cn(
          `button__flat-wide`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        {imageUrl && (
          <Image
            className="button__flat-wide-image rounded-lg"
            height={360}
            width={720}
            alt="card Image"
            src={imageUrl}
            loading="lazy"
          />
        )}
        <div className="button__flat-wide-title grid h-full place-items-center">
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

  return (
    <>
      <style>
        {`
          .button__flat-high {
            background-color: ${bgColor || "#eee"};
            border: none;
            padding: 0;
            font-size: 1rem;
            width: 100%;
            border-radius: ${borderRadius || "1rem"};
            color: ${textColor || "lightcoral"};
            box-shadow: 0 0.4rem #dfd9d9;
            cursor: pointer;
            margin-bottom: 1rem;
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
          }

          .button__flat-high:active {
            color: white;
            box-shadow: 0 0.2rem #dfd9d9;
            transform: translateY(0.2rem);
          }

          .button__flat-high:hover:not(:disabled) {
            background: ${textColor || "lightcoral"};
            color: white;
            text-shadow: 0 0.1rem #bcb4b4;
          }

          .button__flat-high:disabled {
            cursor: auto;
            color: grey;
          }

          .button__flat-high-image {
            width: 100%;
            position: relative;
            z-index: 10;
          }

          .button__flat-high-title {
            padding: 1rem;
            z-index: 20;
          }
        `}
      </style>
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
          `button__flat-high`,
          !isLive || (href === "" && "pointer-events-none"),
          !imageUrl && "min-h-48",
        )}
      >
        {imageUrl && (
          <Image
            className="button__flat-high-image rounded-t-lg"
            height={720}
            width={720}
            alt="card Image"
            src={imageUrl}
            loading="lazy"
          />
        )}
        <div className="button__flat-high-title">
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
