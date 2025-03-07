/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChevronButton from "./button/chevron-button";
import { cn } from "@/lib/utils";

const CarouselComponent = () => {
  const images = [
    "https://arklight.storage.c2.liara.space/jinx6.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=6b96162b-d379-44a7-ae3f-e3cd178bbf19%2F20250307%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250307T165615Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=58ba12cc7fda20344fba36f187a21641bf559c73e943ab88253c3f26293c75ef",
    "https://arklight.storage.c2.liara.space/jinx7.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=6b96162b-d379-44a7-ae3f-e3cd178bbf19%2F20250307%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250307T165748Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=ccb5f0c8c8850c1292bd5ee4c3ed1d2ba00655b50df3c19dd1cea83ed2b943fb",
    "https://arklight.storage.c2.liara.space/jinx11.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=6b96162b-d379-44a7-ae3f-e3cd178bbf19%2F20250307%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250307T172330Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=303f63f01c1620e49cf39d3709a02b2d8e1a10a19c58d5ff0c197029e2bec2c8",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    clearInterval(changeSlideInterval);
  }, [images.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    clearInterval(changeSlideInterval);
  }, [images.length]);

  const changeSlideInterval = useEffect(() => {
    const changeSlideInterval = setInterval(handleNextSlide, 6000);
    return () => {
      clearInterval(changeSlideInterval);
    };
  }, [handleNextSlide, currentSlide]);

  return (
    <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute right-2 z-10" onClick={handlePrevSlide}>
        <ChevronButton direction="right" />
      </div>

      <AnimatePresence mode="wait">
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
              className="object-cover"
              src={images[currentSlide]}
              alt="carousel"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-2 z-10" onClick={handleNextSlide}>
        <ChevronButton direction="left" />
      </div>

      <div className="absolute bottom-2 flex gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              `relative h-1 w-4 cursor-pointer overflow-hidden rounded-md bg-white transition-all duration-200`,
              currentSlide === index && "w-8 bg-primary",
            )}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
