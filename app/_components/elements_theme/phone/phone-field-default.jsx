"use client";

import { cn } from "@/lib/utils";

const PhoneFieldDefault = ({
  phone,
  textColor,
  font,
  bgColor,
  borderColor,
  borderRadius,
}) => {
  // Check if the value is a phone number (contains only digits, spaces, +, -, and parentheses)
  const isPhoneNumber = /^[\d\s+\-()]+$/.test(phone);

  // Check if the value is an email address
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phone);

  const handleClick = () => {
    if (!phone) return;

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
        `w-full cursor-pointer text-wrap rounded-md px-3 py-3 transition-all duration-200 hover:opacity-80`,
        borderColor && "border-2",
        phone && "hover:shadow-md",
      )}
      style={{
        backgroundColor: bgColor,
        borderRadius: borderRadius,
        borderColor: borderColor,
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
        }}
        className={cn("select-none text-center", phone && "hover:underline")}
      >
        {phone || "برای ویرایش شماره تماس کلیک کنید"}
      </p>
    </div>
  );
};

export default PhoneFieldDefault;
