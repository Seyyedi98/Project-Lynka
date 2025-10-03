"use client";

import { register } from "@/actions/auth/register";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Checkbox, Input } from "rsuite";
import { FormError } from "../common/message/form-error";
import { FormSuccess } from "../common/message/form-success";

import {
  DialogContent,
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CredentialsRegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = (values) => {
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-10 space-y-6">
        <div className="space-y-4">
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="نام خود را اینجا بنویسید"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="email@mail.com"
                    type="email"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="********"
                    type="password"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(value, checked) => {
                      field.onChange(checked);
                    }}
                    disabled={isPending}
                    className="text-base font-thin"
                  >
                    با{" "}
                    <TermsModal
                      trigger={
                        <span className="cursor-pointer text-primary hover:text-secondary">
                          شرایط
                        </span>
                      }
                    />{" "}
                    موافقم
                  </Checkbox>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="h-12 w-full">
          {isPending ? <Loader className="animate-spin" /> : "عضویت"}
        </Button>
      </form>
    </Form>
  );
};

export function TermsModal({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            شرایط استفاده از سرویس لینک‌پی
          </DialogTitle>
          <DialogDescription className="mt-2 text-center text-gray-600 dark:text-gray-400">
            آخرین به‌روزرسانی: ۱۴۰۳/۰۷/۰۷
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6 text-justify">
          {/* Section 1 */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۱
              </span>
              تعاریف
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>سرویس لینک‌پی:</strong> پلتفرمی آنلاین که به کاربران
                امکان ایجاد صفحه‌ای شخصی حاوی مجموعه‌ای از لینک‌های مهم را
                می‌دهد.
              </p>
              <p>
                <strong>کاربر:</strong> هر شخص حقیقی یا حقوقی که از سرویس
                لینک‌پی استفاده می‌کند.
              </p>
              <p>
                <strong>محتوا:</strong> هرگونه متن، تصویر، لینک، ویدئو یا سایر
                اطلاعاتی که کاربر در پروفایل خود قرار می‌دهد.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۲
              </span>
              پذیرش شرایط
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>
                با استفاده از این سرویس، شما تأیید می‌کنید که این شرایط را
                خوانده و می‌پذیرید.
              </p>
              <p>
                این شرایط ممکن است periodically به روز شود و ادامه استفاده از
                سرویس به معنای پذیرش شرایط جدید است.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۳
              </span>
              شرایط استفاده
            </h3>
            <div className="space-y-3 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-start">
                <span className="ml-2 text-blue-500">•</span>
                <span>
                  <strong>سن کاربران:</strong> کاربران باید حداقل ۱۳ سال داشته
                  باشند.
                </span>
              </div>
              <div className="flex items-start">
                <span className="ml-2 text-blue-500">•</span>
                <span>
                  <strong>حساب کاربری:</strong> هر کاربر فقط می‌تواند یک حساب
                  کاربری داشته باشد
                </span>
              </div>
              <div className="flex items-start">
                <span className="ml-2 text-blue-500">•</span>
                <span>
                  <strong>مسئولیت امنیت:</strong> حفظ امنیت حساب کاربری بر عهده
                  کاربر است
                </span>
              </div>
            </div>
          </div>

          {/* Section 4 - Prohibited Content */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-red-900 dark:text-red-100">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                ۴
              </span>
              محتوای ممنوعه
            </h3>
            <div className="space-y-3 pr-10 text-sm text-red-800 dark:text-red-200">
              <div className="flex items-start">
                <span className="ml-2 text-red-500">•</span>
                <span>محتوای مغایر با قوانین جمهوری اسلامی ایران</span>
              </div>
              <div className="flex items-start">
                <span className="ml-2 text-red-500">•</span>
                <span>محتوای هرزه‌نگاری و خشونت‌آمیز</span>
              </div>
              <div className="flex items-start">
                <span className="ml-2 text-red-500">•</span>
                <span>تبلیغات مواد مخدر و محتوای کلاهبرداری</span>
              </div>
              <div className="flex items-start">
                <span className="ml-2 text-red-500">•</span>
                <span>توهین به ادیان و مقدسات</span>
              </div>
              <div className="flex items-start">
                <span className="ml-2 text-red-500">•</span>
                <span>نقض حقوق مالکیت فکری</span>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۵
              </span>
              محدودیت‌های فنی
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>
                کاربران نباید از ربات‌ها یا اسکریپت‌ها برای دسترسی به سرویس
                استفاده کنند یا اقدام به حملات DDoS کنند.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۶
              </span>
              مالکیت معنوی
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>
                کاربر مالک محتوای خود بوده اما به لینک‌پی اجازه نمایش آن را
                می‌دهد.
              </p>
              <p>
                نام و لوگوی لینک‌پی متعلق به این سرویس بوده و کاربران مجاز به
                استفاده بدون مجوز نیستند.
              </p>
            </div>
          </div>

          {/* Section 7 - Limitations */}
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-yellow-900 dark:text-yellow-100">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-sm text-white">
                ۷
              </span>
              محدودیت مسئولیت
            </h3>
            <div className="space-y-2 pr-10 text-sm text-yellow-800 dark:text-yellow-200">
              <p>
                سرویس لینک‌پی مسئولیتی در قبال محتوای صفحات کاربران یا از دست
                رفتن اطلاعات ندارد.
              </p>
              <p>کاربر مسئول تمام محتوای منتشر شده در پروفایل خود است.</p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۸
              </span>
              تعلیق حساب
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>
                سرویس لینک‌پی حق تعلیق یا حذف حساب کاربرانی که قوانین را نقض
                کنند، محفوظ می‌دارد.
              </p>
            </div>
          </div>

          {/* Section 9 - Privacy */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-blue-900 dark:text-blue-100">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۹
              </span>
              حریم خصوصی
            </h3>
            <div className="space-y-2 pr-10 text-sm text-blue-800 dark:text-blue-200">
              <p>
                اطلاعات کاربران مطابق با قانون حمایت از داده‌های شخصی محافظت
                می‌شود.
              </p>
              <p>
                سرویس لینک‌پی ممکن است از کوکی‌ها برای بهبود تجربه کاربری
                استفاده کند.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۱۰
              </span>
              قانون حاکم
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>این شرایط تابع قوانین جمهوری اسلامی ایران است.</p>
              <p>هرگونه اختلاف از طریق مراجع قضایی تهران حل و فصل خواهد شد.</p>
            </div>
          </div>

          {/* Section 11 - Contact */}
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-green-900 dark:text-green-100">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm text-white">
                ۱۱
              </span>
              تماس با ما
            </h3>
            <div className="space-y-2 pr-10 text-sm text-green-800 dark:text-green-200">
              <p>برای گزارش تخلف یا سوالات می‌توانید با ما در ارتباط باشید:</p>
              <p className="font-mono text-base">support@linkpee.ir</p>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
            <p className="dark:text-primary-300 text-center text-sm font-semibold text-primary">
              لطفاً قبل از پذیرش شرایط، آن را به دقت مطالعه کنید. با کلیک بر روی
              "موافقم" شما تمامی شرایط فوق را می‌پذیرید.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
