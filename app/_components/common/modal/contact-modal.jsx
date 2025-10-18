/* eslint-disable react/no-unescaped-entities */
import {
  DialogContent,
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaInstagram, FaTelegram } from "react-icons/fa";

export default function ContactModal({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            راه های ارتباطی
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Email Section */}
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-blue-900 dark:text-blue-100">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                📧
              </span>
              ایمیل
            </h3>
            <div className="pr-10">
              <p className="mb-3 text-sm text-blue-800 dark:text-blue-200">
                برای پیگیری مشکلات، پیشنهادات و انتقادات با ایمیل زیر با ما در
                ارتباط باشید:
              </p>
              <a
                href="mailto:info@lynka.ir"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-blue-700 shadow-sm transition-all hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                info@lynka.ir
              </a>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-6 dark:from-purple-900/20 dark:to-pink-900/20">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm text-white">
                🌐
              </span>
              شبکه‌های اجتماعی
            </h3>
            <div className="space-y-4 pr-10">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                ما را در شبکه‌های اجتماعی دنبال کنید:
              </p>

              {/* Telegram Button */}
              <a
                href="https://t.me/lynka_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#0088cc] px-6 py-4 text-white transition-all hover:bg-[#0077b3]"
              >
                <FaTelegram className="h-7 w-7" />
                <span className="font-semibold">کانال تلگرام</span>
              </a>

              {/* Instagram Button */}
              <a
                href="https://instagram.com/lynka_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white transition-all hover:from-purple-700 hover:to-pink-700"
              >
                {/* <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg> */}
                <FaInstagram className="h-7 w-7" />
                <span className="font-semibold">صفحه اینستاگرام</span>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
