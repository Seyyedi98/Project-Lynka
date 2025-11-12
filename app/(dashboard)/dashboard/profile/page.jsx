"use client";

import { settings } from "@/actions/user/settings";
import { FormError } from "@/app/_components/common/message/form-error";
import { FormSuccess } from "@/app/_components/common/message/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SettingsSchema } from "@/schemas";
import {
  fade,
  fadeSlideLeft,
  fadeSlideUp,
  formItemAnimation,
  staggeredFade,
} from "@/utils/animation/animation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const user = useCurrentUser();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values) => {
    startTransition(() => {
      setError("");
      setSuccess("");
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("مشکلی پیش آمده است!"));
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      {/* هدر */}
      <div className="mb-8 sm:mx-4 sm:mr-20 xl:pr-6">
        <motion.h1
          initial={fadeSlideUp.initial}
          animate={fadeSlideUp.animate}
          className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          تنظیمات پروفایل
        </motion.h1>
        <motion.p
          initial={fadeSlideUp.initial}
          animate={fadeSlideUp.animate}
          transition={{ delay: 0.1 }}
          className="mt-4 text-gray-600 dark:text-white/80"
        >
          تنظیمات حساب کاربری خود را مدیریت کنید
        </motion.p>
      </div>

      {/* کارت تنظیمات */}
      <motion.div
        initial={fadeSlideUp.initial}
        animate={fadeSlideUp.animate}
        transition={{ delay: 0.2 }}
        className="sm:mx-4 sm:mr-20 xl:pr-6"
      >
        <Card className="border-0 bg-background/80 backdrop-blur-sm dark:border-white/20 dark:bg-white/10">
          <CardHeader className="w-full">
            <motion.p
              {...fade}
              className="text-center text-2xl font-semibold text-gray-900 dark:text-white"
            >
              ⚙️ تنظیمات
            </motion.p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <motion.div {...formItemAnimation}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-white">نام</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="نام"
                              disabled={isPending}
                              className="bg-background/50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {user?.isOAuth === false && (
                    <>
                      <motion.div
                        {...formItemAnimation}
                        transition={{ delay: 0.05 }}
                      >
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-white">
                                ایمیل
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="ایمیل"
                                  disabled={true}
                                  className="bg-background/50 text-muted-foreground dark:border-white/20 dark:bg-white/10 dark:text-white/60 dark:placeholder:text-white/40"
                                />
                              </FormControl>
                              <FormDescription className="text-xs dark:text-white/60">
                                امکان تغییر ایمیل وجود ندارد
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      {/* بخش متمایز پسوورد */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1,
                          type: "spring",
                          stiffness: 300,
                        }}
                        className="rounded-lg border border-primary/20 bg-primary/5 p-4 dark:border-amber-400/20 dark:bg-amber-400/10"
                      >
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-white">
                                  رمز عبور فعلی
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder="••••••"
                                    disabled={isPending}
                                    className="bg-background/50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-white">
                                  رمز عبور جدید
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder="••••••"
                                    disabled={isPending}
                                    className="bg-background/50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40"
                                  />
                                </FormControl>
                                <FormDescription className="text-xs dark:text-white/60">
                                  رمز عبور باید حداقل ۶ کاراکتر داشته باشد
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        {...formItemAnimation}
                        transition={{ delay: 0.2 }}
                      >
                        <FormField
                          control={form.control}
                          name="isTwoFactorEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm dark:border-white/20 dark:bg-white/10">
                              <div className="space-y-0.5">
                                <FormLabel className="dark:text-white">
                                  احراز هویت دو مرحله‌ای
                                </FormLabel>
                                <FormDescription className="dark:text-white/60">
                                  برای حساب کاربری خود احراز هویت دو مرحله‌ای را
                                  فعال کنید
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  disabled={isPending}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </>
                  )}
                </div>

                <motion.div {...staggeredFade}>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                </motion.div>

                <motion.div
                  {...fadeSlideLeft}
                  transition={{ delay: 0.35 }}
                  className="flex justify-end"
                >
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:bg-gray-400 sm:w-auto"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        در حال ذخیره...
                      </span>
                    ) : (
                      "ذخیره تغییرات"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
