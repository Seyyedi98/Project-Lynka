"use client";

import { cn } from "@/lib/utils";

const PhoneFieldLiquidGlass = ({
  phone,
  textColor = "white",
  font,
  bgColor = "rgba(255, 255, 255, 0.16)",
  borderRadius = "16px",
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
        `relative w-full cursor-pointer text-wrap px-4 py-3 text-center transition-all duration-200`,
        phone && "hover:shadow-lg",
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
      onClick={handleClick}
      role={phone ? "button" : undefined}
      tabIndex={phone ? 0 : undefined}
    >
      {/* Liquid shine animation layer */}
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
          textIndent: "12px",
          color: textColor,
          fontFamily: font,
          whiteSpace: "pre-wrap",
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          zIndex: 10,
          position: "relative",
        }}
        className={cn("select-none text-center", phone && "hover:underline")}
      >
        {phone || "برای ویرایش شماره تماس کلیک کنید"}
      </p>

      {/* Border gradient overlay */}
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
    </div>
  );
};

export default PhoneFieldLiquidGlass;
