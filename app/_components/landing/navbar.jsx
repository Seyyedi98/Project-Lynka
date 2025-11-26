"use client";

import { LogIn, Menu, X, Home, BookOpen, Sparkles } from "lucide-react";
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

  // For navbar background change
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

  const navItems = [
    { label: "خانه", href: "/", icon: <Home className="h-4 w-4" /> },
    { label: "بلاگ", href: "/blog", icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed right-0 top-0 z-50 w-full px-4 transition-all duration-500",
          isScrolled || isMenuOpen
            ? "bg-slate-900/90 shadow-2xl backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-50"
          >
            <Link
              href="/"
              className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-90"
            >
              <div className="relative">
                <Image
                  width={80}
                  height={120}
                  src="/logo.webp"
                  alt="lynka logo"
                  className="h-auto w-20"
                />
              </div>
              <div
                className={cn(
                  "hidden text-xl font-bold lg:block",
                  "text-white",
                )}
              >
                لینکا
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium",
                    "text-white/90",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            {session.status !== "unauthenticated" ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg"
              >
                <span>پنل کاربری</span>
                <LogIn className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg"
              >
                <span>ورود</span>
                <LogIn className="h-4 w-4" />
              </Link>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "z-50 rounded-2xl p-3 md:hidden",
              isScrolled2 ? "bg-white/10" : "bg-white/5",
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="mobile-menu-container fixed left-0 top-0 z-40 h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-24 backdrop-blur-xl"
            >
              <div className="flex h-full flex-col items-center">
                {/* Navigation Items */}
                <div className="flex w-full flex-col items-center gap-4 px-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-lg font-medium text-white transition-all hover:bg-white/20"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Auth Button */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-full px-6 pt-4"
                >
                  {session.status !== "unauthenticated" ? (
                    <Link
                      href="/dashboard"
                      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 text-lg font-semibold text-white shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>پنل کاربری</span>
                      <LogIn className="h-5 w-5" />
                    </Link>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 text-lg font-semibold text-white shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>ورود به حساب</span>
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
