"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (isEven) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const LandingPageFeatures2 = () => {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto flex flex-col gap-24 px-4">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              variants={containerVariants}
              className={cn(
                "flex flex-col items-center gap-12 md:flex-row md:gap-20",
                !isEven && "md:flex-row-reverse",
              )}
            >
              {/* Text content */}
              <div className="w-full text-right md:w-1/2">
                <motion.h2
                  variants={textVariants}
                  className="mb-6 text-3xl font-bold leading-relaxed text-gray-900"
                >
                  {feature.title}
                </motion.h2>
                <ul className="list-disc space-y-3 pr-5 text-lg leading-loose text-gray-600">
                  {feature.description.map((line, i) => (
                    <motion.li key={i} variants={textVariants} custom={i}>
                      {line}
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={textVariants}>
                  <Link
                    href="/dashboard"
                    className="mt-8 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[hsl(207,90%,54%)] to-[hsl(172,100%,37%)] px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                  >
                    شروع نسخه آزمایشی رایگان
                  </Link>
                </motion.div>
              </div>

              {/* Image content */}
              <motion.div
                custom={isEven}
                variants={imageVariants}
                className="w-full md:w-1/2"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-xl md:h-96">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default LandingPageFeatures2;
