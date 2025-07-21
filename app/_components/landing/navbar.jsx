"use client";

import { LogIn, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LandingPageNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={`fixed right-0 top-0 z-40 flex h-16 w-full px-2 text-white transition-all duration-200 sm:pr-4 ${
          isScrolled || isMenuOpen
            ? "bg-gradient-to-r from-[rgba(32,148,243,0.9)] to-[rgba(0,189,164,0.9)] shadow-lg backdrop-blur-sm"
            : "bg-transparent"
        }`}
        style={{
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-1">
          {/* Logo */}
          <Link
            href="/"
            className="ml-4 text-xl font-bold text-white transition-opacity duration-300 hover:text-white hover:opacity-90"
          >
            <Image width={80} height={120} src="/logo.webp" alt="lynka logo" />
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            {[
              { label: "خانه", href: "/" },
              { label: "بلاگ", href: "/blog" },
              // { label: "قیمت ها", href: "/pricing" },
              // { label: "تماس با ما", href: "/contact-us" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white/80 transition-all duration-300 hover:scale-105 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Login Button - Hidden on mobile */}
          <div className="hidden items-center gap-4 md:flex">
            {session.status !== "unauthenticated" ? (
              <Link
                href="/dashboard"
                className="flex transform items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-primary shadow-sm transition-all duration-300 hover:text-slate-900 hover:shadow-md active:scale-95"
              >
                <span>پنل کاربری</span>
                <LogIn className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex transform items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-primary shadow-sm transition-all duration-300 hover:text-primary hover:shadow-md active:scale-95"
              >
                <span>ورود</span>
                <LogIn className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Mobile menu button - Always visible on mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-container fixed right-0 top-16 z-30 w-full bg-gradient-to-r from-[rgba(32,148,243,0.95)] to-[rgba(0,189,164,0.95)] shadow-lg backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="flex flex-col items-center gap-6 overflow-y-auto pb-6 pt-4"
              style={{ maxHeight: "calc(100vh - 4rem)" }}
            >
              {[
                { label: "خانه", href: "/" },
                { label: "بلاگ", href: "/blog" },
                // { label: "قیمت ها", href: "/pricing" },
                // { label: "تماس با ما", href: "/contact-us" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="w-full px-6"
                >
                  <Link
                    href={item.href}
                    className="block w-full py-3 text-center text-lg text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 w-full px-6"
              >
                {session.status !== "unauthenticated" ? (
                  <Link
                    href="/dashboard"
                    className="flex transform items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-primary shadow-sm transition-all duration-300 hover:text-slate-900 hover:shadow-md active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>پنل کاربری</span>
                    <LogIn className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex transform items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-primary shadow-sm transition-all duration-300 hover:text-primary hover:shadow-md active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>ورود</span>
                    <LogIn className="h-4 w-4" />
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
