"use client";

import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import Image from "next/image";
import { useState, useMemo } from "react";

const GalleryFieldDefault = (props) => {
  const { isPremium, images } = props;
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

  // Determine grid columns based on image count
  const gridClass = useMemo(() => {
    if (!validImages.length) return "grid-cols-1";

    const count = validImages.length;
    if (count <= 3) return `grid-cols-${count}`;
    if (count === 4) return "grid-cols-2";
    return "grid-cols-3";
  }, [validImages.length]);

  return (
    <div className="relative w-full">
      {!isPremium && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `grid w-full gap-2 rounded-md py-2`,
          gridClass,
          !isPremium && "opacity-70",
        )}
      >
        {validImages.length > 0 ? (
          validImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-md"
            >
              {!loadedImages[index] && (
                <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-200">
                  <span className="text-gray-500">در حال بارگزاری</span>
                </div>
              )}
              <Image
                src={getImageAddress(image.key)}
                alt={`Gallery image ${index + 1}`}
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-300",
                  loadedImages[index] ? "opacity-100" : "opacity-0",
                )}
                width={300}
                height={300}
                quality={80}
                onLoadingComplete={() => handleImageLoad(index)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex h-40 items-center justify-center text-gray-500">
            هیچ تصویری وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryFieldDefault;
