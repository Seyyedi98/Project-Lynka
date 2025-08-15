"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Globe, Link2, Share2, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPageHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const floatVariants = {
    initial: { opacity: 0, y: -20, scale: 0.8 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const underlineVariants = {
    hidden: { scaleX: 0, originX: 1 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-main-gradient py-32 transition-colors duration-300 md:py-32 lg:py-56"
      // className="relative overflow-hidden bg-gradient-to-br from-[hsl(172,100%,37%)] to-[hsl(207,90%,54%)] py-32 transition-colors duration-300 md:py-32 lg:py-56"
    >
      {/* Parallax Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y }}
      >
        <Image
          src="/bg_wave.svg"
          alt="background"
          fill
          className="object-cover object-center"
        />
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 224 12"
          fill="currentColor"
          className="-mb-1 w-full text-white"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto flex flex-col items-center px-4">
        <div className="w-full max-w-3xl text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            <motion.span
              variants={textVariants}
              custom={1}
              className="relative mt-4 inline-block"
            >
              صفحه شخصی خودت رو بساز
              <motion.div
                variants={underlineVariants}
                className="mx-auto mt-4 h-1 rounded-full bg-white/30 md:mt-8"
                initial="hidden"
                animate="visible"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={1.5}
            className="mx-auto mb-8 mt-8 text-lg leading-8 text-white/90 md:mt-12 md:text-xl"
          >
            لینک‌ها، شبکه‌های اجتماعی، محصولات و خدمات خود را در یک صفحه اختصاصی
            و جذاب گرد هم آورید تا همیشه حرفه‌ای دیده شوید.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            className="mt-12 flex justify-center"
          >
            <Link href="/dashboard">
              <Button variant="transparentWhite" className="h-14 px-8 text-lg">
                همین الان شروع کن!
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageHero;
