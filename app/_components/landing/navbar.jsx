"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 right-0 top-4 z-50 flex justify-center"
    >
      <nav
        className={cn(
          `w-[95%] max-w-6xl rounded-2xl px-5 py-4 pr-6 transition-all duration-300`,
          isOpen && !isScrolled ? "bg-white/20 backdrop-blur-sm" : "",
          isScrolled ? "bg-white/20 shadow-lg backdrop-blur-sm" : "",
        )}
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="text-xl font-bold text-primary hover:text-primary"
          >
            لینکا
          </Link>

          {/* Desktop Menu NAV Links */}
          <ul className="hidden items-center gap-6 text-sm font-medium text-gray-800 md:flex">
            {[
              { label: "خانه", href: "/" },
              { label: "بلاگ", href: "/blog" },
              { label: "قیمت ها", href: "/pricing" },
              { label: "تماس با ما", href: "/contact-us" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={`#${item.href.toLowerCase()}`}
                  className="transition hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* LOGIN || DASHBOARD BTN */}
          {session.status !== "unauthenticated" ? (
            <Link
              href="/dashboard"
              className="hidden rounded-full bg-primary px-5 py-2 text-white transition hover:bg-primary/70 hover:text-white md:flex"
            >
              پنل مدیریت
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/auth/login"
                className="hidden rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-primary/70 hover:text-white md:flex"
              >
                ورود
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 md:hidden"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Menu with animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden rounded-xl p-4 text-sm text-gray-800 md:hidden"
            >
              {[
                { label: "خانه", href: "/" },
                { label: "بلاگ", href: "/blog" },
                { label: "قیمت ها", href: "/pricing" },
                { label: "تماس با ما", href: "/contact-us" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.href.toLowerCase()}`}
                  className="block py-1 transition hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="mt-2 w-full rounded-full bg-primary px-5 py-2 text-white transition hover:bg-blue-700">
                Start Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
