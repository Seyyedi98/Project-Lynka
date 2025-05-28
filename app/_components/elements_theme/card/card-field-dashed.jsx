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

const CardFieldDashed = (props) => {
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

export default CardFieldDashed;

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
    .btn {
      background-color: ${bgColor || "#00BFA6"};
      padding: 14px 40px;
      color: ${textColor || "#fff"};
      text-transform: uppercase;
      cursor: pointer;
      border-radius: ${borderRadius || "10px"};
      border: 5px dashed ${bgColor || "#00BFA6"};
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      transition: .4s;
      width: 100%; 
      display: flex; 
      justify-content: center;
      align-items: center;
      height: 64px; 
    }

    .btn span:last-child {
      display: none;
    }

    .btn:hover {
      transition: .4s;
      border: 5px dashed ${bgColor || "#00BFA6"};
      background-color: transparent;
      color: ${bgColor || "#00BFA6"};
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
        className={cn(`btn`, !isLive || (href === "" && "pointer-events-none"))}
      >
        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: "inherit",
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
          .btn-rounded {
            background-color: ${bgColor || "#00BFA6"};
            padding: 14px 20px; /* Adjusted padding for image */
            color: ${textColor || "#fff"};
            text-transform: uppercase;
            cursor: pointer;
            border-radius: ${borderRadius || "10px"};
            border: 5px dashed ${bgColor || "#00BFA6"};
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
            transition: .4s;
            width: 100%;
            display: flex;
            align-items: center;
            gap: 1rem;
            min-height: 112px;
          }

          .btn-rounded .image-container-rounded {
            height: 80px;
            width: 80px;
            min-width: 80px;
            border-radius: 8px;
            overflow: hidden;
            border: ${image ? "none" : `2px dashed ${textColor || "#fff"}`};
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          .btn-rounded span:last-child {
            display: none;
          }

          .btn-rounded:hover {
            transition: .4s;
            border: 5px dashed ${bgColor || "#00BFA6"};
            background-color: transparent;
            color: ${bgColor || "#00BFA6"};
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
          `btn-rounded`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        disabled={!isLive || href === ""}
      >
        <div className="image-container-rounded" style={bgImageStyle} />
        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: "inherit",
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
      <a
        style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
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
          `relative flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden p-2 text-lg font-medium text-white shadow-lg`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
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
        <p
          className="z-10"
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: textColor,
          }}
        >
          {title}
        </p>
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
      <a
        style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
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
          `flex w-full cursor-pointer flex-col items-start justify-center gap-2 overflow-hidden text-lg font-medium text-white shadow-lg`,
          !isLive || (href === "" && "pointer-events-none"),
          !imageUrl && "h-48",
        )}
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
