"use server";

import PurchaseForm from "@/app/_components/common/form/purchase-form";
import { PLANS } from "@/data/prices";
import Link from "next/link";
import { startPurchase } from "@/actions/transactions/startPurchase";

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
        return basePrice * 999999999999;
    }
  };

  const months = parseInt(duration);
  if (isNaN(months)) throw new Error("مدت زمان معتبر نیست");
  if (!prices[plan]) throw new Error("پلن انتخاب شده معتبر نیست");
  return getPremiumPrice(prices[plan].price);
};

// Server action to handle form submission
async function handlePurchase(formData) {
  "use server";

  const email = formData.get("email");
  const mobile = formData.get("mobile");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const plan = formData.get("plan");
  const duration = formData.get("duration");
  const price = formData.get("price");

  // Validate form data
  if (!firstName) {
    return { success: false, error: "نام الزامی است" };
  }

  if (!lastName) {
    return { success: false, error: "نام خانوادگی الزامی است" };
  }

  if (!email && !mobile) {
    return {
      success: false,
      error: "حداقل یکی از فیلدهای ایمیل یا موبایل باید پر شود",
    };
  }

  try {
    // Create transaction in database
    const transactionRes = await startPurchase(
      parseFloat(price),
      plan,
      duration,
      email,
      mobile,
      firstName,
      lastName,
    );

    if (!transactionRes.success) {
      return { success: false, error: "خطا در ایجاد تراکنش" };
    }

    // Create payment with Zibal (server-side)
    // const paymentRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payment`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     amount: price,
    //     transactionId: transactionRes.transaction.id,
    //     callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/purchase/verify`,
    //   }),
    // });

    // if (!paymentRes.ok) {
    //   return { success: false, error: "خطا در اتصال به درگاه پرداخت" };
    // }

    // const { paymentUrl } = await paymentRes.json();

    // For demonstration, we'll return a success message
    // In reality, you would return the payment URL
    return {
      success: true,
      message: "پرداخت با موفقیت آغاز شد",
      // paymentUrl: paymentUrl
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

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

        <PurchaseForm
          plan={plan}
          duration={duration}
          price={price}
          handlePurchase={handlePurchase}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">خطا</h1>
        <p>{error.message}</p>
        <p className="mt-4 text-sm text-gray-500">پلن نامعتبر </p>
      </div>
    );
  }
}
