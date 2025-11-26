"use client";

import { UpdatePageMetaDescription } from "@/actions/page/page";
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
import { MdDangerous } from "react-icons/md";

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

const MetaDescriptionForm = ({ uri, description, image }) => {
  const [isPendingDesc, startDescTransition] = useTransition();
  const { isPremium } = useUserSubscription();

  const descForm = useForm({
    defaultValues: {
      metaDescription: description || "",
    },
  });

  // Parse image URL
  const metaImage = image ? getImageAddress(JSON.parse(image).key) : "";

  // Watch form values
  const currentDescription = useWatch({
    control: descForm.control,
    name: "metaDescription",
  });

  // Check if values match defaults
  const isDescriptionChanged = currentDescription !== (description || "");

  const applyDescChanges = async (values) => {
    if (!isPremium) {
      toast.error("برای این ویژگی به اشتراک ویژه نیاز دارید");
      return;
    }

    try {
      await startDescTransition(async () => {
        const result = await UpdatePageMetaDescription(uri, values);
        if (result?.success) {
          toast.success("توضیحات متا با موفقیت به‌روزرسانی شد");
        } else {
          toast.error("خطا در به‌روزرسانی توضیحات");
        }
      });
    } catch (error) {
      toast.error("خطای سیستمی در به‌روزرسانی توضیحات");
    }
  };

  const handleImageUploadSuccess = () => {
    toast.success("تصویر متا با موفقیت آپلود شد");
  };

  const handleImageUploadError = () => {
    toast.error("خطا در آپلود تصویر متا");
  };

  return (
    <div className="space-y-8">
      {/* توضیحات متا */}
      <div className="rounded-lg border border-border p-6">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-medium">توضیحات متا</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              این توضیحات هنگام اشتراک‌ گذاری صفحه در شبکه های اجتماعی نمایش
              داده خواهد شد
            </p>

            <div className="space-y-3">
              {/* Box 1 */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-300 bg-slate-50 p-4 shadow-sm">
                <p className="text-sm leading-6 text-slate-900">
                  برای نمایش لینک در شبکه‌های اجتماعی، حتماً یک تصویر جذاب نیز
                  اضافه کنید. در غیر اینصورت لینک به درستی کار نخواهد کرد
                </p>
              </div>

              {/* Box 2 */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-300 bg-slate-50 p-4 shadow-sm">
                <p className="text-sm leading-6 text-slate-900">
                  اگر لینک در تلگرام به‌درستی نمایش داده نشد، آدرس لینک‌های خود
                  را به این بات ارسال کنید:
                  <br />
                  <a
                    href="https://t.me/webpagebot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 underline transition hover:text-blue-900"
                    style={{
                      direction: "ltr",
                      display: "inline-block",
                      marginTop: "4px",
                    }}
                  >
                    @webpagebot
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {isPremium ? (
          <Form {...descForm}>
            <form
              onSubmit={descForm.handleSubmit(applyDescChanges)}
              className="space-y-4"
            >
              <FormField
                control={descForm.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات صفحه</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="توضیحات صفحه خود را وارد کنید"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPendingDesc || !isDescriptionChanged}
                className="w-full"
              >
                {isPendingDesc ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "ذخیره توضیحات"
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="rounded-lg bg-destructive/10 p-4 text-center">
            <p className="text-destructive">
              برای استفاده از این قابلیت به اشتراک ویژه نیاز دارید
            </p>
            <Button
              onClick={() => redirect("/dashboard/pricing")}
              variant="outline"
              className="mt-3"
            >
              ارتقاء به نسخه ویژه
            </Button>
          </div>
        )}
      </div>

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
    </div>
  );
};

export default MetaDescriptionForm;
