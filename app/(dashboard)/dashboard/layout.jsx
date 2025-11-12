/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import DashboardHeading from "@/app/_components/layout/navbar/dashboard-heading";
import DashboardSidebar from "@/app/_components/layout/navbar/dashboard-sidebar";

const bgMaskLight = "/bg-dashboard-mask.svg";
const bgMaskDark = "/bg-dashboard-mask-dark.svg";

const EditorLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = currentTheme === "dark";

  return (
    <>
      <DashboardSidebar />

      {/* Light Mode - Original with SVG */}
      {!isDark && (
        <>
          <img
            className="fixed mt-80 w-full translate-y-1/2 sm:mt-64 lg:translate-y-0"
            src={bgMaskLight}
            alt="bgmask"
          />
          <div className="fixed left-0 top-0 z-[-1] h-[400px] w-full bg-main-gradient-2"></div>
        </>
      )}

      {/* Dark Mode - New awesome version */}
      {isDark && (
        <div className="fixed inset-0 z-[-2]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />
          {/* Dark mode background elements */}
          <div className="absolute inset-0">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 animate-pulse rounded-full bg-purple-500/10 blur-3xl delay-1000" />
            <div className="absolute bottom-1/3 left-1/3 h-48 w-48 animate-pulse rounded-full bg-cyan-500/10 blur-3xl delay-500" />
          </div>
          {/* Dark grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      )}

      <main className="relative min-h-screen w-full">
        {/* Content Area */}
        <div className="relative">
          <DashboardHeading />
          <div className="relative z-10">{children}</div>
        </div>

        {/* Floating Particles - Only for dark mode */}
        {mounted && isDark && (
          <div className="pointer-events-none fixed inset-0 z-[-1]">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 animate-pulse rounded-full bg-white/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default EditorLayout;
