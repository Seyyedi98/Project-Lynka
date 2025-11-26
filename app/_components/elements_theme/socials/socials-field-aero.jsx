"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";
import { motion } from "framer-motion";

const SocialsFieldAero = (props) => {
  const { socials, borderRadius, isLive } = props;

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
    <div className="relative my-2 flex w-full justify-center">
      <div
        style={{ borderRadius: borderRadius }}
        className="inline-flex items-center justify-center border border-gray-500/30 bg-gray-800/60 p-4 shadow-lg backdrop-blur-md"
      >
        {socials?.length === 0 ? (
          <div className="px-4 py-2 font-light text-gray-300">
            برای افزودن شبکه های اجتماعی کلیک کنید
          </div>
        ) : (
          <motion.div
            layout
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {socials?.map((social, index) => {
              const platform = socialPlatforms.find(
                (p) => p.value === social.platform,
              );
              if (!platform) return null;

              return (
                <motion.button
                  key={`${social.platform}-${index}`}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: `0 4px 15px ${platform.background}80`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleSocialClick(social.platform, social.userId)
                  }
                  className={cn(
                    "relative flex h-14 w-14 items-center justify-center rounded-lg",
                    "border border-gray-500/30 bg-gray-700/50",
                    "transition-all duration-300 ease-out",
                    !social.userId
                      ? "opacity-50 grayscale"
                      : "hover:bg-gray-600/60 active:bg-gray-700/70",
                  )}
                  style={{
                    backdropFilter: "blur(4px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="text-2xl text-white drop-shadow-md">
                    {platform.icon}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SocialsFieldAero;
