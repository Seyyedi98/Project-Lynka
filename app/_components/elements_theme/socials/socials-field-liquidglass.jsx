"use client";

import { cn } from "@/lib/utils";
import socialPlatforms from "@/data/social-platforms";
import { motion } from "framer-motion";

const SocialsFieldLiquidGlass = (props) => {
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

  const hasMultipleLines = socials?.length > 5;
  const firstRowSocials = hasMultipleLines
    ? socials.slice(0, Math.ceil(socials.length / 2))
    : socials;
  const secondRowSocials = hasMultipleLines
    ? socials.slice(Math.ceil(socials.length / 2))
    : [];

  return (
    <div className="my-2 flex w-full justify-center">
      <div
        style={{
          borderRadius: borderRadius,
          background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.22) 0%,
              rgba(255, 255, 255, 0.1) 50%,
              rgba(255, 255, 255, 0.05) 70%,
              transparent 100%
            )
          `,
          backdropFilter: "blur(3px) saturate(180%)",
          WebkitBackdropFilter: "blur(3px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.18),
            inset 0 4px 12px rgba(255, 255, 255, 0.12),
            inset 0 -4px 12px rgba(0, 0, 0, 0.08)
          `,
          position: "relative",
          overflow: "hidden",
          "--liquid-opacity": "0.4",
        }}
        className="inline-flex w-full p-1"
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `
            linear-gradient(
              45deg,
              transparent 45%,
              rgba(255, 255, 255, 0.08) 50%,
              transparent 55%
            )
          `,
            animation: "liquidShine 6s infinite linear",
            opacity: "var(--liquid-opacity)",
          }}
        />

        {socials?.length === 0 ? (
          <div className="px-4 py-2 text-sm font-medium text-gray-500">
            برای افزودن شبکه های اجتماعی کلیک کنید
          </div>
        ) : (
          <motion.div
            layout
            className="flex w-full flex-col items-center justify-center gap-2"
          >
            {/* First Row */}
            <div className="flex items-center justify-center gap-1">
              {firstRowSocials.map((social, index) => {
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
                    disabled={!social.userId}
                    className={cn(
                      "rounded-2xl p-2 transition-all duration-300 ease-out",
                      "focus:outline-none",
                      !social.userId && "opacity-40 grayscale",
                    )}
                    style={{
                      color: platform.background,
                    }}
                  >
                    <div
                      className="rounded-full bg-white/90 p-3 shadow-sm"
                      style={{
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <span className="text-2xl">{platform.icon}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Second Row (only if more than 5 socials) */}
            {hasMultipleLines && (
              <div className="flex items-center justify-center gap-1">
                {secondRowSocials.map((social, index) => {
                  const platform = socialPlatforms.find(
                    (p) => p.value === social.platform,
                  );
                  if (!platform) return null;

                  return (
                    <motion.button
                      key={`${social.platform}-${index + firstRowSocials.length}`}
                      whileHover={{
                        scale: 1.2,
                        y: -10,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleSocialClick(social.platform, social.userId)
                      }
                      disabled={!social.userId}
                      className={cn(
                        "rounded-2xl p-2 transition-all duration-300 ease-out",
                        "focus:outline-none",
                        !social.userId && "opacity-40 grayscale",
                      )}
                      style={{
                        color: platform.background,
                      }}
                    >
                      <div
                        className="rounded-full bg-white/90 p-3 shadow-sm"
                        style={{
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <span className="text-2xl">{platform.icon}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: `calc(${borderRadius} - 1px)`,
            padding: "1px",
            background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0) 40%,
              rgba(255, 255, 255, 0) 60%,
              rgba(255, 255, 255, 0.2) 100%
            )
          `,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </div>

      <style jsx global>{`
        @keyframes liquidShine {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(25%, 25%) rotate(45deg);
          }
          50% {
            transform: translate(50%, 0) rotate(90deg);
          }
          75% {
            transform: translate(25%, 25%) rotate(135deg);
          }
          100% {
            transform: translate(0, 0) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SocialsFieldLiquidGlass;
