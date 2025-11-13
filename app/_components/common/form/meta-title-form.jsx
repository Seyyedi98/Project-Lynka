"use client";

import { UpdatePageMetaTitle } from "@/actions/page/page";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import getImageAddress from "@/utils/get-image-address";
import dynamic from "next/dynamic";

const FaviconUploader = dynamic(() => import("../input/favicon-uploader"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-32 rounded-md" />,
});

const BrowserDescriptionForm = ({ uri, title, favicon }) => {
  const [isPendingTitle, startTitleTransition] = useTransition();
  const { isPremium } = useUserSubscription();

  const titleForm = useForm({
    defaultValues: {
      title: title || "",
    },
  });

  // Parse favicon URL
  const metaFavicon = favicon ? getImageAddress(JSON.parse(favicon).key) : "";

  // Watch form values
  const currentTitle = useWatch({
    control: titleForm.control,
    name: "title",
  });

  // Check if values match defaults
  const isTitleChanged = currentTitle !== (title || "");

  const applyTitleChanges = async (values) => {
    try {
      await startTitleTransition(async () => {
        const result = await UpdatePageMetaTitle(uri, values);
        if (result?.success) {
          toast.success("عنوان صفحه با موفقیت به‌روزرسانی شد");
        } else {
          toast.error("خطا در به‌روزرسانی عنوان");
        }
      });
    } catch (error) {
      toast.error("خطای سیستمی در به‌روزرسانی عنوان");
    }
  };

  const handleFaviconUploadSuccess = () => {
    toast.success("فاوآیکون با موفقیت آپلود شد");
  };

  const handleFaviconUploadError = () => {
    toast.error("خطا در آپلود فاوآیکون");
  };

  return (
    <div className="space-y-8">
      {/* عنوان متا */}
      <div className="rounded-lg border border-border p-6">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-medium">عنوان مرورگر</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            عنوانی که در نوار مرورگر نمایش داده می‌شود را تنظیم کنید
          </p>
        </div>

        <Form {...titleForm}>
          <form
            onSubmit={titleForm.handleSubmit(applyTitleChanges)}
            className="space-y-4"
          >
            <FormField
              control={titleForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان صفحه</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="عنوان صفحه خود را وارد کنید"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPendingTitle || !isTitleChanged}
              className="w-full"
            >
              {isPendingTitle ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "ذخیره عنوان"
              )}
            </Button>
          </form>
        </Form>
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

export default BrowserDescriptionForm;
