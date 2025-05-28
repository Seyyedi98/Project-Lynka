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

  return (
    <>
      <style>
        {`
          .toon-button {
            position: relative;
            display: inline-block;
            cursor: pointer;
            outline: none;
            border: 0;
            vertical-align: middle;
            text-decoration: none;
            font-family: inherit;
            font-size: 15px;
            width: 100%;
            text-align: center;
          }

          .toon-button-inner {
            font-weight: 600;
            color: ${textColor || "#382b22"};
            text-transform: uppercase;
            padding: 1.25em 2em;
            background: ${bgColor || "#fff0f0"};
            border: 2px solid #b18597;
            border-radius: ${borderRadius || "0.75em"};
            transform-style: preserve-3d;
            transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
            position: relative;
            display: block;
          }

          .toon-button-inner::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #f9c4d2;
            border-radius: inherit;
           
            transform: translate3d(0, 0.75em, -1em);
            transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
          }

          .toon-button:hover .toon-button-inner {
            background: #ffe9e9;
            transform: translate(0, 0.25em);
          }

          .toon-button:hover .toon-button-inner::before {
            transform: translate3d(0, 0.50em, -1em);
          }

          .toon-button:active .toon-button-inner {
            background: #ffe9e9;
            transform: translate(0em, 0.75em);
          }

          .toon-button:active .toon-button-inner::before {
            transform: translate3d(0, 0em, -1em);
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
          `toon-button mb-4`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        <span className="toon-button-inner">
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

  return (
    <>
      <style>
        {`
          .toon-button-rounded {
            position: relative;
            display: inline-block;
            cursor: pointer;
            outline: none;
            border: 0;
            vertical-align: middle;
            text-decoration: none;
            font-family: inherit;
            font-size: 15px;
            width: 100%;
          }

          .toon-button-rounded-inner {
            font-weight: 600;
            color: ${textColor || "#382b22"};
            text-transform: uppercase;
            padding: 1.25em 2em;
            background: ${bgColor || "#fff0f0"};
            border: 2px solid #b18597;
            border-radius: ${borderRadius || "0.75em"};
            transform-style: preserve-3d;
            transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
            position: relative;
            display: flex;
            align-items: center;
            gap: 1rem;
            min-height: 112px;
          }

          .toon-button-rounded-inner::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #f9c4d2;
            border-radius: inherit;
            transform: translate3d(0, 0.75em, -1em);
            transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
          }

          .toon-button-rounded:hover .toon-button-rounded-inner {
            background: #ffe9e9;
            transform: translate(0, 0.25em);
          }

          .toon-button-rounded:hover .toon-button-rounded-inner::before {
            transform: translate3d(0, 0.50em, -1em);
          }

          .toon-button-rounded:active .toon-button-rounded-inner {
            background: #ffe9e9;
            transform: translate(0em, 0.75em);
          }

          .toon-button-rounded:active .toon-button-rounded-inner::before {
            box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
            transform: translate3d(0, 0, -1em);
          }

          .toon-button-image {
            height: 80px;
            width: 80px;
            min-width: 80px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            z-index: 1;
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
          `toon-button-rounded mb-2`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        <span className="toon-button-rounded-inner">
          <div
            className={cn(
              "toon-button-image",
              image
                ? ""
                : `border-2 border-dashed border-[${textColor || "#382b22"}]`,
            )}
            style={bgImageStyle}
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

  return (
    <>
      <style>
        {`
          .toon-button-wide {
            position: relative;
            display: inline-block;
            cursor: pointer;
            outline: none;
            border: 0;
            vertical-align: middle;
            text-decoration: none;
            font-family: inherit;
            font-size: 15px;
            width: 100%;
          }

          .toon-button-wide-inner {
            font-weight: 600;
            color: ${textColor || "#382b22"};
            text-transform: uppercase;
            padding: 1.25em 2em;
            background: ${bgColor || "#fff0f0"};
            border: 2px solid #b18597;
            border-radius: ${borderRadius || "0.75em"};
            transform-style: preserve-3d;
            transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            height: 112px;
          }

          .toon-button-wide-inner::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #f9c4d2;
            border-radius: inherit;
            transform: translate3d(0, 0.75em, -1em);
            transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
          }

          .toon-button-wide:hover .toon-button-wide-inner {
            background: #ffe9e9;
            transform: translate(0, 0.25em);
          }

          .toon-button-wide:hover .toon-button-wide-inner::before {
            transform: translate3d(0, 0.5em, -1em);
          }

          .toon-button-wide:active .toon-button-wide-inner {
            background: #ffe9e9;
            transform: translate(0em, 0.75em);
          }

          .toon-button-wide:active .toon-button-wide-inner::before {
            transform: translate3d(0, 0, -1em);
          }

          .toon-button-wide-image {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 10;
            height: 112px;
            object-fit: cover;
            width: 100%;
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
          `toon-button-wide mb-2`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        <span className="toon-button-wide-inner">
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

  return (
    <>
      <style>
        {`
          .toon-button-high {
            position: relative;
            display: inline-block;
            cursor: pointer;
            outline: none;
            border: 0;
            vertical-align: middle;
            text-decoration: none;
            font-family: inherit;
            font-size: 15px;
            width: 100%;
          }

          .toon-button-high-inner {
            font-weight: 600;
            color: ${textColor || "#382b22"};
            text-transform: uppercase;
            background: ${bgColor || "#fff0f0"};
            border: 2px solid #b18597;
            border-radius: ${borderRadius || "0.75em"};
            transform-style: preserve-3d;
            transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            min-height: 192px;
          }

          .toon-button-high-inner::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #f9c4d2;
            border-radius: inherit;
            transform: translate3d(0, 0.75em, -1em);
            transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
          }

          .toon-button-high:hover .toon-button-high-inner {
            background: #ffe9e9;
            transform: translate(0, 0.25em);
          }

          .toon-button-high:hover .toon-button-high-inner::before {
            transform: translate3d(0, 0.5em, -1em);
          }

          .toon-button-high:active .toon-button-high-inner {
            background: #ffe9e9;
            transform: translate(0em, 0.75em);
          }

          .toon-button-high:active .toon-button-high-inner::before {
            transform: translate3d(0, 0, -1em);
          }

          .toon-button-high-image {
            width: 100%;
            position: relative;
            z-index: 10;
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
          `toon-button-high mb-2`,
          !isLive || (href === "" && "pointer-events-none"),
          !imageUrl && "min-h-48",
        )}
      >
        <span className="toon-button-high-inner">
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
