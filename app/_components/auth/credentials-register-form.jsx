/* eslint-disable react/no-unescaped-entities */
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
                          قوانین و مقررات
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
            شرایط استفاده از سرویس لینکا
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6 text-justify">
          {/* Section 1 - General Rules */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۱
              </span>
              قوانین اصلی
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>• هر کاربر مسئول محتوای منتشر شده در پروفایل خود است</p>
              <p>• هر کاربر فقط می‌تواند یک حساب کاربری داشته باشد</p>
            </div>
          </div>

          {/* Section 2 - Prohibited Content */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-red-900 dark:text-red-100">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                ۲
              </span>
              محتوای ممنوعه
            </h3>
            <div className="space-y-2 pr-10 text-sm text-red-800 dark:text-red-200">
              <p>• محتوای مغایر با قوانین جمهوری اسلامی ایران</p>
              <p>• محتوای هرزه‌نگاری، خشونت‌آمیز و توهین‌آمیز</p>
              <p>• تبلیغات مواد مخدر و محتوای کلاهبرداری</p>
            </div>
          </div>

          {/* Section 3 - Consequences */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۳
              </span>
              تخلف و پیامدها
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>• در صورت نقض قوانین، حساب کاربری متخلف مسدود خواهد شد</p>
              <p>• سرویس لینک‌پی مسئولیتی در قبال محتوای کاربران ندارد</p>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
            <p className="dark:text-primary-300 text-center text-sm font-semibold text-primary">
              با کلیک بر روی "موافقم" شما تمامی شرایط فوق را می‌پذیرید.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
