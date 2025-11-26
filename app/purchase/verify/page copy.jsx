import { verifyPayment } from "@/actions/transactions/verifyPayment";
import Link from "next/link";

export default async function PaymentVerify({ searchParams }) {
  const { orderId, trackId, message, refNumber, cardNumber } =
    await searchParams;

  let verificationResult = null;
  let isLoading = true;

  if (trackId) {
    verificationResult = await verifyPayment(
      orderId,
      trackId,
      refNumber,
      cardNumber,
    );
    isLoading = false;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 p-4 text-white">
      <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">نتیجه پرداخت</h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="text-gray-300">در حال بررسی وضعیت پرداخت...</p>
          </div>
        ) : !trackId ? (
          <div className="py-6 text-center">
            <div className="mb-4 text-5xl text-red-500">❌</div>
            <p className="text-lg font-medium text-red-400">
              خطا در پردازش درگاه پرداخت
            </p>
            <p className="mt-2 text-gray-400">اطلاعات پرداخت یافت نشد.</p>
          </div>
        ) : verificationResult?.success ? (
          <div>
            {verificationResult.status === "completed" ? (
              <div className="py-6 text-center">
                <div className="mb-4 text-5xl text-green-500">✅</div>
                <p className="text-lg font-medium text-green-400">
                  پرداخت شما با موفقیت انجام شد!
                </p>
                <div className="mt-6 rounded-lg bg-gray-700 p-4">
                  <p className="text-sm text-gray-300">شماره پیگیری:</p>
                  <p className="font-medium text-white">
                    {verificationResult.transaction.trackId}
                  </p>
                  <p className="mt-4 text-gray-300">
                    اشتراک شما با موفقیت فعال شد.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="mb-4 text-5xl text-red-500">❌</div>
                <p className="text-lg font-medium text-red-400">
                  پرداخت ناموفق بود
                </p>
                <p className="mt-2 text-gray-400">
                  لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
                </p>
                {message && (
                  <div className="mt-4 rounded-lg bg-gray-700 p-3">
                    <p className="text-sm text-gray-300">علت خطا:</p>
                    <p className="text-red-300">{message}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="mb-4 text-5xl text-red-500">⚠️</div>
            <p className="text-lg font-medium text-red-400">
              خطا در تأیید پرداخت
            </p>
            <p className="mt-2 text-gray-400">
              {verificationResult?.error || "خطای ناشناخته"}
            </p>
          </div>
        )}

        {!isLoading && (
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="rounded-md bg-blue-600 px-4 py-3 text-center text-white transition-colors hover:bg-blue-700"
            >
              ادامه
            </Link>

            {(verificationResult?.status !== "completed" ||
              !verificationResult?.success) && (
              <Link
                href="/dashboard/pricing"
                className="rounded-md bg-gray-600 px-4 py-3 text-center text-white transition-colors hover:bg-gray-700"
              >
                تلاش مجدد
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// http://localhost:3000/purchase/verify?success=1&status=2&trackId=4336815369&orderId=cmhruuabv0001ljlcbouzto67
