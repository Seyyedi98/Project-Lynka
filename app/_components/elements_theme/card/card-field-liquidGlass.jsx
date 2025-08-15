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

const CardFieldLiquidGlass = (props) => {
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
    if (layout === "basic")
      return <LiquidGlassBasic loadedFont={loadedFont} {...props} />;
    if (layout === "roundedImage" || !layout)
      return (
        <LiquidGlassRoundedImage
          loadedFont={loadedFont}
          bgImageStyle={bgImageStyle}
          {...props}
        />
      );
    if (layout === "wideFullImage")
      return <LiquidGlassWideFullImage loadedFont={loadedFont} {...props} />;
    if (layout === "highFullImage")
      return <LiquidGlassHighFullImage loadedFont={loadedFont} {...props} />;
  }

  // Live page view for free users
  if (!isPremium && isLive) {
    if (layout === "basic")
      return <LiquidGlassBasic loadedFont={loadedFont} {...props} />;
    if (
      layout === "roundedImage" ||
      layout === "wideFullImage" ||
      layout === "highFullImage" ||
      !layout
    )
      return (
        <LiquidGlassRoundedImage
          loadedFont={loadedFont}
          bgImageStyle={bgImageStyle}
          {...props}
        />
      );
  }
};

export default CardFieldLiquidGlass;

const LiquidGlassBasic = ({
  title,
  href,
  isLive,
  bgColor = "rgba(255, 255, 255, 0.16)",
  textColor = "white",
  loadedFont,
  borderRadius = "16px",
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          `flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 text-lg font-medium text-white shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-100`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.22) 0%,
              rgba(255, 255, 255, 0.1) 50%,
              rgba(255, 255, 255, 0.05) 70%,
              transparent 100%
            )
          `,
          backdropFilter: "blur(3px) saturate(180%)",
          WebkitBackdropFilter: "blur(3px) saturate(180%)",
          borderRadius,
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.18),
            inset 0 4px 12px rgba(255, 255, 255, 0.12),
            inset 0 -4px 12px rgba(0, 0, 0, 0.08)
          `,

          position: "relative",
          overflow: "hidden",
          "--liquid-opacity": "0.4",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `
            linear-gradient(
              45deg,
              transparent 45%,
              rgba(255, 255, 255, 0.08) 50%,
              transparent 55%
            )
          `,
            animation: "liquidShine 6s infinite linear",
            opacity: "var(--liquid-opacity)",
          }}
        />

        <p
          style={{
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
            color: textColor,
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
            position: "relative",
          }}
        >
          {title}
        </p>

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: `calc(${borderRadius} - 1px)`,
            padding: "1px",
            background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0) 40%,
              rgba(255, 255, 255, 0) 60%,
              rgba(255, 255, 255, 0.2) 100%
            )
          `,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
      </a>

      <style jsx global>{`
        @keyframes liquidShine {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(25%, 25%) rotate(45deg);
          }
          50% {
            transform: translate(50%, 0) rotate(90deg);
          }
          75% {
            transform: translate(25%, 25%) rotate(135deg);
          }
          100% {
            transform: translate(0, 0) rotate(180deg);
          }
        }
      `}</style>

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

const LiquidGlassRoundedImage = ({
  title,
  href,
  isLive,
  bgColor = "rgba(255, 255, 255, 0.16)",
  textColor = "white",
  loadedFont,
  image,
  bgImageStyle,
  borderRadius = "16px",
  protectedElement,
  password,
  uri,
  elementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          `flex h-28 w-full cursor-pointer items-center gap-4 p-4 text-lg font-medium text-white shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-100`,
          !isLive || (href === "" && "pointer-events-none"),
        )}
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.22) 0%,
              rgba(255, 255, 255, 0.1) 50%,
              rgba(255, 255, 255, 0.05) 70%,
              transparent 100%
            )
          `,
          backdropFilter: "blur(3px) saturate(180%)",
          WebkitBackdropFilter: "blur(3px) saturate(180%)",
          borderRadius,
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.18),
            inset 0 4px 12px rgba(255, 255, 255, 0.12),
            inset 0 -4px 12px rgba(0, 0, 0, 0.08)
          `,
          position: "relative",
          overflow: "hidden",
          "--liquid-opacity": "0.4",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `
            linear-gradient(
              45deg,
              transparent 45%,
              rgba(255, 255, 255, 0.08) 50%,
              transparent 55%
            )
          `,
            animation: "liquidShine 6s infinite linear",
            opacity: "var(--liquid-opacity)",
          }}
        />

        <div
          className={cn(
            `h-20 w-20 overflow-hidden`,
            !image && "border-2 border-dashed border-white/30",
          )}
          style={{
            ...bgImageStyle,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(15px)",
            zIndex: 10,
            borderRadius: borderRadius,
          }}
        />

        <div className="z-10">
          <p
            style={{
              fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
              color: textColor,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {title}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: `calc(${borderRadius} - 1px)`,
            padding: "1px",
            background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0) 40%,
              rgba(255, 255, 255, 0) 60%,
              rgba(255, 255, 255, 0.2) 100%
            )
          `,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
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

const LiquidGlassWideFullImage = ({
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

const LiquidGlassHighFullImage = ({
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
