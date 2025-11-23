/* eslint-disable react/no-unescaped-entities */
import {
  DialogContent,
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// FAQ data - This could also be imported from a separate JSON file
const faqData = {
  title: "سوالات متداول",
  description: "پاسخ به پرتکرارترین سوالات کاربران",
  categories: [
    {
      id: 1,
      title: "حساب کاربری و ثبت نام",
      icon: "👤",
      questions: [
        {
          id: 1,
          question: "چگونه در لینکا ثبت نام کنم؟",
          answer:
            "برای ثبت نام می‌توانید با استفاده از شماره موبایل یا حساب جیمیل وارد سیستم شوید.",
        },
        {
          id: 2,
          question:
            "اشتراک خریده‌ام اما محتوای پیشرفته برای من فعال نیست، چه کنم؟",
          answer:
            "یک بار صفحه را رفرش کنید. همچنین ممکن است سرعت اینترنت شما پایین باشد و بخش‌های پیشرفته دیرتر فعال شوند.",
        },
      ],
    },
    {
      id: 2,
      title: "مشکلات فنی",
      icon: "🔧",
      questions: [
        {
          id: 3,
          question: "سرعت لود تصاویر پایین است، چرا؟",
          answer:
            "این مشکل ممکن است به دلیل سرعت اینترنت شما یا ترافیک سرور باشد. ابتدا اتصال اینترنت خود را بررسی کنید. اگر مشکل از سمت ما باشد، به زودی رفع خواهد شد.",
        },
        {
          id: 4,
          question: "عکس‌ها بارگذاری نمی‌شوند، دلیل چیست؟",
          answer:
            "اگر اینترنت شما کند نیست، ممکن است مشکل از فرمت تصویر باشد. از فرمت‌های jpg، jpeg و png استفاده کنید. برای آپلود favicon باید تصویر با فرمت ico باشد.",
        },
      ],
    },
    {
      id: 3,
      title: "قوانین و مقررات",
      icon: "📝",
      questions: [
        {
          id: 5,
          question: "چه نوع محتوایی ممنوع است؟",
          answer:
            "هرگونه انتشار محتوای مغایر با قوانین جمهوری اسلامی ایران، محتوای خشونت‌آمیز، توهین‌آمیز یا ناقض حقوق مالکیت معنوی ممنوع است.",
        },
        {
          id: 6,
          question: "در صورت تخلف چه اتفاقی می‌افتد؟",
          answer: "صفحه یا حساب کاربری متخلف پس از بررسی غیرفعال خواهد شد.",
        },
        {
          id: 7,
          question: "آیا لینکا در قبال محتوای کاربران مسئول است؟",
          answer:
            "لینکا هیچ مسئولیتی در قبال محتوای منتشر شده توسط کاربران ندارد و مسئولیت کامل بر عهده منتشرکننده است.",
        },
      ],
    },
  ],
};

export default function FaqModal({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            {faqData.title}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
            {faqData.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {faqData.categories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800"
            >
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                  {category.icon}
                </span>
                {category.title}
              </h3>

              <div className="space-y-4 pr-4">
                {category.questions.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                  >
                    <h4 className="mb-2 flex items-start text-sm font-semibold text-gray-900 dark:text-white">
                      <span className="ml-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                        {item.id}
                      </span>
                      {item.question}
                    </h4>
                    <p className="pr-7 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Support Section */}
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
            <div className="text-center">
              <h4 className="dark:text-primary-300 mb-2 text-lg font-semibold text-primary">
                پاسخ خود را پیدا نکردید؟
              </h4>
              <p className="dark:text-primary-200 text-sm text-primary/80">
                از طریق بخش "ارتباط با ما" با پشتیبانی ما در تماس باشید
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
