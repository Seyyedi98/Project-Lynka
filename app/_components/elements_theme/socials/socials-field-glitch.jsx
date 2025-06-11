"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";
import { motion } from "framer-motion";

const SocialsFieldGaming = (props) => {
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
    <div className="my-2 flex w-full justify-center">
      <style>
        {`
        .social-glitch {
          position: relative;
          background: linear-gradient(45deg, #f0f0f0 0%, #ffffff 100%);
          border: 2px solid #e0e0e0;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), 
                      0 0 0 2px #00e6f6,
                      0 0 0 4px #ffffff;
        }
        
        .social-glitch::after {
          --slice-0: inset(50% 50% 50% 50%);
          --slice-1: inset(80% -6px 0 0);
          --slice-2: inset(50% -6px 30% 0);
          --slice-3: inset(10% -6px 85% 0);
          --slice-4: inset(40% -6px 43% 0);
          --slice-5: inset(80% -6px 5% 0);
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            rgba(255,255,255,0.8) 0%, 
            rgba(0,230,246,0.4) 50%, 
            rgba(255,255,255,0.8) 100%);
          clip-path: var(--slice-0);
          opacity: 0;
        }
        
        .social-glitch:hover::after {
          animation: 0.8s glitch;
          animation-timing-function: steps(2, end);
          opacity: 0.8;
        }
        
        @keyframes glitch {
          0% { clip-path: var(--slice-1); transform: translate(-5px, -5px); }
          10% { clip-path: var(--slice-3); transform: translate(5px, 5px); }
          20% { clip-path: var(--slice-1); transform: translate(-5px, 5px); }
          30% { clip-path: var(--slice-3); transform: translate(0px, 5px); }
          40% { clip-path: var(--slice-2); transform: translate(-5px, 0px); }
          50% { clip-path: var(--slice-3); transform: translate(5px, 0px); }
          60% { clip-path: var(--slice-4); transform: translate(5px, 5px); }
          70% { clip-path: var(--slice-2); transform: translate(-5px, 5px); }
          80% { clip-path: var(--slice-5); transform: translate(5px, -5px); }
          90% { clip-path: var(--slice-1); transform: translate(-5px, 0px); }
          100% { clip-path: var(--slice-1); transform: translate(0); }
        }
        `}
      </style>

      <div
        style={{ borderRadius: borderRadius }}
        className="inline-flex items-center border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-3 shadow-lg"
      >
        {socials?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            className="px-4 py-2 text-sm font-medium text-gray-600"
          >
            افزودن شبکه‌های اجتماعی
          </motion.div>
        ) : (
          <motion.div layout className="flex items-center gap-4">
            {socials?.map((social, index) => {
              const platform = socialPlatforms.find(
                (p) => p.value === social.platform,
              );
              if (!platform) return null;

              return (
                <motion.button
                  key={`${social.platform}-${index}`}
                  whileHover={{
                    scale: 1.15,
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleSocialClick(social.platform, social.userId)
                  }
                  className={cn(
                    "social-glitch relative flex h-14 w-14 items-center justify-center rounded-lg p-2 transition-all duration-300",
                    !isLive && "pointer-events-none opacity-50",
                  )}
                  style={{
                    color: platform.background,
                  }}
                >
                  <span className="text-2xl">{platform.icon}</span>
                  {isLive && (
                    <span className="absolute -bottom-1 -right-1 h-3 w-3 animate-pulse rounded-full border-2 border-white bg-cyan-400" />
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

export default SocialsFieldGaming;
