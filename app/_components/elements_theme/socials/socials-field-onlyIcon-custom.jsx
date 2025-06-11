"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";
import { motion } from "framer-motion";

const SocialsFieldOnlyIconCustom = (props) => {
  const { socials, isLive, textColor } = props;

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
    return null;
  }

  return (
    <div className="relative flex w-full flex-wrap items-center justify-center gap-5 p-2">
      {socials?.map((social, index) => {
        const platform = socialPlatforms.find(
          (p) => p.value === social.platform,
        );
        if (!platform) return null;

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
            style={{
              color: textColor || "currentColor",
            }}
          >
            <span className="text-2xl">{platform.icon}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default SocialsFieldOnlyIconCustom;
