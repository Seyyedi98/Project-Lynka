"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";
import { motion } from "framer-motion";

const SocialsFieldMacOS = (props) => {
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

  return (
    <div className="my-2 flex w-full justify-center">
      <div
        style={{ borderRadius: borderRadius }}
        className="inline-flex items-end border border-gray-300/20 bg-gray-200/30 p-3 shadow-lg backdrop-blur-md"
      >
        {socials?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            className="px-4 py-2 text-sm font-medium text-gray-500"
          >
            افزودن شبکه‌های اجتماعی
          </motion.div>
        ) : (
          <motion.div layout className="flex items-end gap-2">
            {socials?.map((social, index) => {
              const platform = socialPlatforms.find(
                (p) => p.value === social.platform,
              );
              if (!platform) return null;

              return (
                <motion.button
                  key={`${social.platform}-${index}`}
                  whileHover={{
                    scale: 1.2,
                    y: -10,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleSocialClick(social.platform, social.userId)
                  }
                  className={cn(
                    "rounded-2xl p-2 transition-all duration-300 ease-out",
                    "focus:outline-none",
                  )}
                  style={{
                    color: platform.background,
                  }}
                >
                  <div className="rounded-full bg-white/90 p-3 shadow-sm">
                    <span className="text-2xl">{platform.icon}</span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SocialsFieldMacOS;
