"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";
import { motion } from "framer-motion";

const SocialsFieldWindows95 = (props) => {
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
      <div className="inline-flex items-center justify-center border-2 border-b-gray-600 border-l-gray-300 border-r-gray-600 border-t-gray-300 bg-[#c0c0c0] p-0.5 shadow-[inset_1px_1px_0px_0px_#ffffff]">
        {socials?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="px-4 py-2 text-gray-800"
          >
            No social links added
          </motion.div>
        ) : (
          <motion.div layout className="flex items-center gap-0">
            {socials?.map((social, index) => {
              const platform = socialPlatforms.find(
                (p) => p.value === social.platform,
              );
              if (!platform) return null;

              return (
                <motion.button
                  key={`${social.platform}-${index}`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 1 }}
                  onClick={() =>
                    handleSocialClick(social.platform, social.userId)
                  }
                  className={cn(
                    "relative m-0.5 flex h-8 w-8 items-center justify-center",
                    "border-2 border-b-gray-600 border-l-gray-300 border-r-gray-600 border-t-gray-300",
                    "active:border-b-gray-300 active:border-l-gray-600 active:border-r-gray-300 active:border-t-gray-600",
                    "transition-all duration-75 ease-linear",
                    !social.userId || !isLive
                      ? "opacity-60 grayscale"
                      : "bg-[#c0c0c0] hover:bg-[#d0d0d0]",
                  )}
                >
                  <span className="text-base text-gray-800">
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

export default SocialsFieldWindows95;
