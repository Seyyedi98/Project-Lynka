"use server";

import PurchaseForm from "@/app/_components/common/form/purchase-form";
import { PLANS } from "@/data/prices";
import Link from "next/link";

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

export default async function Purchase({ searchParams }) {
  const { plan, duration } = await searchParams;

  if (!plan || !duration) {
    return (
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">خطا</h1>
        <p>پلن انتخاب شده معتبر نمی باشد</p>
      </div>
    );
  }

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

        <PurchaseForm plan={plan} duration={duration} price={price} />

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
