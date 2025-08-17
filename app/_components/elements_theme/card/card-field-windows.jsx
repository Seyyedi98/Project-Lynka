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
          `flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 bg-[#c0c0c0] p-2 text-lg font-medium text-black shadow-[inset_-1px_-1px_#000,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#000,inset_-2px_-2px_#dfdfdf,inset_2px_2px_#808080]`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
      >
        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: textColor || "#000",
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
          `flex h-28 w-full cursor-pointer items-center justify-start gap-4 bg-[#c0c0c0] p-2 px-4 text-lg font-medium text-black shadow-[inset_-1px_-1px_#000,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#000,inset_-2px_-2px_#dfdfdf,inset_2px_2px_#808080]`,
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
              color: textColor || "#000",
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
          `relative flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden bg-[#c0c0c0] p-2 text-lg font-medium text-black shadow-[inset_-1px_-1px_#000,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#000,inset_-2px_-2px_#dfdfdf,inset_2px_2px_#808080]`,
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
            color: textColor || "#000",
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
      <div className="w-full border-2 border-b-gray-600 border-l-gray-300 border-r-gray-600 border-t-gray-300 bg-gray-300 p-px shadow-[1px_1px_0_0_#000]">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-2 py-1 text-sm font-bold text-white">
          {title || "Image"}
        </div>

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
          disabled={!isLive || href === ""}
          className={cn(
            "relative w-full overflow-hidden border-2 border-b-gray-300 border-l-gray-600 border-r-gray-300 border-t-gray-600 bg-[#c0c0c0] shadow-[inset_-1px_-1px_#000,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#000,inset_-2px_-2px_#dfdfdf,inset_2px_2px_#808080]",
            !isLive || (href === "" && "pointer-events-none"),
            !imageUrl && "h-48",
          )}
        >
          {imageUrl ? (
            <>
              <Image
                height={720}
                width={720}
                alt="card Image"
                src={imageUrl}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 to-transparent p-2"
                style={{
                  fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                  color: textColor || "white",
                }}
              >
                {title}
              </div>
            </>
          ) : (
            <p
              className="p-4"
              style={{
                fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                color: textColor || "black",
              }}
            >
              {title}
            </p>
          )}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md border-2 border-b-gray-600 border-l-gray-300 border-r-gray-600 border-t-gray-300 bg-gray-300">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-700 px-2 py-1 font-bold text-white">
              <span>Password Required</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex h-4 w-4 items-center justify-center bg-gray-300 font-bold text-black"
              >
                ×
              </button>
            </div>

            <div className="bg-white p-4">
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

            <div className="flex justify-end bg-gray-300 p-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border-2 border-b-gray-600 border-l-gray-300 border-r-gray-600 border-t-gray-300 px-3 py-1 text-sm font-bold hover:border-blue-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
