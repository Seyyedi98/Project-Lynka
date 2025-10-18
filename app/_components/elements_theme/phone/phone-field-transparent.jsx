"use client";

import { cn } from "@/lib/utils";

const PhoneFieldTransparent = ({ phone, textColor, font, borderRadius }) => {
  const handleClick = () => {
    if (!phone) return;

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

  return (
    <div
      className={cn(
        `w-full cursor-pointer text-wrap rounded-md px-3 py-2 transition-all duration-200`,
        phone && "hover:opacity-80",
      )}
      style={{
        borderRadius: borderRadius,
      }}
      onClick={handleClick}
      role={phone ? "button" : undefined}
      tabIndex={phone ? 0 : undefined}
    >
      <p
        style={{
          textIndent: "12px",
          color: textColor,
          fontFamily: font,
          whiteSpace: "pre-wrap", // Recognise \n for line break
          fontWeight: "bold",
          textAlign: "center",
        }}
        className={cn("select-none font-bold", phone && "hover:underline")}
      >
        {phone || "برای ویرایش متن کلیک کنید"}
      </p>
    </div>
  );
};

export default PhoneFieldTransparent;
