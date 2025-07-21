"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const tabs = [
  {
    id: "services",
    number: "۰۱",
    title: "خدمات خانگی و کسب‌وکار",
    subtitle: "خدمات",
  },
  {
    id: "creators",
    number: "۰۲",
    title: "افراد محبوب",
    subtitle: "اینفلوئنسر",
  },
  { id: "stores", number: "۰۳", title: "برندها", subtitle: "فروشگاه‌ها" },
  { id: "everyone", number: "۰۴", title: "فریلنسرها", subtitle: "همه افراد" },
];

const slides = [
  {
    id: "services",
    categories: ["خدمات خانگی", "مراسم", "آموزش"],
    title: "مشتری بیشتر، فروش بیشتر",
    description:
      "اجازه بده مشتری‌هات مستقیم پیام بدن، سوال بپرسن و پرداخت کنن.",
    cta: "شروع کن",
    images: ["/images/service-1.png", "/images/service-2.png"],
  },
  {
    id: "creators",
    categories: ["بلاگر", "مربی", "ستاره"],
    title: "پر رنگ‌تر شو، محبوب‌تر شو",
    description: "مخاطبات رو به لینکای مهمت هدایت کن و بازدیدتو افزایش بده.",
    cta: "رشد کن",
    images: ["/images/creator-1.png", "/images/creator-2.png"],
  },
  {
    id: "stores",
    categories: ["فروشگاه محلی", "تولیدکننده", "صنعتگر"],
    title: "خرید رو ساده کن",
    description:
      "بدون نیاز به طراح، صفحه‌ت رو در کمتر از ۲۰ دقیقه ساخته و فروشت رو شروع کن!",
    cta: "فروش شروع کن",
    images: ["/images/store-1.png", "/images/store-2.png"],
  },
  {
    id: "everyone",
    categories: ["هنرمند", "علاقه‌مند"],
    title: "هنر و تو، در مرکز توجه",
    description: "دستاورد‌هاتو به اشتراک بذار و فالوور جدید جذب کن.",
    cta: "نمایش بده",
    images: ["/images/everyone-1.png", "/images/everyone-2.png"],
  },
];

const LandingPageAudience = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      const idx = tabs.findIndex((t) => t.id === activeTab);
      setActiveTab(tabs[(idx + 1) % tabs.length].id);
    }, 10000);
    return () => clearInterval(interval);
  }, [activeTab, autoSlide]);

  const slide = slides.find((s) => s.id === activeTab);

  return (
    <section className="bg-white pb-32 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setAutoSlide(false);
              }}
              className="relative flex-1 py-4 text-center"
            >
              <div className="text-xs text-gray-500">{tab.number}</div>
              <div className="text-lg font-medium text-gray-900">
                {tab.subtitle}
              </div>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[hsl(207,90%,54%)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-12 md:flex-row"
            >
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="mb-4 flex flex-wrap gap-2"
                >
                  {slide.categories.map((c, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {c}
                    </span>
                  ))}
                </motion.div>

                <motion.h2
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-4 text-3xl font-bold text-gray-900"
                >
                  {slide.title}
                </motion.h2>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mb-6 h-px w-20 bg-gray-300"
                />

                <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-8 text-lg text-gray-600"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Link
                    href="/dashboard"
                    className="inline-block rounded-lg bg-gradient-to-r from-[hsl(207,90%,54%)] to-[hsl(172,100%,37%)] px-6 py-3 text-white shadow-lg hover:scale-105"
                  >
                    {slide.cta}
                  </Link>
                </motion.div>
              </div>

              <div className="relative w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-[500px] w-full"
                >
                  {slide.images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3 + idx * 0.15,
                        duration: 0.6,
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                      }}
                      className={`absolute ${idx === 0 ? "left-0 top-0 z-0" : "bottom-0 right-0 z-10"} h-4/5 w-4/5`}
                    >
                      <div className="h-full w-full overflow-hidden rounded-2xl border-2 border-white shadow-2xl">
                        <Image
                          src={img}
                          alt=""
                          width={270}
                          height={480}
                          className="h-full w-64 object-cover"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LandingPageAudience;
