"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { MapIcon } from "lucide-react";
import { useEffect, useState } from "react";

const MapFieldWindows95 = (props) => {
  const {
    coords,
    title,
    subtitleTitle,
    subtitleDescription,
    isPremium,
    font,
    borderRadius = "0px",
  } = props;
  const [latitude, longitude] = coords ? coords.split(",") : [null, null];
  const [loadedFont, setLoadedFont] = useState(null);
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

  const win95Colors = {
    lightBorder: "#FFFFFF",
    darkBorder: "#808080",
    darkerBorder: "#000000",
    buttonFace: "#C0C0C0",
    buttonText: "#000000",
    windowBackground: "#C0C0C0",
    titleBar: "#000080",
    titleBarGradient: "#1084d0",
  };

  const handleOpenNeshanMapWithRouting = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div
      className="relative w-full"
      style={{
        fontFamily: loadedFont
          ? `var(${loadedFont})`
          : "MS Sans Serif, sans-serif",
        fontSize: "12px",
      }}
    >
      {!isPremium && (
        <div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform p-2 text-center"
          style={{
            backgroundColor: win95Colors.buttonFace,
            border: "2px solid",
            borderColor: `${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
            boxShadow: `1px 1px 0px 0px ${win95Colors.darkerBorder}`,
            color: win95Colors.buttonText,
            padding: "3px 12px",
            fontWeight: "bold",
          }}
        >
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}

      <div
        className={cn(`w-full`, !isPremium && "opacity-70")}
        style={{
          backgroundColor: win95Colors.windowBackground,
          border: "2px solid",
          borderColor: `${win95Colors.darkBorder} ${win95Colors.lightBorder} ${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
        }}
      >
        {/* Windows 95 Title Bar */}
        <div
          style={{
            background: `linear-gradient(90deg, ${win95Colors.titleBar}, ${win95Colors.titleBarGradient})`,
            color: "white",
            padding: "4px 8px",
            fontWeight: "bold",
            fontSize: "13px",
            borderBottom: `2px solid ${win95Colors.darkBorder}`,
          }}
          className="text-center"
        >
          {title || "نقشه"}
        </div>

        <div style={{ padding: "8px" }}>
          {latitude && longitude ? (
            <>
              {/* Map Image */}
              <div
                style={{
                  border: "2px solid",
                  borderColor: `${win95Colors.lightBorder} ${win95Colors.darkBorder} ${win95Colors.darkBorder} ${win95Colors.lightBorder}`,
                  marginBottom: "8px",
                }}
              >
                <img
                  src={`https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&z=15&l=map&size=600,300&lang=fa_IR&pt=${longitude},${latitude},${mark}`}
                  alt="نقشه"
                  style={{
                    width: "100%",
                    display: "block",
                  }}
                />
              </div>

              {/* Location Info and Navigation */}
              <div
                style={{
                  backgroundColor: win95Colors.buttonFace,
                  border: "2px solid",
                  borderColor: `${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
                  padding: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {subtitleTitle}
                  </div>
                  <div style={{ fontSize: "11px" }}>{subtitleDescription}</div>
                </div>

                <button
                  onClick={handleOpenNeshanMapWithRouting}
                  style={{
                    backgroundColor: win95Colors.buttonFace,
                    border: "2px solid",
                    borderColor: `${win95Colors.lightBorder} ${win95Colors.darkBorder} ${win95Colors.darkBorder} ${win95Colors.lightBorder}`,
                    padding: "4px 12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.borderColor = `${win95Colors.darkBorder} ${win95Colors.lightBorder} ${win95Colors.lightBorder} ${win95Colors.darkBorder}`;
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.borderColor = `${win95Colors.lightBorder} ${win95Colors.darkBorder} ${win95Colors.darkBorder} ${win95Colors.lightBorder}`;
                  }}
                >
                  مسیریابی
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                height: "160px",
                display: "grid",
                placeContent: "center",
                backgroundColor: win95Colors.buttonFace,
                border: "2px dashed",
                borderColor: win95Colors.darkBorder,
                color: win95Colors.buttonText,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <MapIcon className="h-8 w-8" />
                انتخاب موقعیت
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapFieldWindows95;
