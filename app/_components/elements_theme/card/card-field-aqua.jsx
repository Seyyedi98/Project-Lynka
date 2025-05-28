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

  return (
    <>
      <style>
        {`
          .aqua-button {
            display: inline-block;
            transition: all 0.2s ease-in;
            position: relative;
            overflow: hidden;
            z-index: 1;
            color: ${textColor || "#090909"};
            padding: 0.7em 1.7em;
            cursor: pointer;
            font-size: 18px;
            border-radius: ${borderRadius || "0.5em"};
            background: ${bgColor || "#e8e8e8"};
            border: 1px solid ${bgColor || "#e8e8e8"};
            width: 100%;
            text-align: center;
            margin-bottom: 1rem;
          }

          .aqua-button:active {
            color: #666;
          }

          .aqua-button:before {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%) scaleY(1) scaleX(1.25);
            top: 100%;
            width: 140%;
            height: 180%;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
          }

          .aqua-button:after {
            content: "";
            position: absolute;
            left: 55%;
            transform: translateX(-50%) scaleY(1) scaleX(1.45);
            top: 180%;
            width: 160%;
            height: 190%;
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
          }

          .aqua-button:hover {
            color: #ffffff;
            border: 1px solid #009087;
          }

          .aqua-button:hover:before {
            top: -35%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .aqua-button:hover:after {
            top: -45%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
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
          `aqua-button`,
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
          .aqua-button-rounded {
            display: inline-block;
            transition: all 0.2s ease-in;
            position: relative;
            overflow: hidden;
            z-index: 1;
            color: ${textColor || "#090909"};
            padding: 0.7em 1.7em;
            cursor: pointer;
            font-size: 18px;
            border-radius: ${borderRadius || "0.5em"};
            background: ${bgColor || "#e8e8e8"};
            border: 1px solid ${bgColor || "#e8e8e8"};
            width: 100%;
            text-align: left;
            margin-bottom: 1rem;
          }

          .aqua-button-rounded:active {
            color: #666;
          }

          .aqua-button-rounded:before {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%) scaleY(1) scaleX(1.25);
            top: 100%;
            width: 140%;
            height: 180%;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
          }

          .aqua-button-rounded:after {
            content: "";
            position: absolute;
            left: 55%;
            transform: translateX(-50%) scaleY(1) scaleX(1.45);
            top: 180%;
            width: 160%;
            height: 190%;
            background-color: #009087;
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
          }

          .aqua-button-rounded:hover {
            color: #ffffff;
            border: 1px solid #009087;
          }

          .aqua-button-rounded:hover:before {
            top: -35%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .aqua-button-rounded:hover:after {
            top: -45%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .aqua-button-image {
            height: 80px;
            width: 80px;
            min-width: 80px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            z-index: 1;
          }

          .aqua-button-content {
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
          `aqua-button-rounded`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        <div className="aqua-button-content">
          <div
            className={cn(
              "aqua-button-image",
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
          .aqua-button-wide {
            display: inline-block;
            transition: all 0.2s ease-in;
            position: relative;
            overflow: hidden;
            z-index: 1;
            color: ${textColor || "#090909"};
            padding: 0;
            cursor: pointer;
            font-size: 18px;
            border-radius: ${borderRadius || "0.5em"};
            background: ${bgColor || "#e8e8e8"};
            border: 1px solid ${bgColor || "#e8e8e8"};
            width: 100%;
            margin-bottom: 1rem;
          }

          .aqua-button-wide:active {
            color: #666;
          }

          .aqua-button-wide:before {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%) scaleY(1) scaleX(1.25);
            top: 100%;
            width: 140%;
            height: 180%;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
          }

          .aqua-button-wide:after {
            content: "";
            position: absolute;
            left: 55%;
            transform: translateX(-50%) scaleY(1) scaleX(1.45);
            top: 180%;
            width: 160%;
            height: 190%;
            background-color: #009087;
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
          }

          .aqua-button-wide:hover {
            color: #ffffff;
            border: 1px solid #009087;
          }

          .aqua-button-wide:hover:before {
            top: -35%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .aqua-button-wide:hover:after {
            top: -45%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .aqua-button-wide-image {
            position: relative;
            z-index: 10;
            height: 112px;
            object-fit: cover;
            width: 100%;
          }

          .aqua-button-wide-title {
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

  return (
    <>
      <style>
        {`
          .aqua-button-high {
            display: inline-block;
            transition: all 0.2s ease-in;
            position: relative;
            overflow: hidden;
            z-index: 1;
            color: ${textColor || "#090909"};
            padding: 0;
            cursor: pointer;
            font-size: 18px;
            border-radius: ${borderRadius || "0.5em"};
            background: ${bgColor || "#e8e8e8"};
            border: 1px solid ${bgColor || "#e8e8e8"};
            width: 100%;
            margin-bottom: 1rem;
          }

          .aqua-button-high:active {
            color: #666;
          }

          .aqua-button-high:before {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%) scaleY(1) scaleX(1.25);
            top: 100%;
            width: 140%;
            height: 180%;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
          }

          .aqua-button-high:after {
            content: "";
            position: absolute;
            left: 55%;
            transform: translateX(-50%) scaleY(1) scaleX(1.45);
            top: 180%;
            width: 160%;
            height: 190%;
            background-color: #009087;
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
          }

          .aqua-button-high:hover {
            color: #ffffff;
            border: 1px solid #009087;
          }

          .aqua-button-high:hover:before {
            top: -35%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .aqua-button-high:hover:after {
            top: -45%;
            background-color: #009087;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .aqua-button-high-image {
            width: 100%;
            position: relative;
            z-index: 10;
          }

          .aqua-button-high-title {
            padding: 1rem;
            z-index: 20;
          }
        `}
      </style>
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
