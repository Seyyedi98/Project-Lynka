"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const tabs = [
  {
    id: "services",
    number: "۰۱",
    title: "خدمات",
    subtitle: "خدمات",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "creators",
    number: "۰۲",
    title: "صفحه شخصی",
    subtitle: "شخصی",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    id: "stores",
    number: "۰۳",
    title: "فروشگاه‌ها",
    subtitle: "فروشگاه",
    gradient: "from-purple-500 to-violet-400",
  },
  {
    id: "everyone",
    number: "۰۴",
    title: "کسب‌وکارهای کوچک",
    subtitle: "استارتاپ",
    gradient: "from-emerald-500 to-teal-400",
  },
];

const slides = [
  {
    id: "services",
    categories: ["خدمات", "انجمن‌ها", "جشنواره‌ها"],
    title: "خدمات حرفه‌ای، ارتباط مستقیم",
    description:
      "ارائه خدمات، مدیریت رویداد ها و جشنواره‌ها با امکان ارتباط با مخاطب.",
    cta: "شروع کن",
    images: [
      "https://arklight.storage.c2.liara.space/preview/trio-services.webp",
    ],
  },
  {
    id: "creators",
    categories: ["شخصی", "فردی", "محتوا"],
    title: "صفحه شخصی، حضور منحصربه‌فرد",
    description: "صفحه‌ای شخصی برای خودت بساز و با دنیا به اشتراک بذار.",
    cta: "رشد کن",
    images: [
      "https://arklight.storage.c2.liara.space/preview/trio-personal.webp",
    ],
  },
  {
    id: "stores",
    categories: ["فروشگاه", "مغازه", "محلی"],
    title: "فروشگاه آنلاین، کسب‌وکار آسان",
    description: "محصولاتت رو به بقیه معرفی کن و کسب‌وکارت رو توسعه بده.",
    cta: "همین حالا شروع کن",
    images: ["https://arklight.storage.c2.liara.space/preview/trio-shop.webp"],
  },
  {
    id: "everyone",
    categories: ["کسب‌وکار خرد", "استارتاپ", "شخصی"],
    title: "کسب‌وکار کوچک، رشد بزرگ",
    description:
      "راه‌حلی مقرون‌به‌صرفه برای کسب‌وکارهای خرد و استارتاپ‌های کوچک.",
    cta: "نمایش بده",
    images: ["https://arklight.storage.c2.liara.space/preview/trio-other.webp"],
  },
];

const LandingPageAudience = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [autoSlide, setAutoSlide] = useState(true);
  const activeGradient =
    tabs.find((tab) => tab.id === activeTab)?.gradient ||
    "from-blue-500 to-cyan-400";

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
    <section className="bg-white pb-16 pt-16">
      <div className="container mx-auto px-4">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setAutoSlide(false);
              }}
              className="relative flex-1 py-6 text-center transition-colors hover:bg-gray-50"
            >
              <div className="text-xs font-medium text-gray-500">
                {tab.number}
              </div>
              <div
                className={`text-lg font-semibold ${activeTab === tab.id ? "text-gray-900" : "text-gray-600"}`}
              >
                {tab.subtitle}
              </div>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabIndicator"
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.gradient}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-12 md:flex-row"
            >
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="mb-6 flex flex-wrap gap-2"
                >
                  {slide.categories.map((c, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      {c}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.h2
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-6 text-4xl font-bold text-gray-900"
                >
                  {slide.title}
                </motion.h2>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className={`mb-8 h-1 w-20 bg-gradient-to-r ${activeGradient}`}
                />

                <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-10 text-lg leading-relaxed text-gray-600"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Button
                    asChild
                    className={`rounded-lg bg-gradient-to-r ${activeGradient} px-8 py-6 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                  >
                    <Link href="/dashboard">{slide.cta}</Link>
                  </Button>
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
                      className={`absolute ${idx === 0 ? "left-0 top-0 z-0" : "bottom-0 right-0 z-10"} h-full w-full`}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={idx === 0}
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
