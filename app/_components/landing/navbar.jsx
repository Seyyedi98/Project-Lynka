"use client";

import { LogIn, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function LandingPageNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolled2, setIsScrolled2] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();

  // For navbar blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For text and icons color change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled2(window.scrollY > 500);
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
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed right-0 top-0 z-50 w-full px-4 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? "bg-transparent shadow-lg backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="z-50 transition-opacity duration-300 hover:opacity-90"
          >
            <Image
              width={80}
              height={120}
              src="/logo.webp"
              alt="lynka logo"
              className="h-auto w-20"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            {[
              { label: "خانه", href: "/" },
              { label: "بلاگ", href: "/blog" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={
                  (`transition-all duration-200 hover:scale-105`,
                  isScrolled2
                    ? "text-primary/90 hover:text-primary"
                    : "text-white/90 hover:text-white")
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden md:block">
            {session.status !== "unauthenticated" ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-primary shadow-sm transition-all hover:bg-white/95 hover:text-primary hover:shadow-md"
              >
                <span>پنل کاربری</span>
                <LogIn className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-primary shadow-sm transition-all hover:bg-white/95 hover:text-primary hover:shadow-md"
              >
                <span>ورود</span>
                <LogIn className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="z-50 rounded-full p-2 transition-all hover:bg-white/10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu
                className={cn(
                  `h-6 w-6 text-white`,
                  isScrolled2 && "text-blue-400",
                )}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", damping: 25 }}
              className="mobile-menu-container fixed left-0 top-0 z-40 h-screen w-full bg-gradient-to-b from-[rgba(32,148,243,0.98)] to-[rgba(0,189,164,0.98)] pt-20 backdrop-blur-lg"
            >
              <div className="flex h-full flex-col items-center justify-between pb-20">
                <div className="flex w-full flex-col items-center gap-2 px-6">
                  {[
                    { label: "خانه", href: "/" },
                    { label: "بلاگ", href: "/blog" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        className="block w-full rounded-lg py-4 text-center text-xl font-medium text-white transition-all hover:bg-white/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full px-6"
                >
                  {session.status !== "unauthenticated" ? (
                    <Link
                      href="/dashboard"
                      className="mb-8 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-lg font-medium text-primary shadow-lg transition-all hover:bg-white/95"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>پنل کاربری</span>
                      <LogIn className="h-5 w-5" />
                    </Link>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-lg font-medium text-primary shadow-lg transition-all hover:bg-white/95"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>ورود</span>
                      <LogIn className="h-5 w-5" />
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
