"use client";

import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import { ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useMemo, useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

const ProductFieldDefault = (props) => {
  const {
    isPremium,
    images,
    title,
    titleFont,
    titleColor,
    description,
    descriptionFont,
    descriptionColor,
    price,
    priceFont,
    priceColor,
    discount,
    discountFont,
    discountColor,
    theme,
    bgColor,
    borderRadius,
    font,
    schedule,
    scheduleStart,
    scheduleEnd,
    countdown,
    countdownDate,
  } = props;

  const [loadedImages, setLoadedImages] = useState({});
  const [activeProduct, setActiveProduct] = useState(null);
  const id = useId();
  const ref = useRef(null);

  // Filter out invalid images
  const validImages = useMemo(() => {
    return (images || [])
      .map((img) => {
        try {
          return img?.image ? JSON.parse(img.image) : null;
        } catch (e) {
          console.error("Error parsing image:", e);
          return null;
        }
      })
      .filter(Boolean);
  }, [images]);

  // Handle image load
  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  // Calculate discounted price
  const discountedPrice = useMemo(() => {
    if (discount && price) {
      return price - (price * discount) / 100;
    }
    return null;
  }, [discount, price]);

  // Handle keyboard navigation
  useEffect(() => {
    function onKeyDown(event) {
      if (!activeProduct) return;

      if (event.key === "Escape") {
        setActiveProduct(null);
      } else if (event.key === "ArrowRight") {
        navigateImage(1);
      } else if (event.key === "ArrowLeft") {
        navigateImage(-1);
      }
    }

    if (activeProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProduct]);

  useOutsideClick(ref, () => setActiveProduct(null));

  // Handle image navigation
  const navigateImage = (direction) => {
    if (!activeProduct) return;

    const currentIndex = validImages.findIndex(
      (img) => getImageAddress(img.key) === activeProduct.imageSrc,
    );

    const newIndex =
      (currentIndex + direction + validImages.length) % validImages.length;
    const newImage = validImages[newIndex];

    setActiveProduct({
      ...activeProduct,
      imageSrc: getImageAddress(newImage.key),
      currentIndex: newIndex,
    });
  };

  return (
    <div
      className="relative w-full"
      style={{
        backgroundColor: bgColor || (theme === "dark" ? "#1a1a1a" : "#ffffff"),
        borderRadius: `${borderRadius || 8}px`,
        fontFamily: font || "inherit",
      }}
    >
      {!isPremium && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}

      <div className={cn("flex w-full gap-4 p-4", !isPremium && "opacity-70")}>
        {/* Image section - square and edge to edge */}
        <motion.div
          layoutId={`product-image-${id}`}
          className="relative aspect-square h-full min-h-[120px] w-[120px] shrink-0 cursor-pointer overflow-hidden rounded-md"
          onClick={() =>
            isPremium &&
            validImages.length > 0 &&
            setActiveProduct({
              title,
              description,
              price,
              discount,
              discountedPrice,
              imageSrc: getImageAddress(validImages[0].key),
              currentIndex: 0,
            })
          }
        >
          {validImages.length > 0 ? (
            <div className="relative h-full w-full">
              {!loadedImages[0] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-400 border-t-blue-500" />
                </div>
              )}
              <Image
                src={getImageAddress(validImages[0].key)}
                alt={`Product image`}
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-300",
                  loadedImages[0] ? "opacity-100" : "opacity-0",
                )}
                fill
                quality={80}
                onLoad={() => handleImageLoad(0)}
                onError={() => handleImageLoad(0)}
              />
            </div>
          ) : (
            <div className="grid h-full w-full place-content-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-100">
              <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                <ImageIcon className="h-6 w-6" />
                <span className="text-xs">افزودن عکس</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Product details section */}
        <div className="flex flex-1 flex-col justify-center gap-1">
          {/* Title */}
          {title && (
            <motion.h3
              layoutId={`product-title-${id}`}
              className="text-lg font-medium leading-tight"
              style={{
                color: titleColor || (theme === "dark" ? "#ffffff" : "#000000"),
                fontFamily: titleFont || "inherit",
              }}
            >
              {title}
            </motion.h3>
          )}

          {/* Description */}
          {description && (
            <motion.p
              layoutId={`product-description-${id}`}
              className="text-sm"
              style={{
                color:
                  descriptionColor ||
                  (theme === "dark" ? "#d1d5db" : "#4b5563"),
                fontFamily: descriptionFont || "inherit",
              }}
            >
              {description}
            </motion.p>
          )}

          {/* Price section */}
          <div className="mt-2 flex flex-col">
            {discount && discountedPrice ? (
              <>
                <div className="flex items-center gap-2">
                  <motion.span
                    layoutId={`product-original-price-${id}`}
                    className="text-sm line-through opacity-70"
                    style={{
                      color:
                        priceColor ||
                        (theme === "dark" ? "#d1d5db" : "#4b5563"),
                      fontFamily: priceFont || "inherit",
                    }}
                  >
                    {price.toLocaleString()}
                  </motion.span>
                  <motion.span
                    layoutId={`product-discount-${id}`}
                    className="text-xs font-bold"
                    style={{
                      color: discountColor || "#ef4444",
                      fontFamily: discountFont || "inherit",
                    }}
                  >
                    {discount}% OFF
                  </motion.span>
                </div>
                <motion.span
                  layoutId={`product-price-${id}`}
                  className="text-lg font-bold"
                  style={{
                    color:
                      priceColor || (theme === "dark" ? "#ffffff" : "#000000"),
                    fontFamily: priceFont || "inherit",
                  }}
                >
                  {discountedPrice.toLocaleString()}
                </motion.span>
              </>
            ) : (
              <motion.span
                layoutId={`product-price-${id}`}
                className="text-lg font-bold"
                style={{
                  color:
                    priceColor || (theme === "dark" ? "#ffffff" : "#000000"),
                  fontFamily: priceFont || "inherit",
                }}
              >
                {price?.toLocaleString()}
              </motion.span>
            )}
          </div>

          {/* Schedule or countdown (if enabled) */}
          {(schedule || countdown) && (
            <div className="mt-2 text-xs text-gray-500">
              {schedule && `Available: ${scheduleStart} - ${scheduleEnd}`}
              {countdown && `Ends in: ${countdownDate}`}
            </div>
          )}
        </div>
      </div>

      {/* Expanded product view */}
      <AnimatePresence>
        {activeProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80"
            />

            <div className="fixed inset-0 z-50 grid place-items-center">
              <motion.button
                onClick={() => setActiveProduct(null)}
                className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              >
                <X className="h-6 w-6" />
              </motion.button>

              <motion.div
                layoutId={`product-image-${id}`}
                ref={ref}
                className="flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white dark:bg-neutral-900 md:h-[90vh]"
              >
                {/* Image section with navigation */}
                <div className="relative h-64 w-full md:h-96">
                  <motion.div
                    layoutId={`product-image-container-${id}`}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={activeProduct.imageSrc}
                      alt={activeProduct.title || "Product image"}
                      fill
                      className="object-contain p-0"
                      priority
                    />
                  </motion.div>

                  {/* Navigation arrows */}
                  {validImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage(-1);
                        }}
                        className="absolute left-2 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage(1);
                        }}
                        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  {/* Image indicator dots */}
                  {validImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 transform gap-2">
                      {validImages.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full transition-all ${
                            index === activeProduct.currentIndex
                              ? "w-4 bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Product details */}
                <div className="flex-1 overflow-y-auto p-6">
                  <motion.div
                    layoutId={`product-title-container-${id}`}
                    className="mb-4"
                  >
                    <motion.h3
                      layoutId={`product-title-${id}`}
                      className="text-2xl font-bold"
                      style={{
                        color:
                          titleColor ||
                          (theme === "dark" ? "#ffffff" : "#000000"),
                        fontFamily: titleFont || "inherit",
                      }}
                    >
                      {title}
                    </motion.h3>
                  </motion.div>

                  <motion.div
                    layoutId={`product-price-container-${id}`}
                    className="mb-6"
                  >
                    {discount && discountedPrice ? (
                      <div className="flex items-center gap-4">
                        <motion.span
                          layoutId={`product-price-${id}`}
                          className="text-2xl font-bold"
                          style={{
                            color:
                              priceColor ||
                              (theme === "dark" ? "#ffffff" : "#000000"),
                            fontFamily: priceFont || "inherit",
                          }}
                        >
                          {discountedPrice.toLocaleString()}
                        </motion.span>
                        <motion.span
                          layoutId={`product-original-price-${id}`}
                          className="text-lg line-through opacity-70"
                          style={{
                            color:
                              priceColor ||
                              (theme === "dark" ? "#d1d5db" : "#4b5563"),
                            fontFamily: priceFont || "inherit",
                          }}
                        >
                          {price.toLocaleString()}
                        </motion.span>
                        <motion.span
                          layoutId={`product-discount-${id}`}
                          className="rounded bg-red-500 px-2 py-1 text-sm font-bold text-white"
                          style={{
                            fontFamily: discountFont || "inherit",
                          }}
                        >
                          {discount}% OFF
                        </motion.span>
                      </div>
                    ) : (
                      <motion.span
                        layoutId={`product-price-${id}`}
                        className="text-2xl font-bold"
                        style={{
                          color:
                            priceColor ||
                            (theme === "dark" ? "#ffffff" : "#000000"),
                          fontFamily: priceFont || "inherit",
                        }}
                      >
                        {price?.toLocaleString()}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose dark:prose-invert max-w-none"
                  >
                    <motion.h4
                      className="mb-2 text-lg font-semibold"
                      style={{
                        color:
                          titleColor ||
                          (theme === "dark" ? "#ffffff" : "#000000"),
                      }}
                    >
                      Product Details
                    </motion.h4>
                    <motion.p
                      layoutId={`product-description-${id}`}
                      className="text-base"
                      style={{
                        color:
                          descriptionColor ||
                          (theme === "dark" ? "#d1d5db" : "#4b5563"),
                        fontFamily: descriptionFont || "inherit",
                      }}
                    >
                      {description}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFieldDefault;
