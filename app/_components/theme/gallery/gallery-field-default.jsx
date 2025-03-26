"use client";

import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import Image from "next/image";
import { useMemo } from "react";

const GalleryFieldDefault = (props) => {
  const { isSilver, images } = props;

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
      {!isSilver && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `grid w-full gap-2 rounded-md py-2`,
          gridClass,
          !isSilver && "opacity-70",
        )}
      >
        {validImages.length > 0 ? (
          validImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-md"
            >
              {console.log(image.key)}
              <Image
                src={getImageAddress(image.key)}
                alt={`Gallery image ${index + 1}`}
                className="h-full w-full object-cover"
                width={300}
                height={300}
                // loading="lazy"
                quality={80}
                // placeholder="blur"
                // blurDataURL="/placeholder-image.jpg" // Add a small placeholder image
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
