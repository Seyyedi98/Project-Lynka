"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";

const SocialsFieldDefault = (props) => {
  const { isSilver, socials } = props;

  const handleSocialClick = (platform, userId) => {
    if (!userId) return;

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
      {!isSilver && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `flex w-full flex-wrap items-center justify-center gap-2 rounded-md py-2`,
          !isSilver && "opacity-70",
        )}
      >
        {socials?.map((social, index) => {
          const platform = socialPlatforms.find(
            (p) => p.value === social.platform,
          );
          if (!platform) return null;

          return (
            <button
              key={index}
              onClick={() => handleSocialClick(social.platform, social.userId)}
              disabled={!social.userId || !isSilver}
              className={cn(
                "flex h-8 w-8 items-center justify-center gap-1 rounded-full p-1 text-sm text-white transition-all",
                "hover:scale-105 hover:shadow-md",
                !social.userId && "opacity-50",
                !isSilver && "cursor-not-allowed",
              )}
              style={{ background: platform.background }}
            >
              <span className="text-base">{platform.icon}</span>
              {/* <span>{platform.name}</span> */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialsFieldDefault;
