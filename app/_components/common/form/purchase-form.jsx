"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PurchaseForm({
  plan,
  duration,
  price,
  handlePurchase,
}) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.target);

    // Add plan, duration, and price to form data
    formData.append("plan", plan);
    formData.append("duration", duration);
    formData.append("price", price.toString());

    try {
      // Call server action
      const result = await handlePurchase(formData);

      if (result.success) {
        // Redirect to payment page or show success
        // if (result.paymentUrl) {
        //   window.location.href = result.paymentUrl;
        // }
        alert(result.message);
        router.push("/dashboard");
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
  );
}
