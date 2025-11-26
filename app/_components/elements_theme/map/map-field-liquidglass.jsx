/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { MapIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { trackClick } from "@/actions/page/analytics";
import ProtectedPagePasswordCheck from "../../section/livepage-password-check";

const handleMapClick = async ({
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
      window.open(href, "_blank");

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

const MapFieldLiquidGlass = (props) => {
  const {
    coords,
    title,
    subtitleTitle,
    subtitleDescription,
    textColor = "white",
    bgColor = "rgba(255, 255, 255, 0.16)",
    borderRadius = "16px",
    font,
    isPremium,
    isLive,
    protectedElement,
    password,
    uri,
    elementId,
  } = props;

  const [latitude, longitude] = coords ? coords.split(",") : [null, null];
  const [loadedFont, setLoadedFont] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mark = "round";

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

  const handleOpenMapWithRouting = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    handleMapClick({
      setIsModalOpen,
      protectedElement,
      href: mapsUrl,
      uri,
      elementId,
      isLive,
      title: "مسیریابی نقشه",
    });
  };

  return (
    <>
      <div className="my-2 flex w-full justify-center">
        <div
          className={cn(
            "inline-flex w-full cursor-pointer flex-col p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-100",
            (!isLive || !coords) && "pointer-events-none",
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
          onClick={handleOpenMapWithRouting}
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

          {!coords ? (
            <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-8">
              <MapIcon
                className="h-8 w-8 opacity-70"
                style={{ color: textColor }}
              />
              <span
                className="text-sm font-medium opacity-70"
                style={{ color: textColor }}
              >
                انتخاب موقعیت
              </span>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-4">
              {!isPremium && isLive && (
                <div
                  className="rounded-md bg-red-500/80 p-2 text-center text-sm font-medium text-white backdrop-blur-sm"
                  style={{
                    fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                  }}
                >
                  برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
                </div>
              )}

              {title && (
                <div
                  className="w-full rounded-md text-center text-lg font-medium"
                  style={{
                    fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                    color: textColor,
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                    opacity: !isPremium && isLive ? 0.7 : 1,
                  }}
                >
                  {title}
                </div>
              )}

              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={`https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&z=15&l=map&size=600,300&lang=fa_IR&pt=${longitude},${latitude},${mark}`}
                  alt="نقشه"
                  className="w-full shadow-sm"
                  style={{
                    opacity: !isPremium && isLive ? 0.7 : 1,
                  }}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 flex-col gap-1">
                  {subtitleTitle && (
                    <div
                      className="text-wrap text-sm font-medium"
                      style={{
                        fontFamily: loadedFont
                          ? `var(${loadedFont})`
                          : "inherit",
                        color: textColor,
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                        opacity: !isPremium && isLive ? 0.7 : 1,
                      }}
                    >
                      {subtitleTitle}
                    </div>
                  )}
                  {subtitleDescription && (
                    <div
                      className="text-wrap text-xs opacity-80"
                      style={{
                        fontFamily: loadedFont
                          ? `var(${loadedFont})`
                          : "inherit",
                        color: textColor,
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                        opacity: !isPremium && isLive ? 0.7 : 1,
                      }}
                    >
                      {subtitleDescription}
                    </div>
                  )}
                </div>

                <button
                  className={cn(
                    "rounded-full px-6 py-2 font-medium text-black transition-all duration-300",
                    "focus:outline-none",
                    !isPremium &&
                      isLive &&
                      "pointer-events-none opacity-40 grayscale",
                  )}
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenMapWithRouting();
                  }}
                  disabled={!isPremium && isLive}
                >
                  مسیریابی
                </button>
              </div>
            </div>
          )}

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
        </div>
      </div>

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
          "absolute right-0 top-0 hidden h-svh w-full",
          isModalOpen && "block",
        )}
      >
        <ProtectedPagePasswordCheck
          uri={uri}
          elementId={elementId}
          title={title}
          href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
          password={password}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};

export default MapFieldLiquidGlass;
