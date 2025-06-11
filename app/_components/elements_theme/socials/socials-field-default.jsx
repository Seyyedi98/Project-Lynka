"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";
import { motion } from "framer-motion";

const SocialsFieldDefault = (props) => {
  const { socials, isLive, bgColor, borderRadius } = props;

  const handleSocialClick = (platform, userId) => {
    if (!userId || !isLive) return;

    const platformConfig = socialPlatforms.find((p) => p.value === platform);
    if (!platformConfig) return;

    // Try to open app first
    if (platformConfig.urlPrefix) {
      const appUrl = `${platformConfig.urlPrefix}${userId}`;
      window.location.href = appUrl;

      // Fallback to web after delay if app didn't open
      setTimeout(() => {
        window.location.href = `${platformConfig.webPrefix}${userId}`;
      }, 500);
    } else {
      // Directly open web if no app scheme
      window.open(`${platformConfig.webPrefix}${userId}`, "_blank");
    }
  };

  return (
    <div className="relative w-full">
      {socials?.length === 0 ? (
        <motion.div
          style={{ borderRadius: borderRadius }}
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid h-16 w-full place-content-center border border-dashed border-gray-300 bg-gradient-to-r from-gray-100 to-gray-50 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
        >
          <p className="flex items-center gap-2 font-medium text-gray-500 dark:text-gray-400">
            <span className="i-lucide-plus-circle text-lg" />
            افزودن شبکه‌های اجتماعی
          </p>
        </motion.div>
      ) : (
        <motion.div
          layout
          style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
          className={cn(
            `flex w-full flex-wrap items-center justify-center gap-3 p-3`,
          )}
        >
          {socials?.map((social, index) => {
            const platform = socialPlatforms.find(
              (p) => p.value === social.platform,
            );
            if (!platform) return null;

            return (
              <motion.button
                key={`${social.platform}-${index}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  handleSocialClick(social.platform, social.userId)
                }
                disabled={!social.userId}
                className={cn(
                  "group relative flex h-10 w-10 items-center justify-center rounded-xl p-2 text-white transition-all",
                  "hover:shadow-lg hover:ring-2 hover:ring-white/50",
                  !social.userId && "opacity-40 grayscale",
                )}
                style={{
                  background: platform.background,
                  boxShadow: `0 4px 6px -1px ${platform.background}20, 0 2px 4px -2px ${platform.background}20`,
                }}
              >
                <span className="text-xl transition-transform group-hover:scale-110">
                  {platform.icon}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default SocialsFieldDefault;
