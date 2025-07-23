"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import getImageAddress from "@/utils/get-image-address";
import { redirect } from "next/navigation";

const ProductExpandedView = ({
  id,
  activeProduct,
  validImages,
  onClose,
  navigateImage,
  title,
  titleFont,
  bgColor,
  borderRadius,
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
  href,
}) => {
  const controls = useAnimation();
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const imageContainerRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        navigateImage(1);
      } else {
        navigateImage(-1);
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!activeProduct) return null;

  return (
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
              onClick={onClose}
              className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.div
              style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
              layoutId={`product-image-${id}`}
              className="flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl dark:bg-neutral-900 md:h-[90vh]"
            >
              {/* Images */}
              <div
                className="relative mt-16 h-64 w-full md:h-96"
                ref={imageContainerRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <motion.div
                  layoutId={`product-image-container-${id}`}
                  className="relative h-full w-full"
                  animate={controls}
                >
                  <Image
                    src={activeProduct.imageSrc}
                    alt={activeProduct.title || "Product image"}
                    fill
                    className="object-contain p-0"
                    priority
                  />
                </motion.div>

                {/*  Controll Buttons */}
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

                {/* Image dots */}
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
              <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6">
                <div>
                  <motion.div
                    layoutId={`product-title-container-${id}`}
                    className="mb-4"
                  >
                    <motion.h3
                      layoutId={`product-title-${id}`}
                      className="text-2xl font-bold"
                      style={{
                        color: titleColor,
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
                    {discount ? (
                      <div className="flex items-center gap-4">
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
                            {price.toLocaleString()}
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
                    ) : (
                      <motion.span
                        layoutId={`product-price-${id}`}
                        className="text-lg"
                        style={{
                          color: priceColor,
                          fontFamily: priceFont || "inherit",
                        }}
                      >
                        قیمت:{" "}
                        <span className="text-xl font-bold">
                          {price.toLocaleString()}{" "}
                        </span>
                        تومان
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6"
                  >
                    <motion.p
                      layoutId={`product-description-${id}`}
                      className="text-base"
                      style={{
                        color: descriptionColor,
                        fontFamily: descriptionFont || "inherit",
                      }}
                    >
                      {description}
                    </motion.p>
                  </motion.div>
                </div>

                {/* CTA */}
                {href && (
                  <button
                    className="mt-auto w-full rounded-lg bg-blue-600 px-4 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      const fullUrl = href.startsWith("http")
                        ? href
                        : `https://${href}`;
                      window.open(fullUrl, "_blank", "noopener,noreferrer");
                    }}
                  >
                    خرید محصول
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductExpandedView;
