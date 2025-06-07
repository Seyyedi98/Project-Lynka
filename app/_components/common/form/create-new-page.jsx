"use client";

import { checkPageAvailable, newPageCreator } from "@/actions/page/page";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";
import { PageUriSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Lock, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const CreateNewPage = ({ allPages }) => {
  const { isPremium } = useUserSubscription();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const isPremiumPlus = false;

  const canUserCreatePage = () => {
    if (allPages.length < 1) {
      return true;
    }
    if (allPages.length < 3 && isPremium) {
      return true;
    }
    if (allPages.length < 100 && isPremiumPlus) {
      return true;
    }
    return false;
  };

  const form = useForm({
    resolver: zodResolver(PageUriSchema),
    defaultValues: {
      uri: "",
    },
  });

  const { errors } = form.formState;
  const zodError = errors.uri?.message;
  const uriValue = form.watch("uri");

  useEffect(() => {
    const checkUri = async () => {
      if (uriValue.length >= 3) {
        setIsChecking(true);
        setIsAvailable(false);
        setError("");
        setSuccess("");

        try {
          const available = await checkPageAvailable(uriValue);

          if (zodError) {
            setError(zodError);
            setIsAvailable(false);
          } else {
            setIsAvailable(available);

            if (available) {
              setSuccess("این آدرس قابل استفاده است! ✨");
            } else {
              setError("این آدرس قبلا استفاده شده است");
            }
          }
        } catch (err) {
          setError("خطا در بررسی آدرس");
          setIsAvailable(false);
        } finally {
          setIsChecking(false);
        }
      } else {
        setIsAvailable(false);
        setError(uriValue.length > 0 ? "آدرس باید حداقل ۳ کاراکتر باشد" : "");
        setSuccess("");
      }
    };

    const debounceTimer = setTimeout(() => {
      checkUri();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [uriValue, zodError]);

  const onSubmit = (values) => {
    if (!isAvailable) return;

    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const finalCheck = await checkPageAvailable(values.uri);
        if (finalCheck) {
          await newPageCreator(values.uri).then((data) => {
            router.push(`/workspace/${data.uri}`);
          });
        } else {
          setError("این آدرس قبلا استفاده شده است");
          setIsAvailable(false);
        }
      } catch (err) {
        setError("خطا در ایجاد صفحه");
      }
    });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center space-y-6 p-10">
      {canUserCreatePage() ? (
        <>
          <div className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              ایجاد صفحه جدید
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              آدرس اختصاصی خود را برای صفحه جدید انتخاب کنید
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div dir="ltr" className="flex flex-col gap-4">
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center">
                    <span
                      className={cn(
                        "h-2.5 w-2.5 animate-pulse rounded-full",
                        error
                          ? "bg-destructive"
                          : success
                            ? "bg-secondary"
                            : isChecking
                              ? "bg-yellow-500"
                              : "bg-muted-foreground",
                      )}
                    />
                    <span className="ml-2 text-sm font-medium text-muted-foreground">
                      Lynka.ir/
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="uri"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            onKeyDown={(e) => {
                              if (e.key === " ") {
                                e.preventDefault();
                              }
                            }}
                            className="h-12 rounded-xl border-2 bg-card pl-[87px] text-sm font-medium text-foreground transition-all duration-200 focus:border-primary focus:ring-0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div dir="rtl" className="flex h-6 items-center">
                  {isChecking && (
                    <p className="flex items-center text-right text-xs text-yellow-500">
                      <span className="animate-pulse">در حال بررسی...</span>
                    </p>
                  )}
                  {error && !isChecking && (
                    <p className="flex w-full items-center text-right text-xs text-destructive">
                      <span>🚫 {error}</span>
                    </p>
                  )}
                  {success && !isChecking && (
                    <p className="flex w-full items-center text-xs text-secondary">
                      <span>✅ {success}</span>
                    </p>
                  )}
                </div>

                <Button
                  dir="rtl"
                  type="submit"
                  disabled={!isAvailable || isPending || isChecking}
                  className="flex h-12 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-primary to-secondary text-sm font-medium text-primary-foreground shadow-lg transition-all duration-200 hover:from-primary-hover hover:to-secondary hover:shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
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
                      در حال ایجاد...
                    </span>
                  ) : (
                    <>
                      ادامه
                      <ChevronLeft className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="text-center text-xs text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              <span>🔤</span> فقط از حروف انگلیسی، اعداد و خط تیره استفاده کنید
            </p>
            <p className="mt-1 flex items-center justify-center gap-1">
              <span>🔢</span> حداقل ۳ کاراکتر
            </p>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-foreground">
            {isPremium
              ? "به سقف ساخت صفحات در اشتراک ویژه رسیده‌اید"
              : "با توجه به طرح رایگان شما، امکان ساخت بیش از یک صفحه وجود ندارد."}
          </h2>
          <p className="mt-4 text-base leading-6 text-muted-foreground">
            {isPremium
              ? "سطح کاربری ویژه به شما اجازه ساخت حداکثر ۳ صفحه را می‌دهد. برای افزودن صفحه‌ی جدید، باید یکی از صفحات موجود را حذف کنید. در حال بررسی امکان افزودن سطوح کاربری بالاتر هستیم"
              : "برای دسترسی به امکان ساخت صفحات بیشتر، می‌ توانید حساب خود را ارتقا دهید."}
          </p>
          {!isPremium && (
            <Button className="mt-4 bg-gradient-to-r from-primary to-secondary">
              خرید اشتراک ویژه
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateNewPage;
