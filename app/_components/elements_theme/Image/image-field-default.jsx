"use client";

import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

const ImageFieldDefault = (props) => {
  const { borderRadius, isPremium, image } = props;
  const imageUrl = image && getImageAddress(JSON.parse(image).key);

  return (
    <div className="relative w-full">
      {!isPremium && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        style={{ borderRadius: borderRadius }}
        className={cn(
          `flex w-full cursor-pointer flex-col items-start justify-center gap-2 overflow-hidden text-lg font-medium text-white shadow-lg`,
          !isPremium && "opacity-70",
        )}
      >
        {imageUrl ? (
          <Image
            height={720}
            width={720}
            alt="card Image"
            src={imageUrl}
            loading="lazy"
          />
        ) : (
          <div className="grid h-40 w-full place-content-center rounded-lg border-2 border-dashed border-black bg-white text-black">
            <div className="flex flex-col items-center justify-center gap-2">
              <ImageIcon className="h-8 w-8" />
              افزودن عکس
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageFieldDefault;
