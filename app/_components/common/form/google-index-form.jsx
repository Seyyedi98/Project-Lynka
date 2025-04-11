"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { submitToGoogleIndexing } from "@/actions/googleIndex";
import { generateSitemap } from "@/actions/generateSitemap";
import toast from "react-hot-toast";

const GoogleIndexForm = ({ uri }) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    try {
      startTransition(async () => {
        // Submit to Google Indexing
        const googleResult = await submitToGoogleIndexing(
          `https://lynkaink.ir/pages/${uri}`,
        );

        if (googleResult?.success) {
          toast.success("درخواست ایندکس به گوگل ارسال شد");
        } else {
          toast.error("خطا در ارسال به گوگل");
        }

        // Generate sitemap
        const sitemapResult = await generateSitemap();
        if (sitemapResult?.success) {
          toast.success("نقشه سایت با موفقیت به‌روزرسانی شد");
        } else {
          toast.error("خطا در به‌روزرسانی نقشه سایت");
        }
      });
    } catch (error) {
      toast.error("خطای سیستمی در ارسال درخواست");
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-xl font-medium">بهینه‌سازی برای موتورهای جستجو</h1>
        <p className="text-sm text-muted-foreground">
          ارسال صفحه به گوگل و به‌روزرسانی نقشه سایت
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full max-w-xs"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              در حال ارسال...
            </>
          ) : (
            "ارسال به گوگل و به‌روزرسانی نقشه سایت"
          )}
        </Button>
      </div>

      <div className="mt-6 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
        <p className="text-center">
          این عمل ممکن است چند دقیقه طول بکشد. لطفاً صبر کنید.
        </p>
      </div>
    </div>
  );
};

export default GoogleIndexForm;
