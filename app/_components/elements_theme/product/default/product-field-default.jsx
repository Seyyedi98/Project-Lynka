"use client";

import { useState, useMemo, useEffect, useId, useRef } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import ProductCard from "./product-card";
import ProductExpandedView from "./product-expanded-view";
import getImageAddress from "@/utils/get-image-address";

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
    href,
    bgColor,
    borderRadius,
    font,
    schedule,
    scheduleStart,
    scheduleEnd,
    countdown,
    countdownDate,
  } = props;

  const [activeProduct, setActiveProduct] = useState(null);
  const id = useId();
  const ref = useRef(null);

  // Check if image is valid
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
    <>
      <ProductCard
        id={id}
        isPremium={isPremium}
        images={images}
        title={title}
        titleFont={titleFont}
        titleColor={titleColor}
        description={description}
        descriptionFont={descriptionFont}
        descriptionColor={descriptionColor}
        price={price}
        priceFont={priceFont}
        priceColor={priceColor}
        discount={discount}
        discountFont={discountFont}
        discountColor={discountColor}
        theme={theme}
        bgColor={bgColor}
        borderRadius={borderRadius}
        font={font}
        schedule={schedule}
        scheduleStart={scheduleStart}
        scheduleEnd={scheduleEnd}
        countdown={countdown}
        countdownDate={countdownDate}
        onCardClick={setActiveProduct}
      />

      <ProductExpandedView
        id={id}
        activeProduct={activeProduct}
        validImages={validImages}
        onClose={() => setActiveProduct(null)}
        navigateImage={navigateImage}
        title={title}
        titleFont={titleFont}
        titleColor={titleColor}
        description={description}
        descriptionFont={descriptionFont}
        descriptionColor={descriptionColor}
        price={price}
        bgColor={bgColor}
        borderRadius={borderRadius}
        priceFont={priceFont}
        priceColor={priceColor}
        discount={discount}
        discountFont={discountFont}
        discountColor={discountColor}
        theme={theme}
        href={href}
      />
    </>
  );
};

export default ProductFieldDefault;
