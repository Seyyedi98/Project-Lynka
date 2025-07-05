"use client";

import { startPurchase } from "@/actions/transactions/startPurchase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PurchaseForm({ plan, duration, price }) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Create transaction in database
      const transactionRes = await startPurchase(
        price,
        plan,
        duration,
        email,
        mobile,
      );

      if (!transactionRes.ok) throw new Error("خطا در ایجاد تراکنش");

      const transaction = await transactionRes.json();

      // Now create payment with Zibal
      const paymentRes = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({
          amount: price,
          transactionId: transaction.id,
          callbackUrl: `${window.location.origin}/purchase/verify`, // verification endpoint
        }),
      });

      if (!paymentRes.ok) throw new Error("خطا در اتصال به درگاه پرداخت");

      const { paymentUrl } = await paymentRes.json();
      window.location.href = paymentUrl; // Redirect to Zibal payment page
    } catch (error) {
      setErrors({ submit: error.message });
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
