"use client";

import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const ProductCard = ({
  id,
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
  onCardClick,
}) => {
  const [loadedImages, setLoadedImages] = useState({});

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

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{
        backgroundColor: bgColor,
        borderRadius: `${borderRadius}`,
        fontFamily: font || "inherit",
      }}
      onClick={() => {
        if (isPremium && validImages.length > 0) {
          onCardClick({
            title,
            description,
            price,
            discount,
            imageSrc: getImageAddress(validImages[0].key),
            currentIndex: 0,
          });
        }
      }}
    >
      {!isPremium && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}

      <div className={cn("flex w-full gap-4", !isPremium && "opacity-70")}>
        {/* Product details section */}
        <div className="flex flex-1 flex-col justify-center gap-1">
          {/* Title */}
          {title && (
            <motion.h3
              layoutId={`product-title-${id}`}
              className="text-wrap pr-6 text-lg font-medium leading-tight"
              style={{
                color: titleColor,
                fontFamily: titleFont || "inherit",
              }}
            >
              {title}
            </motion.h3>
          )}

          {/* Price section */}
          <div className="">
            {discount ? (
              <>
                <div className="flex flex-col items-start justify-start pr-6">
                  <motion.span
                    layoutId={`product-original-price-${id}`}
                    className="text-lg"
                    style={{
                      color: priceColor,
                      fontFamily: priceFont || "inherit",
                    }}
                  >
                    قیمت:{" "}
                    <span className="text-xl line-through opacity-70">
                      {price.toLocaleString("fa-IR")}
                    </span>
                  </motion.span>
                  <motion.span
                    layoutId={`product-discount-${id}`}
                    className="text-lg"
                    style={{
                      color: discountColor || "#ef4444",
                      fontFamily: discountFont || "inherit",
                    }}
                  >
                    فقط:{" "}
                    <span
                      style={{
                        color: discountColor || "#ef4444",
                        fontFamily: discountFont || "inherit",
                      }}
                    >
                      {discount}
                    </span>{" "}
                    تومان
                  </motion.span>
                </div>
              </>
            ) : (
              <motion.span
                layoutId={`product-price-${id}`}
                className="pr-6 text-lg"
                style={{
                  color: priceColor,
                  fontFamily: priceFont || "inherit",
                }}
              >
                قیمت:{" "}
                <span className="text-xl font-bold">
                  {price.toLocaleString("fa-IR")}{" "}
                </span>
                تومان
              </motion.span>
            )}
          </div>
        </div>

        {/* Image section */}
        <motion.div
          layoutId={`product-image-${id}`}
          className={`relative aspect-square h-full min-h-[100px] w-[100px] shrink-0 overflow-hidden`}
          style={{
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
          }}
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
      </div>
    </div>
  );
};

export default ProductCard;
