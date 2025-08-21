"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";
import { redirect } from "next/navigation";

// Initialize Zibal payment
async function initZibalPayment(
  amount,
  orderId,
  callbackUrl,
  mobile,
  description,
) {
  try {
    const response = await fetch("https://gateway.zibal.ir/v1/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant: process.env.ZIBAL_MERCHANT_ID,
        amount: amount * 10, // Convert toman to rials
        callbackUrl: callbackUrl,
        orderId: orderId,
        mobile: mobile,
        description: description,
      }),
    });

    console.log(response);

    const data = await response.json();

    if (data.result === 100) {
      return {
        success: true,
        paymentUrl: `https://gateway.zibal.ir/start/${data.trackId}`,
        trackId: data.trackId,
      };
    } else {
      return {
        success: false,
        message: `خطا در ارتباط با درگاه پرداخت (کد: ${data.result})`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "خطا در ارتباط با درگاه پرداخت",
    };
  }
}

export async function startPurchase(formData) {
  try {
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

    // Validate price
    if (!price || isNaN(price) || price <= 0) {
      return { success: false, error: "Invalid price amount" };
    }

    const user = await currentUser();
    if (!user || !user.id) {
      return { success: false, error: "Authorization failed" };
    }

    // Create transaction with pending status

    const transaction = await prisma.transactions.create({
      data: {
        userId: user.id,
        amount: parseFloat(price),
        type: "subscription",
        status: "pending",
        requestDate: new Date(),
        subscriptionPlan: plan,
        duration: duration,
        ...(email ? { email } : {}),
        ...(mobile ? { phoneNumber: mobile } : {}),
      },
    });

    // Initialize Zibal payment
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/purchase/verify`;
    const description = `خرید پلن ${plan} برای ${duration} ماه`;

    const paymentInit = await initZibalPayment(
      parseFloat(price),
      transaction.id,
      callbackUrl,
      mobile,
      description,
    );

    console.log(paymentInit);

    if (!paymentInit.success) {
      return { success: false, error: paymentInit.message };
    }

    // Redirect to payment page
    redirect(paymentInit.paymentUrl);
  } catch (error) {
    console.error("Purchase error:", error);
    return { success: false, error: "خطا در ایجاد تراکنش" };
  }
}
