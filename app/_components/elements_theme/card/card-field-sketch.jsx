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

const CardFieldSketch = (props) => {
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

export default CardFieldSketch;

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
    .button {
  display: inline-block;
  padding: 12px 24px;
  border: 1px solid #FFFFFF;
  border-radius: ${borderRadius};
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  font-size: 19px;
  cursor: pointer;
  color: ${textColor};
  z-index: 1;
}

.button:before {
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

.button:after {
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: ${bgColor};
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button:hover {
  color: #ffffff;
  border: 1px solid ${bgColor};
}

.button:hover:before {
  top: -35%;
  background-color: ${bgColor};
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button:hover:after {
  top: -45%;
  background-color: ${bgColor};
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}   `}
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
          `button flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 text-lg font-medium text-white shadow-lg`,
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
          .button-rounded-image {
            display: inline-block;
            padding: 12px 24px;
            border: 1px solid #FFFFFF;
            border-radius: ${borderRadius};
            transition: all 0.2s ease-in;
            position: relative;
            overflow: hidden;
            font-size: 19px;
            cursor: pointer;
            color: ${textColor};
            z-index: 1;
            height: 112px;
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .button-rounded-image:before {
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

          .button-rounded-image:after {
            content: "";
            position: absolute;
            left: 55%;
            transform: translateX(-50%) scaleY(1) scaleX(1.45);
            top: 180%;
            width: 160%;
            height: 190%;
            background-color: ${bgColor};
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
          }

          .button-rounded-image:hover {
            color: #ffffff;
            border: 1px solid ${bgColor};
          }

          .button-rounded-image:hover:before {
            top: -35%;
            background-color: ${bgColor};
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .button-rounded-image:hover:after {
            top: -45%;
            background-color: ${bgColor};
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .image-container {
            height: 80px;
            width: 80px;
            min-width: 80px;
            border-radius: 8px;
            overflow: hidden;
            border: ${image ? "none" : `2px dashed ${textColor}`};
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
          `button glow-button button-rounded-image felx h-16 w-full cursor-pointer items-center justify-start gap-2 p-2 text-lg font-medium text-white shadow-lg`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        disabled={!isLive || href === ""}
      >
        <div className="image-container" style={bgImageStyle} />
        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: textColor,
          }}
        >
          {title}
        </p>
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
          .button-wide-image {
            display: inline-block;
            padding: 12px 24px;
            border: 1px solid #FFFFFF;
            border-radius: ${borderRadius};
            transition: all 0.2s ease-in;
            position: relative;
            overflow: hidden;
            font-size: 19px;
            cursor: pointer;
            color: ${textColor};
            z-index: 1;
            height: 112px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .button-wide-image:before {
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

          .button-wide-image:after {
            content: "";
            position: absolute;
            left: 55%;
            transform: translateX(-50%) scaleY(1) scaleX(1.45);
            top: 180%;
            width: 160%;
            height: 190%;
            background-color: ${bgColor};
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
            opacity:12%;
          }

          .button-wide-image:hover {
            color: #ffffff;
            border: 1px solid ${bgColor};
          }

          .button-wide-image:hover:before {
            top: -35%;
            background-color: ${bgColor};
            opacity:12%;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .button-wide-image:hover:after {
            top: -45%;
            background-color: ${bgColor};
            opacity:12%;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .button-wide-image img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -2;
          }
        `}
      </style>
      <button
        className="button-wide-image"
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
        disabled={!isLive || href === ""}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="card Image"
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        )}
        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: textColor,
          }}
        >
          {title}
        </p>
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
          .button-high-image {
            display: inline-block;
            padding: 12px 24px;
            border: 1px solid #FFFFFF;
            border-radius: ${borderRadius};
            transition: all 0.2s ease-in;
            position: relative;
            overflow: hidden;
            font-size: 19px;
            cursor: pointer;
            color: ${textColor};
            z-index: 1;
            height: ${imageUrl ? "auto" : "192px"};
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            min-height: 192px;
          }

          .button-high-image:before {
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

          .button-high-image:after {
            content: "";
            position: absolute;
            left: 55%;
            transform: translateX(-50%) scaleY(1) scaleX(1.45);
            top: 180%;
            width: 160%;
            height: 190%;
            background-color: ${bgColor};
            border-radius: 50%;
            display: block;
            transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
            z-index: -1;
            opacity:12%;
          }

          .button-high-image:hover {
            color: #ffffff;
            border: 1px solid ${bgColor};
          }

          .button-high-image:hover:before {
            top: -35%;
            background-color: ${bgColor};
            opacity:12%;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .button-high-image:hover:after {
            top: -45%;
            background-color: ${bgColor};
            opacity:12%;
            transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
          }

          .button-high-image img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -2;
          }

          .button-high-image p {
            position: relative;
            z-index: 1;
          }
        `}
      </style>
      <button
        className="button-high-image"
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
        disabled={!isLive || href === ""}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="card Image"
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        )}
        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: textColor,
          }}
        >
          {title}
        </p>
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
