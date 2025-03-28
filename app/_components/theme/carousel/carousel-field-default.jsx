"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import Image from "next/image";

const CarouselFieldDefault = (props) => {
  const { title, slides, bgColor, borderRadius, font, textColor, isSilver } =
    props;

  return (
    <div className="relative w-full">
      {!isSilver && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `w-full overflow-hidden rounded-md py-2`,
          !isSilver && "opacity-70",
        )}
      >
        <h4 style={{ color: textColor }} className="mb-4 text-center">
          {title}
        </h4>
        <Carousel dir="ltr" className="w-full">
          <CarouselContent className="min-h-[200px]">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="relative aspect-video w-full">
                  {slide.image && (
                    <Image
                      fill
                      alt={slide.title}
                      src={getImageAddress(JSON.parse(slide.image).key)}
                      className="object-cover"
                      priority={index === 0} // Preload first image
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-4">
                    <p
                      style={{ color: textColor }}
                      className="text-center text-lg font-bold"
                    >
                      {slide.title}
                    </p>
                    <p
                      style={{ color: textColor }}
                      className="mt-2 text-center"
                    >
                      {slide.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="default" />
          <CarouselNext variant="default" />
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselFieldDefault;
