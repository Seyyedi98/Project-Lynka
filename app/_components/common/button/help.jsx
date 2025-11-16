"use client";

import { HelpCircle } from "lucide-react";
import { useTheme } from "next-themes";

const HelpButton = ({ href, onClick }) => {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, "_blank");
    }
  };

  const buttonClass = `flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none text-white no-underline shadow-sm transition-colors duration-200 ${
    isDark
      ? "bg-white/20 backdrop-blur-xl hover:bg-white/30 active:bg-white/40"
      : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
  }`;

  if (href && !onClick) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Help"
      >
        <HelpCircle
          size={20}
          className={isDark ? "text-white/80" : "text-white"}
        />
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={buttonClass} aria-label="Help">
      <HelpCircle
        size={20}
        className={isDark ? "text-white/80" : "text-white"}
      />
    </button>
  );
};

export default HelpButton;
