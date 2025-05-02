"use client";

import { generateSitemap } from "@/actions/generateSitemap";
import { isPageIndexed } from "@/actions/googleIndex";
import { setIsPageIndexed } from "@/actions/page/page";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

const GoogleIndexForm = ({ uri }) => {
  const [isPending, startTransition] = useTransition();
  const [isPageSubmitted, setIsPageSubmitted] = useState();
  const [loadingPageData, setLoadingPageData] = useState(true);

  useEffect(() => {
    async function checkIfPageIndexed() {
      try {
        setLoadingPageData(true);
        const data = await isPageIndexed(uri);
        if (data) setIsPageSubmitted(data.googleIndexed);
        setLoadingPageData(false);
      } catch (error) {
        console.error(error);
        setLoadingPageData(false);
      } finally {
        setLoadingPageData(false);
      }
    }

    checkIfPageIndexed();
  }, [uri]);

  const handleSubmit = async () => {
    if (isPageSubmitted) return;
    try {
      startTransition(async () => {
        // Submit to Google Indexing
        // const googleResult = await submitToGoogleIndexing(
        //   `https://lynka.ir/pages/${uri}`,
        // );

        // if (googleResult?.success) {
        //   toast.success("درخواست ایندکس به گوگل ارسال شد");
        // } else {
        //   console.log(googleResult);
        //   toast.error("خطا در ارسال به گوگل");
        // }

        // Generate sitemap
        const sitemapResult = await generateSitemap();
        if (sitemapResult?.success) {
          toast.success("نقشه سایت با موفقیت به‌روزرسانی شد");
          await setIsPageIndexed(uri);
          setIsPageSubmitted(true);
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

      <div className="grid h-full w-full place-content-center">
        {loadingPageData ? (
          <Loader2 className="mt-12 animate-spin" />
        ) : isPageSubmitted ? (
          <p className="mt-4">شما قبلا صفحه خود را ثبت کرده اید</p>
        ) : (
          <>
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full max-w-xs"
              >
                {isPending ? (
                  <>
                    در حال ارسال...
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "ارسال به گوگل و به‌روزرسانی نقشه سایت"
                )}
              </Button>
            </div>
            <div className="mt-6 rounded-lg bg-secondary p-4 text-sm text-white">
              <p className="text-center">
                این عمل ممکن است چند دقیقه طول بکشد. لطفاً صبر کنید.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleIndexForm;
