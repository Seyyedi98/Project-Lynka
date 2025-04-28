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
    subtitle: "محتوا سازان و اینفلوئنسرها",
  },
  {
    id: "stores",
    number: "۰۳",
    title: "برندها",
    subtitle: "کالاها و فروشگاه‌ها",
  },
  {
    id: "everyone",
    number: "۰۴",
    title: "فریلنسرها",
    subtitle: "همه افراد",
  },
];

const slides = [
  {
    id: "services",
    categories: ["خدمات خانگی و کسب‌وکار", "مراسمات", "آموزش"],
    title: "مشتری بیشتر، فروش بیشتر تو",
    description:
      "اجازه بده مشتریات راحت بهت پیام بدن، سوال بپرسن و مستقیم پرداخت کنن!",
    cta: "شروع کن",
    images: ["/images/service-1.png", "/images/service-2.png"],
  },
  {
    id: "creators",
    categories: ["بلاگرها", "مربیان", "ستاره‌های در حال رشد"],
    title: "درباره خودت بگو و محبوب‌تر شو",
    description: "مخاطبات رو به لینکای مهمت هدایت کن، بازدیدتو ببر بالا !",
    cta: "رشد کن",
    images: ["/images/creator-1.png", "/images/creator-2.png"],
  },
  {
    id: "stores",
    categories: ["تولیدکنندگان", "فروشگاه‌های محلی", "صنعتگران"],
    title: "خرید رو برای مشتریات آسون کن",
    description:
      "بدون نیاز به طراح یا برنامه‌نویس، تو کمتر از ۲۰ دقیقه صفحه شخصی خودتو بساز!",
    cta: "شروع فروش",
    images: ["/images/store-1.png", "/images/store-2.png"],
  },
  {
    id: "everyone",
    categories: ["هنرمندان و علاقه‌مندان"],
    title: "خودت و هنر‌هات رو به دنیا نشون بده",
    description:
      "دستاورد‌هاتو با بقیه به اشتراک بذار و کلی فالوور جدید جذب کن!",
    cta: "نمایش کارها",
    images: ["/images/everyone-1.png", "/images/everyone-2.png"],
  },
];

const LandingPageAudience = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [autoSlide, setAutoSlide] = useState(true);

  // Auto slide every 10 seconds
  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    }, 10000);

    return () => clearInterval(interval);
  }, [activeTab, autoSlide]);

  const currentSlide = slides.find((slide) => slide.id === activeTab);

  return (
    <section className="bg-white pb-32 pt-20">
      <div className="container mx-auto px-4">
        {/* Tabs */}
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
              <div className="text-xs font-medium text-gray-500">
                {tab.number}
              </div>
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

        {/* Slide Content */}
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
              {/* Text Content */}
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <div className="mb-4 flex flex-wrap gap-2">
                    {currentSlide?.categories.map((category, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-4 text-3xl font-bold text-gray-900"
                >
                  {currentSlide?.title}
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
                  {currentSlide?.description}
                </motion.p>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Link
                    href="/dashboard"
                    className="inline-block rounded-lg bg-gradient-to-r from-[hsl(207,90%,54%)] to-[hsl(172,100%,37%)] px-6 py-3 font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  >
                    {currentSlide?.cta}
                  </Link>
                </motion.div>
              </div>

              {/* Image Content */}
              <div className="relative w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-[500px] w-full"
                >
                  {currentSlide?.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3 + index * 0.15,
                        duration: 0.6,
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                      }}
                      className={`absolute w-64 ${index === 0 ? "left-0 top-0 z-0 h-4/5 w-4/5" : "bottom-0 right-0 z-10 h-4/5 w-4/5"}`}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="h-full w-full overflow-hidden rounded-2xl border-2 border-white shadow-2xl">
                        <Image
                          src={image}
                          alt=""
                          width={270}
                          height={480}
                          className="h-full w-64 object-cover"
                          style={{
                            aspectRatio: "9/16",
                          }}
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
