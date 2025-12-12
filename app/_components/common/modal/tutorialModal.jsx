"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const tutorialSlides = [
  {
    id: 1,
    title: "خوش آمدید",
    description:
      "به لینکا خوش اومدی! اینجا میتونی صفحه خودتو هر طوری که دوست داری بچینی! میخوای بدونی چطور؟ بیا مرحله بعدی...",
  },
  {
    id: 2,
    title: "بلوک ها",
    image: "https://arklight.storage.c2.liara.space/preview/tutorial-1.webp",
    description:
      "یه صفحه لینکا از کلی بلوک ساخته میشه. برای ساخت اولین بلوکت روی دکمه + کلیک کن تا لیست بلوکا واست نشون داده بشه",
  },
  {
    id: 3,
    title: "افزودن بلوک",
    image: "https://arklight.storage.c2.liara.space/preview/tutorial-2.webp",
    description:
      "حالا میتونی هر بلوکی رو که میخوای با زدن روش به صفحه اصلیت اضافه کنی",
  },
  {
    id: 4,
    title: "ویرایشگر",
    image: "https://arklight.storage.c2.liara.space/preview/tutorial-3.webp",
    description:
      "این ویرایشگر صفحه تو هست که همه بلوک هات اینجا نشون داده میشن. میتونی روی هر بلوکی که خواستی بزنی و نگه داری تا بتونی جا به جاش کنی. با یک بار زدن روش صفحه ویرایش مشخصات بلوک واست باز میشه",
  },
  {
    id: 5,
    title: "شخصی سازه",
    image: "https://arklight.storage.c2.liara.space/preview/tutorial-4.webp",
    description:
      "حالا میتونی محتوا یا ظاهرش رو هر طور که میخوای بسازی. وقتی تموم شدی یادت نره دکمه سبز رنگ تایید رو از بالا سمت راست بزنی تا تغییراتت اعمال بشه",
  },
  {
    id: 6,
    title: "انتشار",
    image: "https://arklight.storage.c2.liara.space/preview/tutorial-5.webp",
    description:
      "بلوک هات رو که ساختی وفتشه صفحه ات رو منتشر کنی!‌ کافیه از بالای صفحه دکمه 'ذخیره' رو بزنی تا پیجت واسه همه قابل مشاهده بشه!",
  },
];

export default function PageTutorialModal({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const isLastSlide = currentSlide === tutorialSlides.length - 1;

  // Reset loading when slide changes
  useEffect(() => {
    const slide = tutorialSlides[currentSlide];
    if (slide.image && !loadedImages[slide.id]) {
      setIsLoading(true);
    }
  }, [currentSlide, loadedImages]);

  const handleNext = () => {
    if (isLastSlide) {
      onClose();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleImageLoad = (slideId) => {
    setIsLoading(false);
    setLoadedImages((prev) => ({
      ...prev,
      [slideId]: true,
    }));
  };

  const slide = tutorialSlides[currentSlide];

  return (
    <div className="rtl flex h-full flex-col items-center">
      {/* Progress dots */}
      <div className="mb-6 flex gap-2">
        {tutorialSlides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Image with loading state */}
      {slide.image && (
        <div className="relative mb-6 h-72 w-full">
          {/* Loading skeleton */}
          {isLoading && (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                <p className="mt-2 text-sm text-gray-500">در حال بارگذاری...</p>
              </div>
            </div>
          )}

          {/* Image - only show when not loading */}
          <div
            className={`${isLoading ? "absolute opacity-0" : "opacity-100 transition-opacity duration-300"}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
              onLoad={() => handleImageLoad(slide.id)}
              onError={() => handleImageLoad(slide.id)} // Also handle errors
            />
          </div>
        </div>
      )}

      {/* Text */}
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">{slide.title}</h3>
        <p className="text-base text-text">{slide.description}</p>
      </div>

      {/* Button - only show if NOT last slide */}
      {!isLastSlide && (
        <div className="mt-auto w-full">
          <button
            onClick={handleNext}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={slide.image && isLoading}
          >
            {isLoading ? "در حال بارگذاری..." : "ادامه"}
          </button>
        </div>
      )}
    </div>
  );
}
