"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils"; // اگر ابزار کلاس ترکیب دارید، یا این خط رو حذف کن

const features = [
  {
    title: "طراحی‌شده برای سازندگان محتوا",
    description: [
      "تمام محتوای خود را در یک مکان به نمایش بگذارید",
      "راه‌اندازی آسان و قابل تنظیم",
      "در عرض چند دقیقه همه‌ی سرویس‌ها را متصل کنید",
      "بدون نیاز به کدنویسی یا طراحی",
    ],
    image: "/images/features-1.png",
  },
  {
    title: "مخاطبین‌تان را به مشتری تبدیل کنید",
    description: [
      "فروش محصولات، خدمات یا عضویت‌ها در کنار محتوای شما",
      "افزایش نرخ تبدیل با پرداخت سریع و امن (Shopify)",
      "پذیرش حمایت مالی یا دونیشن از طرفداران",
    ],
    image: "/images/features-2.png",
  },
  {
    title: "همه‌ی خدمات شما در یک لینک",
    description: [
      "ادغام خودکار با TikTok، YouTube و دیگر پلتفرم‌ها",
      "نمایش نمونه‌کارها با گالری تصویر و ویدئو",
    ],
    image: "/images/features-3.png",
  },
  {
    title: "دسترسی به داده‌های پیشرفته",
    description: [
      "اطلاعات کامل برای جذب همکاری برندها",
      "تحلیل عادت‌ها و ترجیحات مخاطبین",
      "ثبت سرنخ‌های فروش و پیشنهاد همکاری",
    ],
    image: "/images/features-4.png",
  },
];

const LandingPageFeatures = () => {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container mx-auto flex flex-col gap-24 px-4">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center gap-12 md:flex-row md:gap-20",
                !isEven && "md:flex-row-reverse",
              )}
            >
              {/* Text content */}
              <div className="w-full text-right md:w-1/2">
                <h2 className="mb-6 text-3xl font-bold leading-relaxed text-foreground">
                  {feature.title}
                </h2>
                <ul className="list-disc space-y-3 pr-5 text-lg leading-loose text-muted-foreground">
                  {feature.description.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className="mt-8 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-medium text-white shadow transition-all hover:scale-105 active:scale-95"
                >
                  شروع نسخه آزمایشی رایگان
                </Link>
              </div>

              {/* Image content */}
              <div className="w-full md:w-1/2">
                <div className="relative h-64 w-full md:h-96">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="rounded-xl object-cover shadow-xl"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LandingPageFeatures;
