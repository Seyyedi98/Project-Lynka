"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";
import { updateSubscriptionData } from "../auth/subscription";
import { revalidatePath } from "next/cache";

export async function purchase(price, subscriptionPlan, days) {
  try {
    // Validate price
    if (!price || isNaN(price) || price <= 0) {
      return { error: "Invalid price amount" };
    }

    const user = await currentUser();
    if (!user || !user.id) {
      return { error: "Authorization failed" };
    }

    const transaction = await prisma.transactions.create({
      data: {
        userId: user.id,
        amount: price,
        type: "subscription",
        status: "pending",
        requestDate: new Date(),
      },
    });

    const isSucceed = true;

    if (!isSucceed) {
      const updatedTransaction = await prisma.transactions.update({
        where: { id: transaction.id },
        data: {
          status: "failed",
          processedAt: new Date(),
          failureDate: new Date(),
        },
      });
    } else {
      const updatedTransaction = await prisma.transactions.update({
        where: { id: transaction.id },
        data: {
          status: "completed",
          processedAt: new Date(),
          successDate: new Date(),
        },
      });

      updateSubscriptionData({ subscriptionPlan, days });
      revalidatePath("/dashboard");
      return { success: true, transaction };
    }
  } catch (error) {
    console.error("Purchase error:", error);
    return { error: "Transaction failed" };
  }
}
