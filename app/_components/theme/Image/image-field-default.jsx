"use client";

import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";
import getImageAddress from "@/utils/get-image-address";
import Image from "next/image";

const ImageFieldDefault = (props) => {
  const { borderRadius, image } = props;
  const { isSilver } = useUserSubscription();
  const imageUrl = image && getImageAddress(JSON.parse(image).key);

  return (
    <div className="relative w-full">
      {!isSilver && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        style={{ borderRadius: borderRadius }}
        className={cn(
          `flex w-full cursor-pointer flex-col items-start justify-center gap-2 overflow-hidden text-lg font-medium text-white shadow-lg`,
          !isSilver && "opacity-70",
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
          "برای افزودن تصویر اینجا کلیک کنید"
        )}
      </div>
    </div>
  );
};

export default ImageFieldDefault;
