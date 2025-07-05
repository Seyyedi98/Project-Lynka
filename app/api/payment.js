// Request payment from zibal

"use server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { amount, transactionId, callbackUrl } = req.body;

    // Get track id
    const zibalResponse = await fetch("https://gateway.zibal.ir/v1/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant: process.env.ZIBAL_MERCHANT_ID,
        amount: amount * 10, // Convert toman to rial
        callbackUrl,
        description: `Payment for transaction ${transactionId}`,
        orderId: transactionId,
      }),
    });

    const zibalData = await zibalResponse.json();

    if (zibalData.result !== 100) {
      throw new Error(zibalData.message || "خطا در اتصال به درگاه پرداخت");
    }
    // Go to payment
    const paymentUrl = `https://gateway.zibal.ir/start/${zibalData.trackId}`;
    return res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({ message: error.message });
  }
}
