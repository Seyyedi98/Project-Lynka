"use client";

import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";

const GalleryFieldDefault = (props) => {
  const { isPremium, images, borderRadius } = props;
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullscreenLoading, setFullscreenLoading] = useState(false);

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

  // Determine grid columns based on image count - Almost not wirking :(
  const gridClass = useMemo(() => {
    if (!validImages.length) return "grid-cols-1";

    const count = validImages.length;
    if (count <= 3) return `grid-cols-${count}`;
    if (count === 4) return "grid-cols-2";
    return "grid-cols-3";
  }, [validImages.length]);

  // Handle image click
  const handleImageClick = (image, index) => {
    if (isPremium) {
      setFullscreenLoading(true);
      setSelectedImage({ src: getImageAddress(image.key), index });
    }
  };

  // Handle close preview
  const closePreview = () => {
    setSelectedImage(null);
    setFullscreenLoading(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!selectedImage) return;

    if (e.key === "Escape") {
      closePreview();
    } else if (e.key === "ArrowRight") {
      navigateImage(1);
    } else if (e.key === "ArrowLeft") {
      navigateImage(-1);
    }
  };

  // Handle image navigation
  const navigateImage = (direction) => {
    const newIndex =
      (selectedImage.index + direction + validImages.length) %
      validImages.length;
    setFullscreenLoading(true);
    setSelectedImage({
      src: getImageAddress(validImages[newIndex].key),
      index: newIndex,
    });
  };

  // Reset loading state when selected image changes
  useEffect(() => {
    if (selectedImage) {
      const img = new window.Image();
      img.src = selectedImage.src;
      img.onload = () => setFullscreenLoading(false);
      img.onerror = () => setFullscreenLoading(false);
    }
  }, [selectedImage]);

  return (
    <div className="relative w-full" onKeyDown={handleKeyDown} tabIndex={0}>
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
              style={{ borderRadius: borderRadius }}
              className="relative aspect-square overflow-hidden transition-transform hover:scale-105 hover:cursor-pointer"
              onClick={() => handleImageClick(image, index)}
            >
              {!loadedImages[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-400 border-t-blue-500" />
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
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageLoad(index)}
              />
            </div>
          ))
        ) : (
          <div className="grid h-40 w-full place-content-center rounded-lg border-2 border-dashed border-black bg-white text-black">
            <div className="flex flex-col items-center justify-center gap-2">
              <ImageIcon className="h-8 w-8" />
              افزودن عکس
            </div>
          </div>
        )}
      </div>

      {/* Full-screen image preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <button
            onClick={closePreview}
            className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative flex h-full max-h-[90vh] w-full max-w-[90vw] items-center justify-center">
            {fullscreenLoading ? (
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-600 border-t-blue-400" />
            ) : (
              <Image
                src={selectedImage.src}
                alt={`Full screen preview ${selectedImage.index + 1}`}
                className="object-contain"
                fill
                quality={100}
                priority
                onLoad={() => setFullscreenLoading(false)}
                onError={() => setFullscreenLoading(false)}
              />
            )}
          </div>

          {validImages.length > 1 && (
            <>
              <button
                onClick={() => navigateImage(-1)}
                className="absolute left-4 top-1/2 z-50 -translate-y-1/2 transform rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
                disabled={fullscreenLoading}
              >
                &larr;
              </button>
              <button
                onClick={() => navigateImage(1)}
                className="absolute right-4 top-1/2 z-50 -translate-y-1/2 transform rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
                disabled={fullscreenLoading}
              >
                &rarr;
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryFieldDefault;
