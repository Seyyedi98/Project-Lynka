/* eslint-disable react/no-unescaped-entities */
import {
  DialogContent,
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TermsModal({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            شرایط استفاده از سرویس لینکا
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6 text-justify">
          {/* Section 1 - General Rules */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۱
              </span>
              قوانین اصلی
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>• هر کاربر مسئول محتوای منتشر شده در پروفایل خود است</p>
              <p>• هر کاربر فقط می‌تواند یک حساب کاربری داشته باشد</p>
            </div>
          </div>

          {/* Section 2 - Prohibited Content */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-red-900 dark:text-red-100">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                ۲
              </span>
              محتوای ممنوعه
            </h3>
            <div className="space-y-2 pr-10 text-sm text-red-800 dark:text-red-200">
              <p>• محتوای مغایر با قوانین جمهوری اسلامی ایران</p>
              <p>• محتوای هرزه‌نگاری، خشونت‌آمیز و توهین‌آمیز</p>
            </div>
          </div>

          {/* Section 3 - Consequences */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                ۳
              </span>
              تخلف و پیامدها
            </h3>
            <div className="space-y-2 pr-10 text-sm text-gray-700 dark:text-gray-300">
              <p>• در صورت نقض قوانین، حساب کاربری متخلف مسدود خواهد شد</p>
              <p>
                • سرویس لینکا مسئولیتی در قبال محتوای منتشر شده توسط کاربران
                ندارد
              </p>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
            <p className="dark:text-primary-300 text-center text-sm font-semibold text-primary">
              ثبت نام در سایت به منزله پذیرفتن قوانین فوق می باشد
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
