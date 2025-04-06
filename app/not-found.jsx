"use client";

import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 p-6 text-center">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg md:p-12">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-blue-500/30 opacity-75 blur-lg"></div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white">
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
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          صفحه مورد نظر یافت نشد!
        </h1>

        <p className="mb-8 text-lg text-white">
          به نظر می‌رسد آدرس وارد شده اشتباه است یا صفحه حذف شده است.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 font-medium text-slate-700 text-white"
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
            بازگشت به صفحه اصلی
          </Link>

          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3 font-medium text-white"
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            تماس با پشتیبانی
          </Link>
        </div>
      </div>

      <p className="mt-8 text-sm text-white">
        مشکلی پیش آمده؟{" "}
        <Link href="mailto:support@example.com" className="underline">
          با ما در تماس باشید
        </Link>
      </p>
    </main>
  );
};

export default NotFound;
