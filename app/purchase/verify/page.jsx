import { verifyPayment } from "@/actions/transactions/verifyPayment";
import Link from "next/link";

export default async function PaymentVerify({ searchParams }) {
  const { orderId, trackId, message, refNumber, cardNumber, status, success } =
    await searchParams;

  // console.log(
  //   orderId,
  //   trackId,
  //   message,
  //   refNumber,
  //   cardNumber,
  //   status,
  //   success,
  // );

  // IF !trackId throw error
  if (!trackId) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 p-4 text-white">
        <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold">نتیجه پرداخت</h1>
          <div className="py-6 text-center">
            <div className="mb-4 text-5xl text-red-500">❌</div>
            <p className="text-lg font-medium text-red-400">
              خطا در پردازش درگاه پرداخت
            </p>
            <p className="mt-2 text-gray-400">اطلاعات پرداخت یافت نشد.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="rounded-md bg-blue-600 px-4 py-3 text-center text-white transition-colors hover:bg-blue-700"
            >
              بازگشت به داشبورد
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // verify payment
  let verificationResult = null;

  try {
    verificationResult = await verifyPayment(
      orderId,
      trackId,
      refNumber,
      cardNumber,
    );
  } catch (error) {
    verificationResult = {
      success: false,
      error: "خطا در ارتباط با سرور",
    };
  }

  // Debug the actual response
  console.log(
    "Verification Result:",
    JSON.stringify(verificationResult, null, 2),
  );

  // Check if payment is successful based on the actual response structure
  const isPaymentSuccessful =
    verificationResult?.success === true &&
    verificationResult?.status === "completed";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 p-4 text-white">
      <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">نتیجه پرداخت</h1>

        {isPaymentSuccessful ? (
          <div className="py-6 text-center">
            <div className="mb-4 text-5xl text-green-500">✅</div>
            <p className="text-lg font-medium text-green-400">
              پرداخت شما با موفقیت انجام شد!
            </p>
            <div className="mt-6 rounded-lg bg-gray-700 p-4">
              <p className="text-sm text-gray-300">شماره پیگیری:</p>
              <p className="font-medium text-white">
                {verificationResult.transaction?.trackId || trackId}
              </p>
              {verificationResult.transaction?.refNumber && (
                <>
                  <p className="mt-2 text-sm text-gray-300">شماره مرجع:</p>
                  <p className="font-medium text-white">
                    {verificationResult.transaction.refNumber}
                  </p>
                </>
              )}
              <p className="mt-4 text-gray-300">
                اشتراک شما با موفقیت فعال شد.
              </p>
            </div>
          </div>
        ) : verificationResult?.success === false ? (
          <div className="py-6 text-center">
            <div className="mb-4 text-5xl text-red-500">❌</div>
            <p className="text-lg font-medium text-red-400">
              {verificationResult?.status === "failed"
                ? "پرداخت ناموفق بود"
                : "خطا در تأیید پرداخت"}
            </p>
            <p className="mt-2 text-gray-400">
              {verificationResult?.error ||
                verificationResult?.zibalResponse?.description ||
                "لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید."}
            </p>

            {/* Show Zibal error message if available */}
            {verificationResult?.zibalResponse?.result &&
              verificationResult.zibalResponse.result !== 100 &&
              verificationResult.zibalResponse.result !== 201 && (
                <div className="mt-4 rounded-lg bg-gray-700 p-3">
                  <p className="text-sm text-gray-300">کد خطا از زیبال:</p>
                  <p className="text-red-300">
                    {verificationResult.zibalResponse.result} -
                    {verificationResult.zibalResponse.description ||
                      "خطا در پرداخت"}
                  </p>
                </div>
              )}

            {/* Show original message from redirect if available */}
            {message && (
              <div className="mt-4 rounded-lg bg-gray-700 p-3">
                <p className="text-sm text-gray-300">پیام از درگاه پرداخت:</p>
                <p className="text-red-300">{message}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="mb-4 text-5xl text-yellow-500">⚠️</div>
            <p className="text-lg font-medium text-yellow-400">
              وضعیت پرداخت نامشخص
            </p>
            <p className="mt-2 text-gray-400">
              در حال بررسی وضعیت پرداخت، لطفاً چند لحظه صبر کنید.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="rounded-md bg-blue-600 px-4 py-3 text-center text-white transition-colors hover:bg-blue-700"
          >
            بازگشت به داشبورد
          </Link>

          {!isPaymentSuccessful && (
            <Link
              href="/dashboard/pricing"
              className="rounded-md bg-gray-600 px-4 py-3 text-center text-white transition-colors hover:bg-gray-700"
            >
              تلاش مجدد
            </Link>
          )}
        </div>

        {/* Debug information - remove in production */}
        <details className="mt-6 text-xs">
          <summary className="cursor-pointer text-gray-400">
            اطلاعات دیباگ
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-gray-900 p-2 text-left">
            {JSON.stringify(verificationResult, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
// http://localhost:3000/purchase/verify?success=1&status=2&trackId=4336815369&orderId=cmhruuabv0001ljlcbouzto67
// https://lynka.ir/purchase/verify?success=1&status=2&trackId=4362690756&orderId=cmigaxxv0000bua0lrmm1js8u
