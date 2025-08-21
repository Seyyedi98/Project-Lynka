"use server";

import prisma from "@/lib/client";
import { revalidatePath } from "next/cache";
import { updateSubscriptionData } from "../subscription";

export async function verifyPayment(
  trackId,
  amount,
  status,
  refNumber,
  cardNumber,
) {
  try {
    // Find the transaction by trackId (stored as gatewayReference in our DB)
    const transaction = await prisma.transaction.findFirst({
      where: {
        gatewayReference: trackId.toString(),
      },
    });

    if (!transaction) {
      console.error("Transaction not found for trackId:", trackId);
      return { success: false, error: "Transaction not found" };
    }

    // Update transaction status based on Zibal response
    let transactionStatus = "failed";
    let transactionUpdateData = {
      gatewayReference: trackId.toString(),
      verifyDate: new Date(),
    };

    // Add reference number and card number if payment was successful
    if (status === 1 || status === 2) {
      // 1: paid, 2: already paid (in Zibal)
      transactionStatus = "completed";
      transactionUpdateData = {
        ...transactionUpdateData,
        refNumber: refNumber,
        cardNumber: cardNumber,
        status: transactionStatus,
      };

      // Update user subscription
      await updateSubscriptionData({
        subscriptionPlan: transaction.subscriptionPlan,
        duration: transaction.duration,
        userId: transaction.userId,
      });
    } else {
      transactionUpdateData.status = transactionStatus;
    }

    // Update the transaction
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: transactionUpdateData,
    });

    // Revalidate dashboard to show updated subscription status
    revalidatePath("/dashboard");

    return {
      success: true,
      transaction: updatedTransaction,
      status: transactionStatus,
    };
  } catch (error) {
    console.error("Verify payment error:", error);
    return { success: false, error: "Payment verification failed" };
  }
}
