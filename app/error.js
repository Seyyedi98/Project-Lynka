"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      document
        .getElementById("error-card")
        .classList.add("opacity-0", "scale-95");
      // setTimeout(() => router.push("/"), 300); // Navigate after fade-out completes
    }, 5000); // Hide after 5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="from-primary-900 to-primary-950 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-6 text-center">
      <div
        id="error-card"
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 md:p-12"
      >
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-red-500/30 opacity-75 blur-lg"></div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="mb-4 bg-gradient-to-r from-red-200 to-red-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          خطایی رخ داده است!
        </h1>

        <p className="text-primary-200 mb-8 text-lg">
          {error.message || "متاسفانه مشکلی در سیستم پیش آمده است."}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-amber-500 px-8 py-3 font-medium text-white transition-all duration-300 hover:from-red-600 hover:to-amber-600 hover:shadow-lg hover:shadow-red-500/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:animate-spin"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            تلاش مجدد
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            بازگشت به خانه
          </button>
        </div>
      </div>

      <p className="text-primary-400 mt-8 text-sm">
        نیاز به کمک دارید؟{" "}
        <button
          onClick={() => router.push("/contact")}
          className="underline transition hover:text-white"
        >
          با پشتیبانی تماس بگیرید
        </button>
      </p>

      <div className="mt-6 h-1.5 w-full max-w-xs rounded-full bg-gray-800">
        <div
          className="n h-1.5 rounded-full bg-red-500"
          style={{ animationDuration: "5s" }}
        ></div>
      </div>
    </main>
  );
}
