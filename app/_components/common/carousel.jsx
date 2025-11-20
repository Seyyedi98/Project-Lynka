/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ChevronButton from "./button/NavigationButton/chevron-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";

const Carousel = ({ showArrows }) => {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  const data = [
    {
      image: "https://arklight.storage.c2.liara.space/files/bg_1.webp",
      title: "ساخت اولین صفحه",
      ctaText: "مشاهده",
      ctaLink: `${process.env.NEXT_PUBLIC_WEBSITE_URL}blog/cmi1yp4xo0000ljkktc9ur5a0`,
    },
    {
      image: "https://arklight.storage.c2.liara.space/files/bg_2.webp",
      title: "شخصی سازی ظاهر لینک",
      ctaText: "مشاهده",
      ctaLink: `${process.env.NEXT_PUBLIC_WEBSITE_URL}blog/cmi1yqrmm0001ljkklf1g1w1s`,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < data.length - 1 ? prev + 1 : 0));
    clearInterval(changeSlideInterval);
  }, [data.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : data.length - 1));
    clearInterval(changeSlideInterval);
  }, [data.length]);

  const changeSlideInterval = useEffect(() => {
    const changeSlideInterval = setInterval(handleNextSlide, 12000);
    return () => {
      clearInterval(changeSlideInterval);
    };
  }, [handleNextSlide, currentSlide]);

  // Custom button class for dark mode
  const ctaButtonClass = `flex cursor-pointer items-center justify-center rounded-lg border-none text-white no-underline shadow-sm transition-colors duration-200 ${
    isDark
      ? "bg-white/20 backdrop-blur-xl hover:bg-white/30 active:bg-white/40"
      : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
  } h-10 px-6 rounded-full`;

  return (
    <div className="relative flex h-60 w-full items-center justify-center bg-black xl:h-80">
      {/* Slider Controllers */}
      {showArrows && (
        <div className="absolute right-1 z-10" onClick={handlePrevSlide}>
          <ChevronButton direction="right" />
        </div>
      )}

      {showArrows && (
        <div className="absolute left-1 z-10" onClick={handleNextSlide}>
          <ChevronButton direction="left" />
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Slider Content */}
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="z-10 flex h-fit w-fit flex-col items-center justify-center"
        >
          <h3 className="text-center text-xl text-white md:text-2xl">
            {data[currentSlide].title}
          </h3>

          {/* Custom CTA Button */}
          <div className="mt-4">
            <Link href={data[currentSlide].ctaLink} className={ctaButtonClass}>
              <span className={isDark ? "text-white/80" : "text-white"}>
                {data[currentSlide].ctaText}
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Background Image */}
        <motion.div
          key={`image-${currentSlide}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute h-full w-full"
        >
          <div className="h-full w-full bg-black">
            <Image
              fill
              className="object-cover brightness-[60%]"
              src={data[currentSlide].image}
              alt="carousel"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Dots */}
      <div className="absolute bottom-2 flex gap-2">
        {data.map((image, index) => (
          <motion.div
            key={index}
            className={cn(
              `relative h-1 cursor-pointer overflow-hidden rounded-md bg-white/40 transition-all duration-300`,
              currentSlide === index ? "w-8 bg-white" : "w-3",
            )}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {currentSlide === index && (
              <motion.div
                className="absolute inset-0 rounded-md bg-white"
                layoutId="activeDot"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
