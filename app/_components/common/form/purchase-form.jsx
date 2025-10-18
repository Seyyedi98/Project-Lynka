"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PurchaseForm({
  plan,
  duration,
  price,
  handlePurchase,
}) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (formData) => {
    const newErrors = {};
    const mobile = formData.get("mobile");

    if (!mobile) {
      newErrors.mobile = "شماره موبایل الزامی است";
    } else if (!/^09\d{9}$/.test(mobile)) {
      newErrors.mobile = "شماره موبایل معتبر نیست";
    }

    if (!formData.get("firstName")) {
      newErrors.firstName = "نام الزامی است";
    }

    if (!formData.get("lastName")) {
      newErrors.lastName = "نام خانوادگی الزامی است";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.target);

    // Add plan, duration, and price to form data
    formData.append("plan", plan);
    formData.append("duration", duration);
    formData.append("price", price.toString());

    // Validate form
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Call server action
      const result = await handlePurchase(formData);

      if (result.success) {
        // Redirect to payment gateway
        window.location.href = result.paymentUrl;
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
    <div className="mb-8 space-y-6">
      {/* خلاصه سفارش */}
      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          خلاصه سفارش
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between border-b border-slate-100 py-2">
            <span className="text-slate-600">پلن:</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-slate-800">
              {plan === "silver" ? "ویژه" : plan}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 py-2">
            <span className="text-slate-600">مدت زمان:</span>
            <span className="font-medium text-slate-800">{duration} ماه</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3">
            <span className="font-semibold text-slate-800">مبلغ کل:</span>
            <span className="text-lg font-bold text-blue-600">
              {price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>
      </div>

      {/* فرم اطلاعات شخصی */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-slate-800">مشخصات</h2>

          {errors.submit && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-slate-700"
              >
                نام
              </Label>
              <Input
                id="firstName"
                name="firstName"
                required
                className={`border-slate-300 transition-colors focus:border-blue-500 focus:ring-blue-500 ${
                  errors.firstName ? "border-red-500 bg-red-50" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-slate-700"
              >
                نام خانوادگی
              </Label>
              <Input
                id="lastName"
                name="lastName"
                required
                className={`border-slate-300 transition-colors focus:border-blue-500 focus:ring-blue-500 ${
                  errors.lastName ? "border-red-500 bg-red-50" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label
              htmlFor="mobile"
              className="text-sm font-medium text-slate-700"
            >
              شماره موبایل
            </Label>
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              dir="ltr"
              required
              className={`border-slate-300 text-left transition-colors focus:border-blue-500 focus:ring-blue-500 ${
                errors.mobile ? "border-red-500 bg-red-50" : ""
              }`}
            />
            {errors.mobile && (
              <p className="text-sm text-red-500">{errors.mobile}</p>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              ایمیل (اختیاری)
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="border-slate-300 transition-colors focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 hover:shadow"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>در حال پردازش...</span>
            </div>
          ) : (
            "پرداخت و ادامه"
          )}
        </Button>
      </form>
    </div>
  );
}
