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

const Carousel = ({ showArrows }) => {
  const data = [
    {
      image:
        "https://arklight.storage.c2.liara.space/Road%20to%20Sa%20Calobra%2C%20Majorca%2C%20Spain.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=6b96162b-d379-44a7-ae3f-e3cd178bbf19%2F20250308%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250308T042310Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8a8167eeac40b0a5791b7bd6cdbe49903a48235df0510daff5e7e0294f8e9a1a",
      title: "Road to Sa Calobra",
      ctaText: "View",
      ctaLink: "#",
    },
    {
      image:
        "https://arklight.storage.c2.liara.space/lake-7844270_1920.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=6b96162b-d379-44a7-ae3f-e3cd178bbf19%2F20250308%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250308T042318Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c7cdb308c8ada6dd673e5206f272e427bbaa5bebc130c65f07db2490e950f0a4",
      title: "Lake",
      ctaText: "View",
      ctaLink: "#",
    },
    {
      image:
        "https://arklight.storage.c2.liara.space/manhattan-bridge-271357_1920.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=6b96162b-d379-44a7-ae3f-e3cd178bbf19%2F20250308%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250308T042324Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=af5bfb2f9288ac6722c6867748f04c0a983d6d41a2da039e39a4407ba8d7d9b7",
      title: "Manhattan Bridge",
      ctaText: "View",
      ctaLink: "#",
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="z-10 flex h-fit w-fit flex-col items-center justify-center"
        >
          <h3 className="text-3xl text-white">{data[currentSlide].title}</h3>
          <Button variant="primary_2" size="rounded" className="mt-1">
            <Link
              href={data[currentSlide].ctaLink}
              className="hover:text-white"
            >
              {data[currentSlide].ctaText}
            </Link>
          </Button>
        </motion.div>

        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute h-full w-full"
        >
          <div className="h-full w-full bg-black">
            <Image
              fill
              className="object-cover brightness-[60%]"
              src={data[currentSlide].image}
              alt="carousel"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Dots */}
      <div className="absolute bottom-2 flex gap-2">
        {data.map((image, index) => (
          <div
            key={index}
            className={cn(
              `relative h-1 w-3 cursor-pointer overflow-hidden rounded-md bg-white/40 transition-all duration-200`,
              currentSlide === index && "w-8 bg-white",
            )}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
