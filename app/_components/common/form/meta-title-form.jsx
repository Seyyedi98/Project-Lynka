"use client";

import {
  UpdatePageMetaTitle,
  UpdatePageMetaDescription,
} from "@/actions/page/page";
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
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

const MetaSettingsForm = ({ uri, title, description }) => {
  const [isPendingTitle, startTitleTransition] = useTransition();
  const [isPendingDesc, startDescTransition] = useTransition();
  const { isPremium } = useUserSubscription();

  const titleForm = useForm({
    defaultValues: {
      title: title || "",
    },
  });

  const descForm = useForm({
    defaultValues: {
      metaDescription: description || "",
    },
  });

  // Watch form values
  const currentTitle = useWatch({
    control: titleForm.control,
    name: "title",
  });

  const currentDescription = useWatch({
    control: descForm.control,
    name: "metaDescription",
  });

  // Check if values match defaults
  const isTitleChanged = currentTitle !== (title || "");
  const isDescriptionChanged = currentDescription !== (description || "");

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

      {/* توضیحات متا */}
      <div className="rounded-lg border border-border p-6">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-medium">توضیحات متا</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            توضیحاتی که در نتایج جستجو و هنگام اشتراک‌گذاری صفحه نمایش داده
            می‌شود
          </p>
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
            <Button variant="outline" className="mt-3">
              ارتقاء به نسخه ویژه
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetaSettingsForm;
