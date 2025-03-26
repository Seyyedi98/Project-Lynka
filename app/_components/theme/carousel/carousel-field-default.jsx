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
          `w-full text-wrap rounded-md py-2`,
          !isSilver && "opacity-70",
        )}
      >
        <h4 style={{ color: textColor }} className="text-center">
          {title}
        </h4>
        <Carousel dir="ltr">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <p style={{ color: textColor }} className="text-center">
                  {slide.title}
                </p>
                {slide.image ? (
                  <Image
                    width={500}
                    height={700}
                    alt={slide.title}
                    src={getImageAddress(JSON.parse(slide.image).key)}
                  />
                ) : null}
                <p style={{ color: textColor }} className="text-center">
                  {slide.description}
                </p>
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
