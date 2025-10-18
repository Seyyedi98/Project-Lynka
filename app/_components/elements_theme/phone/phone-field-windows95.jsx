"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { useEffect, useState } from "react";

const PhoneFieldWindows95 = (props) => {
  const { phone, isPremium, textColor = "#000000", font } = props;
  const [loadedFont, setLoadedFont] = useState(null);

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

  const handleClick = () => {
    if (!phone || !isPremium) return;

    // Check if the value is a phone number
    const isPhoneNumber = /^[\d\s+\-()]+$/.test(phone);
    // Check if the value is an email address
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phone);

    if (isPhoneNumber) {
      // Remove any non-digit characters except + for phone numbers
      const cleanPhone = phone.replace(/[^\d+]/g, "");
      window.open(`tel:${cleanPhone}`, "_self");
    } else if (isEmail) {
      window.open(`mailto:${phone}`, "_self");
    }
  };

  const win95Colors = {
    lightBorder: "#FFFFFF",
    darkBorder: "#808080",
    darkerBorder: "#000000",
    buttonFace: "#C0C0C0",
    buttonText: "#000000",
    windowBackground: "#C0C0C0",
  };

  return (
    <div className="relative w-full">
      {!isPremium && (
        <div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform p-2 text-center"
          style={{
            backgroundColor: win95Colors.buttonFace,
            border: "2px solid",
            borderColor: `${win95Colors.lightBorder} ${win95Colors.darkBorder} ${win95Colors.darkBorder} ${win95Colors.lightBorder}`,
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
        className={cn(
          `w-full text-wrap py-2`,
          !isPremium && "opacity-70",
          isPremium && phone && "cursor-pointer",
        )}
        style={{
          backgroundColor: win95Colors.windowBackground,
          padding: "8px",
        }}
        onClick={handleClick}
        role={isPremium && phone ? "button" : undefined}
        tabIndex={isPremium && phone ? 0 : undefined}
      >
        <div
          style={{
            backgroundColor: win95Colors.buttonFace,
            border: "2px solid",
            borderColor: `${win95Colors.darkBorder} ${win95Colors.lightBorder} ${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
            boxShadow: `1px 1px 0px 0px ${win95Colors.darkerBorder}`,
            padding: "8px",
            color: textColor,
            fontFamily: loadedFont
              ? `var(${loadedFont})`
              : "MS Sans Serif, sans-serif",
            whiteSpace: "pre-wrap",
            fontWeight: "bold",
          }}
          className={cn(
            "text-center font-bold",
            isPremium && phone && "hover:underline",
          )}
        >
          {phone || "برای ویرایش متن کلیک کنید"}
        </div>
      </div>
    </div>
  );
};

export default PhoneFieldWindows95;
