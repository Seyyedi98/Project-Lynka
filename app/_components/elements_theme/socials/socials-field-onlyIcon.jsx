"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";
import { motion } from "framer-motion";

const SocialsFieldColoredIcon = (props) => {
  const { socials, isLive, borderRadius } = props;

  const handleSocialClick = (platform, userId) => {
    if (!userId || !isLive) return;

    const platformConfig = socialPlatforms.find((p) => p.value === platform);
    if (!platformConfig) return;

    if (platformConfig.urlPrefix) {
      const appUrl = `${platformConfig.urlPrefix}${userId}`;
      window.location.href = appUrl;

      setTimeout(() => {
        window.location.href = `${platformConfig.webPrefix}${userId}`;
      }, 500);
    } else {
      window.open(`${platformConfig.webPrefix}${userId}`, "_blank");
    }
  };

  if (!socials || socials.length === 0) {
    return (
      <div
        style={{ borderRadius: borderRadius }}
        className="grid h-16 w-full place-content-center border border-dashed border-gray-300 bg-gradient-to-r from-gray-100 to-gray-50 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
      >
        <p className="flex items-center gap-2 font-medium text-gray-500 dark:text-gray-400">
          <span className="i-lucide-plus-circle text-lg" />
          برای افزودن شبکه های اجتماعی کلیک کنید
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-wrap items-center justify-center gap-5 p-2">
      {socials?.map((social, index) => {
        const platform = socialPlatforms.find(
          (p) => p.value === social.platform,
        );
        if (!platform) return null;

        // Special handling for gradients (like Instagram) vs. solid colors
        const isGradient =
          typeof platform.background === "string" &&
          platform.background.includes("gradient");

        const iconStyle = isGradient
          ? {
              background: platform.background,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }
          : {
              color: platform.background,
            };

        return (
          <motion.button
            key={`${social.platform}-${index}`}
            whileHover={{ scale: 1.2, opacity: 0.8 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "tween", duration: 0.1 }}
            onClick={() => handleSocialClick(social.platform, social.userId)}
            disabled={!social.userId}
            className={cn(
              "transition-opacity",
              !social.userId && "opacity-40 grayscale",
            )}
          >
            <span className="text-2xl" style={iconStyle}>
              {platform.icon}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default SocialsFieldColoredIcon;
