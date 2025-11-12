"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, Zap } from "lucide-react";

const sections = [
  {
    id: "feature1",
    title: "طراحی شیک و حرفه‌ای",
    content:
      "یه کارت دیجیتال جذاب بساز که کسب و کارت رو به بهترین شکل نشون بده.",
    imageSection: 0,
    image: "https://arklight.storage.c2.liara.space/preview/rose.webp",
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    id: "feature2",
    title: "اتصال به شبکه‌های اجتماعی",
    content: "تمام لینک‌هات رو یکجا بچین و راحت مخاطبات ارتباط برقرار کن.",
    imageSection: 1,
    image: "https://arklight.storage.c2.liara.space/preview/socials.webp",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    id: "feature3",
    title: "رمزگزاری و زمان‌بندی لینک‌ها",
    content:
      "لینک‌های مهمت رو با رمز عبور محافظت کن یا برای نمایش در تاریخ‌های خاص زمان‌بندی کن.",
    imageSection: 4,
    image: "https://arklight.storage.c2.liara.space/preview/password.webp",
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-500/10",
  },
  {
    id: "feature4",
    title: "ایجاد قرعه‌کشی و رویدادهای تعاملی",
    content:
      "به راحتی قرعه‌کشی راه‌اندازی کن و با مشتریانت ارتباط جذاب و مؤثر برقرار کن.",
    imageSection: 5,
    image: "https://arklight.storage.c2.liara.space/preview/lottery.webp",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    id: "feature5",
    title: "ساخت فرم و جمع‌آوری اطلاعات",
    content:
      "فرم‌های حرفه‌ای بساز و اطلاعات مورد نیازت رو از مخاطبانت به سادگی جمع‌آوری کن.",
    imageSection: 6,
    image: "https://arklight.storage.c2.liara.space/preview/form.webp",
    gradient: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
  },
];

const InteractiveFeaturesSection = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const imageContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const handleAccordionClick = (index) => {
    setActiveAccordion(index);
    if (imageContainerRef.current) {
      setIsScrolling(true);
      const sectionHeight =
        imageContainerRef.current.scrollHeight / sections.length;
      imageContainerRef.current.scrollTo({
        top: sectionHeight * index,
        behavior: "smooth",
      });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  // Handle scroll events to update active accordion
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling) return;

      const scrollTop = container.scrollTop;
      const sectionHeight = container.scrollHeight / sections.length;
      const newActiveIndex = Math.min(
        Math.floor((scrollTop + sectionHeight / 2) / sectionHeight),
        sections.length - 1,
      );

      if (newActiveIndex !== activeAccordion) {
        setActiveAccordion(newActiveIndex);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeAccordion, isScrolling, sections.length]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20"
          >
            <Zap className="h-4 w-4" />
            قابلیت‌های منحصر به فرد
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            هرآنچه برای{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              صفحه شخصی کامل
            </span>{" "}
            نیاز دارید
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            با ابزارهای قدرتمند و امکانات پیشرفته، صفحه‌ای حرفه‌ای و جذاب بسازید
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-12 lg:flex-row-reverse">
          {/* accordion */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-4">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/80 ${
                    activeAccordion === index
                      ? "shadow-lg ring-2 ring-blue-500/30"
                      : "hover:border-slate-300/50 dark:hover:border-slate-600/50"
                  }`}
                >
                  {/* Gradient border effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${section.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5 ${
                      activeAccordion === index ? "opacity-10" : ""
                    }`}
                  />

                  {/* Entire accordion is clickable */}
                  <div
                    onClick={() => handleAccordionClick(index)}
                    className="flex w-full cursor-pointer items-center justify-between p-6 text-right transition-all duration-300 hover:bg-slate-50/50 dark:hover:bg-slate-700/50"
                  >
                    <div className="flex items-start gap-4">
                      {/* Number indicator */}
                      <div
                        className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${section.bg} transition-all duration-300 ${
                          activeAccordion === index
                            ? "scale-110 shadow-md"
                            : "group-hover:scale-105"
                        }`}
                      >
                        {activeAccordion === index ? (
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${section.gradient} shadow-lg`}
                          >
                            <span className="text-sm font-bold text-white">
                              {index + 1}
                            </span>
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-700">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                              {index + 1}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-right">
                        <h3
                          className={`text-lg font-semibold transition-colors duration-300 ${
                            activeAccordion === index
                              ? "text-slate-900 dark:text-white"
                              : "text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white"
                          }`}
                        >
                          {section.title}
                        </h3>

                        <AnimatePresence>
                          {activeAccordion === index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                            >
                              {section.content}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Chevron icon */}
                    <div
                      className={`ml-4 flex-shrink-0 transition-colors duration-300 ${
                        activeAccordion === index
                          ? "text-blue-500"
                          : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                      }`}
                    >
                      <ChevronLeft
                        className={`h-5 w-5 transition-transform duration-300 ${
                          activeAccordion === index ? "-rotate-90" : ""
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile preview */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative mx-auto max-w-xs"
            >
              {/* Phone frame */}
              <div className="relative rounded-[2.5rem] border-[8px] border-slate-900 bg-slate-900 p-3 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
                {/* Notch */}
                <div className="absolute -top-1 left-1/2 z-20 h-4 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-900 dark:bg-slate-700" />

                {/* Dynamic status bar gradient */}
                <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2">
                  <div
                    className={`h-1 w-20 rounded-full bg-gradient-to-r ${sections[activeAccordion]?.gradient}`}
                  />
                </div>

                {/* Screen */}
                <div className="overflow-hidden rounded-[2rem] bg-white">
                  <div
                    ref={imageContainerRef}
                    className="scrollbar-hide h-[32rem] w-full overflow-y-scroll [scrollbar-width:none]"
                  >
                    <div className="h-[500%]">
                      {sections.map((section, index) => (
                        <div
                          key={section.id}
                          className="flex h-1/5 w-full items-center justify-center"
                          style={{ height: `${100 / sections.length}%` }}
                        >
                          <div className="relative h-full w-full">
                            <Image
                              fill
                              alt={section.title}
                              className="object-cover"
                              src={section.image}
                              priority={index === 0}
                            />

                            {/* Overlay for non-active images - only on desktop */}
                            <div
                              className={`absolute inset-0 hidden transition-opacity duration-300 lg:block ${
                                activeAccordion === index
                                  ? "bg-transparent"
                                  : "bg-slate-900/10"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeaturesSection;
