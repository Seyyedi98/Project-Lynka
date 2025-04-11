"use client";

import Image from "next/image";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import getImageAddress from "@/utils/get-image-address";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

// Dynamic imports for better performance
const MetaImageUploader = dynamic(
  () =>
    import("../input/meta-image-uploader").then(
      (mod) => mod.default || mod.PageBgImageUploader,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-32 w-full rounded-md" />,
  },
);

const FaviconUploader = dynamic(() => import("../input/favicon-uploader"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-32 rounded-md" />,
});

const MetaImageAndFaviconForm = ({ uri, image, favicon }) => {
  const { isPremium } = useUserSubscription();

  // Parse image URLs
  const metaImage = image ? getImageAddress(JSON.parse(image).key) : "";
  const metaFavicon = favicon ? getImageAddress(JSON.parse(favicon).key) : "";

  // Handle upload success/error
  const handleImageUploadSuccess = () => {
    toast.success("تصویر متا با موفقیت آپلود شد");
  };

  const handleImageUploadError = () => {
    toast.error("خطا در آپلود تصویر متا");
  };

  const handleFaviconUploadSuccess = () => {
    toast.success("فاوآیکون با موفقیت آپلود شد");
  };

  const handleFaviconUploadError = () => {
    toast.error("خطا در آپلود فاوآیکون");
  };

  return (
    <div className="space-y-8">
      {/* تصویر متا */}
      <div className="rounded-lg border border-border p-6">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-medium">تصویر پیش‌نمایش</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            تصویری که در شبکه‌های اجتماعی و هنگام اشتراک‌گذاری نمایش داده می‌شود
          </p>
        </div>

        {metaImage && (
          <div className="mb-4 flex justify-center">
            <Image
              width={280}
              height={280}
              alt="پیش‌نمایش تصویر متا"
              src={metaImage}
              className="rounded-md border border-border"
            />
          </div>
        )}

        {isPremium ? (
          <MetaImageUploader
            metaImage={image}
            uri={uri}
            onSuccess={handleImageUploadSuccess}
            onError={handleImageUploadError}
          />
        ) : (
          <div className="rounded-lg bg-destructive/10 p-4 text-center">
            <p className="text-destructive">
              برای استفاده از این قابلیت به اشتراک ویژه نیاز دارید
            </p>
            <Button variant="outline" className="mt-3">
              ارتقاء به نسخه ویژه
            </Button>
          </div>
        )}
      </div>

      {/* فاوآیکون */}
      <div className="rounded-lg border border-border p-6">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-medium">فاوآیکون</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            آیکونی که در نوار مرورگر و تب‌های مرورگر نمایش داده می‌شود
          </p>
        </div>

        {metaFavicon && (
          <div className="mb-4 flex justify-center">
            <Image
              width={64}
              height={64}
              alt="پیش‌نمایش فاوآیکون"
              src={metaFavicon}
              className="rounded-md border border-border"
            />
          </div>
        )}

        <FaviconUploader
          favicon={favicon}
          uri={uri}
          onSuccess={handleFaviconUploadSuccess}
          onError={handleFaviconUploadError}
        />
      </div>
    </div>
  );
};

export default MetaImageAndFaviconForm;
