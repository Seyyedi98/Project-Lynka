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
            "برای ثبت نام در لینکا، روی دکمه 'ثبت نام' کلیک کرده و اطلاعات مورد نیاز شامل ایمیل، شماره موبایل و رمز عبور را وارد کنید. پس از تایید ایمیل و شماره موبایل، حساب شما فعال خواهد شد.",
        },
        {
          id: 2,
          question: "آیا می‌توانم چند حساب کاربری داشته باشم؟",
          answer:
            "خیر، هر کاربر فقط مجاز به داشتن یک حساب کاربری است. در صورت مشاهده حساب‌های تکراری، تمامی آن‌ها مسدود خواهند شد.",
        },
        {
          id: 3,
          question: "رمز عبورم را فراموش کرده‌ام چه کار کنم؟",
          answer:
            "روی گزینه 'فراموشی رمز عبور' کلیک کرده و ایمیل یا شماره موبایل خود را وارد کنید. لینک بازیابی رمز عبور برای شما ارسال خواهد شد.",
        },
      ],
    },
    {
      id: 2,
      title: "امنیت و حریم خصوصی",
      icon: "🔒",
      questions: [
        {
          id: 4,
          question: "اطلاعات من چگونه محافظت می‌شود؟",
          answer:
            "تمامی اطلاعات کاربران به صورت رمزنگاری شده ذخیره می‌شود و از استانداردهای امنیتی پیشرفته برای محافظت از داده‌ها استفاده می‌کنیم.",
        },
        {
          id: 5,
          question: "آیا اطلاعات من با第三方 به اشتراک گذاشته می‌شود؟",
          answer:
            "خیر، اطلاعات شخصی کاربران با هیچ شخص یا سازمان دیگری به اشتراک گذاشته نمی‌شود مگر با رضایت explicit کاربر یا در مواردی که قانون الزام کند.",
        },
      ],
    },
    {
      id: 3,
      title: "مشکلات فنی",
      icon: "🔧",
      questions: [
        {
          id: 6,
          question: "اپلیکیشن crash می‌کند، چه کار کنم؟",
          answer:
            "ابتدا آخرین نسخه اپلیکیشن را از فروشگاه مربوطه دانلود کنید. اگر مشکل persist کرد، از طریق بخش 'ارتباط با ما' مشکل را گزارش دهید.",
        },
        {
          id: 7,
          question: "سرعت لود تصاویر پایین است، چرا؟",
          answer:
            "این مشکل ممکن است به دلیل سرعت اینترنت شما یا ترافیک سرور باشد. ابتدا اتصال اینترنت خود را بررسی کنید. اگر مشکل از سمت ما باشد، به زودی رفع خواهد شد.",
        },
      ],
    },
    {
      id: 4,
      title: "قوانین و مقررات",
      icon: "📝",
      questions: [
        {
          id: 8,
          question: "چه نوع محتوایی ممنوع است؟",
          answer:
            "محتوای مغایر با قوانین جمهوری اسلامی ایران، محتوای هرزه‌نگاری، خشونت‌آمیز، توهین‌آمیز و نقض کننده حقوق مالکیت معنوی ممنوع است.",
        },
        {
          id: 9,
          question: "در صورت تخلف چه اتفاقی می‌افتد؟",
          answer:
            "حساب کاربری متخلف پس از بررسی مسدود شده و در صورت لزوم اطلاعات مربوطه به مراجع قانونی ارائه می‌شود.",
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
