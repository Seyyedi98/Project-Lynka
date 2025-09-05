"use server";

import prisma from "@/lib/client";
import { revalidatePath } from "next/cache";
import { updateSubscriptionData } from "../subscription";

export async function verifyPayment(orderId, trackId, refNumber, cardNumber) {
  try {
    const transaction = await prisma.transactions.findFirst({
      where: {
        orderId,
      },
    });

    if (!transaction) {
      console.error("خطا در دریافت تراکنش", trackId);
      return { success: false, error: "Transaction not found" };
    }

    if (transaction.status === "completed") {
      return {
        success: true,
        transaction,
        status: "completed",
      };
    }

    // Verify payment with Zibal API
    const verifyResponse = await verifyWithZibal(trackId, orderId);

    if (!verifyResponse.success) {
      return {
        success: false,
        error: verifyResponse.error || "Payment verification failed",
      };
    }

    const zibalData = verifyResponse.data;

    // Update transaction status based on Zibal verification response
    let transactionStatus = "failed";
    let transactionUpdateData = {
      verifyDate: new Date(),
    };

    // Check if payment was successful according to Zibal API
    if (zibalData.result === 100 || zibalData.result === 201) {
      // 100: verified successfully, 201: already verified
      transactionStatus = "completed";
      transactionUpdateData = {
        ...transactionUpdateData,
        refNumber: zibalData.refNumber || refNumber || null,
        cardNumber: zibalData.cardNumber || cardNumber || null,
        status: transactionStatus,
        paidAt: zibalData.paidAt ? new Date(zibalData.paidAt) : new Date(),
        amount: zibalData.amount || transaction.amount,
      };

      // Update user subscription
      await updateSubscriptionData({
        subscriptionPlan: transaction.subscriptionPlan,
        days: transaction.duration,
        userId: transaction.userId,
      });
    } else {
      // Payment failed or verification unsuccessful
      transactionUpdateData.status = transactionStatus;
      transactionUpdateData.errorCode = zibalData.result;
      transactionUpdateData.errorMessage = getZibalErrorMessage(
        zibalData.result,
      );
    }

    console.log(transactionUpdateData);

    // Update the transaction
    const updatedTransaction = await prisma.transactions.update({
      where: {
        id: transaction.id,
      },
      data: transactionUpdateData,
    });

    // Revalidate dashboard to show updated subscription status
    // revalidatePath("/dashboard");

    return {
      success: transactionStatus === "completed",
      transaction: updatedTransaction,
      status: transactionStatus,
      zibalResponse: zibalData,
    };
  } catch (error) {
    console.error("Verify payment error:", error);
    return { success: false, error: "Payment verification failed" };
  }
}

async function verifyWithZibal(trackId, orderId) {
  try {
    const response = await fetch("https://gateway.zibal.ir/v1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant: process.env.ZIBAL_MERCHANT_ID,
        trackId: trackId,
      }),
    });

    const data = await response.json();

    if (data.result === 100 || data.result === 201) {
      // Successful verification
      return {
        success: true,
        data: {
          result: data.result,
          amount: data.amount,
          refNumber: data.refNumber,
          cardNumber: data.cardNumber,
          paidAt: data.paidAt,
          description: data.description,
        },
      };
    } else {
      // Verification failed
      return {
        success: false,
        error: getZibalErrorMessage(data.result),
        data: data,
      };
    }
  } catch (error) {
    console.error("Zibal verification API error:", error);
    return {
      success: false,
      error: "Failed to connect to Zibal verification service",
    };
  }
}

// Function to get error message from Zibal result code
function getZibalErrorMessage(resultCode) {
  const errorMessages = {
    102: "merchant یافت نشد",
    103: "merchant غیرفعال",
    104: "merchant نامعتبر",
    201: "قبلا تایید شده",
    105: "amount بایستی بزرگتر از ۱,۰۰۰ ریال باشد",
    106: "callbackUrl نامعتبر می‌باشد (شروع با http و یا https)",
    113: "amount مبلغ تراکنش از سقف میزان تراکنش بیشتر است",
    202: "سفارش پرداخت نشده یا ناموفق بوده است",
    203: "trackId نامعتبر می‌باشد",
    204: "چنین تراکنشی یافت نشد",
    205: "موجودی حساب کاربری کافی نمی‌باشد",
    206: "سقف استفاده از درگاه پرداخت طی ۲۴ ساعت گذشته را داشته اید",
    207: "درگاه پرداخت مسدود می‌باشد",
    208: "زمان مورد نظر برای انجام تراکنش سپری شده است",
    209: "مبلغ تسویه شده از مبلغ درخواستی کمتر می‌باشد",
    210: "صادرکننده ی کارت خریدار را پیدا نکرد",
    211: "قوانین و محدودیت های کارت خریدار نقض گردیده است",
    212: "اطلاعات کارت خریدار نادرست می‌باشد",
    213: "کارت خریدار مسدود می‌باشد",
    214: "کارت خریدار منقضی گردیده است",
    215: "مبلغ درخواستی بیشتر از حد مجاز می‌باشد",
    216: "صادرکننده ی کارت خریدار در دسترس نمی‌باشد",
    217: "خطای نامشخصی از سمت پرداخت کننده روی داده است",
    218: "کارت خریدار حذف گردیده است",
    219: "صادرکننده ی کارت خریدار پاسخ دریافت نکرده است",
    221: "خریدار در فرآیند پرداخت منصرف گردیده است",
    401: "اشکال در تولید شناسه پرداخت",
    402: "پارامترهای ارسالی نامعتبر می‌باشند",
    403: "درگاه پرداختی یافت نشد",
    404: "درگاه پرداختی یافت نشد",
    405: "روش ارسالی نامعتبر می‌باشد (بایستی POST باشد)",
    406: "نشانی درگاه پرداخت نامعتبر می‌باشد",
    407: "شماره کارت خریدار نامعتبر می‌باشد",
    408: "چنین درگاهی برای محیط تست در دسترس نمی‌باشد",
    409: "مبلغ پرداختی با مبلغ درخواستی مطابقت ندارد",
    410: "درخواست نامعتبر",
    411: "پاسخ نامعتبر",
    412: "مدت زمان معتبر سازی پرداخت به پایان رسیده است",
    413: "امکان انجام درخواست برای این تراکنش وجود ندارد",
  };

  return errorMessages[resultCode] || `خطای ناشناخته (کد: ${resultCode})`;
}
