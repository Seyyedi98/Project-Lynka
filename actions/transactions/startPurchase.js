"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";

export async function startPurchase(
  price,
  subscriptionPlan,
  duration,
  email,
  mobile,
) {
  try {
    // Validate price
    if (!price || isNaN(price) || price <= 0) {
      return { error: "Invalid price amount" };
    }

    const user = await currentUser();
    if (!user || !user.id) {
      return { error: "Authorization failed" };
    }

    // Create transaction with pending status
    const transaction = await prisma.transactions.create({
      data: {
        userId: user.id,
        amount: price,
        type: "subscription",
        status: "pending",
        requestDate: new Date(),
        subscriptionPlan: subscriptionPlan,
        duration: duration,
        ...(email ? { email } : {}),
        ...(mobile ? { phoneNumber: mobile } : {}),
      },
    });

    return { success: true, transaction };
  } catch (error) {
    console.error("Purchase error:", error);
    return { error: "Transaction creation failed" };
  }
}
//  updateSubscriptionData({ subscriptionPlan, duration });
//       revalidatePath("/dashboard");

export async function purchaseSucceed() {}
