"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";
import { motion } from "framer-motion";

const SocialsFieldWindows = (props) => {
  const { socials, isLive } = props;

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

  return (
    <div className="relative my-1 flex w-full justify-center">
      <div className="inline-flex items-center justify-center rounded-full border border-gray-700 bg-gray-800/90 px-2 py-1 shadow-lg backdrop-blur-md">
        {socials?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="px-4 py-2 text-gray-400"
          >
            افزودن شبکه‌های اجتماعی
          </motion.div>
        ) : (
          <motion.div layout className="flex items-center gap-1">
            {socials?.map((social, index) => {
              const platform = socialPlatforms.find(
                (p) => p.value === social.platform,
              );
              if (!platform) return null;

              return (
                <motion.button
                  key={`${social.platform}-${index}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleSocialClick(social.platform, social.userId)
                  }
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded p-2",
                    "transition-all duration-200 ease-out",
                    !social.userId
                      ? "opacity-40 grayscale"
                      : "hover:bg-gray-700/50",
                  )}
                >
                  <span className="text-xl text-white">{platform.icon}</span>
                  {isLive && social.userId && (
                    <span className="absolute bottom-0 h-1 w-1 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SocialsFieldWindows;
