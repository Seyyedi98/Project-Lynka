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

const CardFieldWindows = (props) => {
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

export default CardFieldWindows;

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
.windows_btn {
  font-family: inherit;
  border: none;
  outline: 1px dotted rgb(37, 37, 37);
  outline-offset: -4px;
  cursor: pointer;
  background: hsl(0deg 0% 75%);
  box-shadow:
    inset -1px -1px #292929,
    inset 1px 1px #fff,
    inset -2px -2px rgb(158, 158, 158),
    inset 2px 2px #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 5px 30px;
  border-radius: ${borderRadius};
}

.windows_btn:active {
  box-shadow:
    inset -1px -1px #fff,
    inset 1px 1px #292929,
    inset -2px -2px #ffffff,
    inset 2px 2px rgb(158, 158, 158);
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
          `windows_btn flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 text-lg font-medium text-white shadow-lg`,
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
.windows_btn {
  font-family: inherit;
  border: none;
  outline: 1px dotted rgb(37, 37, 37);
  outline-offset: -4px;
  cursor: pointer;
  background: hsl(0deg 0% 75%);
  box-shadow:
    inset -1px -1px #292929,
    inset 1px 1px #fff,
    inset -2px -2px rgb(158, 158, 158),
    inset 2px 2px #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 5px 30px;
  border-radius: ${borderRadius};
}

.windows_btn:active {
  box-shadow:
    inset -1px -1px #fff,
    inset 1px 1px #292929,
    inset -2px -2px #ffffff,
    inset 2px 2px rgb(158, 158, 158);
}
`}
      </style>
      <button
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
          `windows_btn flex h-28 w-full cursor-pointer items-center justify-start gap-4 p-2 px-4 text-lg font-medium text-white shadow-lg`,
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
.windows_btn {
  font-family: inherit;
  border: none;
  outline: 1px dotted rgb(37, 37, 37);
  outline-offset: -4px;
  cursor: pointer;
  background: hsl(0deg 0% 75%);
  box-shadow:
    inset -1px -1px #292929,
    inset 1px 1px #fff,
    inset -2px -2px rgb(158, 158, 158),
    inset 2px 2px #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 5px 30px;
  border-radius: ${borderRadius};
}

.windows_btn:active {
  box-shadow:
    inset -1px -1px #fff,
    inset 1px 1px #292929,
    inset -2px -2px #ffffff,
    inset 2px 2px rgb(158, 158, 158);
}
`}
      </style>
      <button
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
          `windows_btn relative flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden p-2 text-lg font-medium text-white shadow-lg`,
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
.windows_btn {
  font-family: inherit;
  border: none;
  outline: 1px dotted rgb(37, 37, 37);
  outline-offset: -4px;
  cursor: pointer;
  background: hsl(0deg 0% 75%);
  box-shadow:
    inset -1px -1px #292929,
    inset 1px 1px #fff,
    inset -2px -2px rgb(158, 158, 158),
    inset 2px 2px #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 15px 30px 5px 30px;
  border-radius: ${borderRadius};
}

.windows_btn:active {
  box-shadow:
    inset -1px -1px #fff,
    inset 1px 1px #292929,
    inset -2px -2px #ffffff,
    inset 2px 2px rgb(158, 158, 158);
}
`}
      </style>
      <button
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
          `windows_btn flex w-full cursor-pointer flex-col items-start justify-center gap-2 overflow-hidden text-lg font-medium text-white shadow-lg`,
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
