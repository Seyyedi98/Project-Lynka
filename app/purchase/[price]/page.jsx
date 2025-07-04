"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PLANS } from "@/data/prices";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const getPrice = (plan, duration) => {
  const prices = {
    silver: PLANS.find((p) => p.id === "silver"),
  };

  const getPremiumPrice = (basePrice) => {
    switch (duration) {
      case "1":
        return basePrice;
      case "3":
        return basePrice * 3 * 0.9;
      case "6":
        return basePrice * 6 * 0.85;
      default:
        return basePrice * 3;
    }
  };

  const months = parseInt(duration);
  if (isNaN(months)) throw new Error("مدت زمان باید عدد باشد");
  if (!prices[plan]) throw new Error("پلن انتخاب شده معتبر نیست");
  return getPremiumPrice(prices[plan].price);
};

export default function Purchase() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan");
  const duration = searchParams.get("duration");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!plan || !duration) {
    return (
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">خطا</h1>
        <p>پلن انتخاب شده معتبر نمی باشد</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const mobile = formData.get("mobile");

    // Validate form
    const newErrors = {};
    if (!email && !mobile) {
      newErrors.contact = "حداقل یکی از فیلدهای ایمیل یا موبایل باید پر شود";
    }
    if (!formData.get("firstName")) {
      newErrors.firstName = "نام الزامی است";
    }
    if (!formData.get("lastName")) {
      newErrors.lastName = "نام خانوادگی الزامی است";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to server

      // Create payment in db
      const res = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({
          plan,
          duration,
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email,
          mobile,
        }),
      });

      if (!res.ok) throw new Error("خطا در پرداخت");

      const { paymentUrl } = await res.json();
      router.push(paymentUrl);
    } catch (error) {
      setErrors({ submit: error.message });
      setIsSubmitting(false);
    }
  };

  try {
    const price = getPrice(plan, duration);

    return (
      <div className="mx-auto max-w-md rounded-xl bg-secondaryBg p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="mb-6 text-2xl font-bold">اطلاعات پرداخت</h1>

          <Link href="/dashboard/pricing">
            <p className="-translate-y-3 text-xs text-slate-500 transition-colors hover:text-primary">
              بازگشت
            </p>
          </Link>
        </div>

        <div className="mb-8 space-y-4">
          {/* خلاصه سفارش */}
          <div className="rounded-lg bg-secondaryBg p-4">
            <h2 className="mb-3 font-semibold">خلاصه سفارش</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>پلن:</span>
                <span className="font-medium">
                  {plan === "silver" ? "ویژه" : plan}
                </span>
              </div>
              <div className="flex justify-between">
                <span>مدت زمان:</span>
                <span className="font-medium">{duration} ماه</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>مبلغ کل:</span>
                <span className="text-blue-600">
                  {price.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>
          </div>

          {/* فرم اطلاعات شخصی */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold">اطلاعات شخصی</h2>

            {errors.submit && (
              <p className="text-sm text-red-500">{errors.submit}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">نام</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">نام خانوادگی</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ایمیل (اختیاری)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                className={errors.contact ? "border-red-500" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">شماره موبایل (اختیاری)</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                dir="ltr"
                className={errors.contact ? "border-red-500" : ""}
              />
              {errors.contact && (
                <p className="text-sm text-red-500">{errors.contact}</p>
              )}
            </div>

            <p className="text-sm text-gray-500">
              لطفا حداقل یکی از فیلدهای ایمیل یا موبایل را پر کنید
            </p>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال پردازش..." : "پرداخت و ادامه"}
            </Button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          اطلاعات شما به صورت امن ذخیره می‌شود
        </p>
      </div>
    );
  } catch (error) {
    return (
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">خطا</h1>
        <p>{error.message}</p>
        <p className="mt-4 text-sm text-gray-500">
          پلن‌های معتبر: نقره‌ای، طلایی، پلاتینیوم
        </p>
      </div>
    );
  }
}
