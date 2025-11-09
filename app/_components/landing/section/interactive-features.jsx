"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, Sparkles, Zap } from "lucide-react";

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
    title: "بلوک های متنوع",
    content: "با بلوک های گوناگون صفحه ی خودرا هر طور که دوست داری بساز",
    imageSection: 2,
    image:
      "https://arklight.storage.c2.liara.space/preview/preview-grayart.webp",
    gradient: "from-green-500 to-emerald-500",
    bg: "bg-green-50 dark:bg-green-500/10",
  },
  {
    id: "feature4",
    title: "رمزگزاری و زمان‌بندی لینک‌ها",
    content:
      "لینک‌های مهمت رو با رمز عبور محافظت کن یا برای نمایش در تاریخ‌های خاص زمان‌بندی کن.",
    imageSection: 3,
    image: "https://arklight.storage.c2.liara.space/preview/password.webp",
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-500/10",
  },
  {
    id: "feature5",
    title: "شخصی‌سازی لینک و مدیریت سوشال مدیا",
    content:
      "لینک صفحه‌ات رو سفارشی کن و نحوه نمایش آن را در اینستاگرام، تلگرام و دیگر پلتفرم‌ها کنترل کن.",
    imageSection: 4,
    image: "https://arklight.storage.c2.liara.space/preview/social-custom.webp",
    gradient: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
  },
  {
    id: "feature6",
    title: "ایجاد قرعه‌کشی و رویدادهای تعاملی",
    content:
      "به راحتی قرعه‌کشی راه‌اندازی کن و با مشتریانت ارتباط جذاب و مؤثر برقرار کن.",
    imageSection: 5,
    image: "https://arklight.storage.c2.liara.space/preview/lottery.webp",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    id: "feature7",
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

      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
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
        Math.floor(scrollTop / sectionHeight),
        sections.length - 1,
      );

      if (newActiveIndex !== activeAccordion) {
        setActiveAccordion(newActiveIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeAccordion, isScrolling]);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-24 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20">
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
          {/* Right side - accordion */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-3">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-1 backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700/50 dark:bg-slate-800/80 ${
                    activeAccordion === index ? "ring-2 ring-blue-500/20" : ""
                  }`}
                >
                  {/* Gradient border effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${section.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />

                  <button
                    onClick={() => handleAccordionClick(index)}
                    className="flex w-full items-center justify-between p-6 text-right transition-all hover:bg-slate-50/50 dark:hover:bg-slate-700/50"
                  >
                    <div className="flex items-center gap-4">
                      {/* Number indicator */}
                      <motion.div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-xl ${section.bg} transition-all duration-300 ${
                          activeAccordion === index
                            ? "scale-110"
                            : "group-hover:scale-105"
                        }`}
                        animate={{
                          scale: activeAccordion === index ? 1.1 : 1,
                        }}
                      >
                        {activeAccordion === index ? (
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${section.gradient} shadow-lg`}
                          >
                            <span className="text-sm font-bold text-white">
                              {index + 1}
                            </span>
                          </motion.div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-700"
                          >
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                              {index + 1}
                            </span>
                          </motion.div>
                        )}
                      </motion.div>

                      <div className="flex-1 text-right">
                        <h3
                          className={`text-lg font-semibold transition-colors ${
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
                              className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                            >
                              {section.content}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Chevron icon */}
                    <motion.div
                      animate={{
                        rotate: activeAccordion === index ? -90 : 0,
                        color:
                          activeAccordion === index ? "#3b82f6" : "#64748b",
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Left side - Mobile preview */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative mx-auto max-w-xs"
            >
              {/* Phone frame */}
              <div className="relative rounded-[2.5rem] border-[6px] border-slate-900 bg-slate-900 p-3 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
                {/* Notch */}
                <div className="absolute -top-1 left-1/2 z-20 h-4 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-900 dark:bg-slate-700" />

                {/* Screen */}
                <div className="overflow-hidden rounded-[2rem] bg-white">
                  <div
                    ref={imageContainerRef}
                    className="scrollbar-hide h-[32rem] w-full overflow-y-scroll [scrollbar-width:none]"
                  >
                    <div className="h-[700%]">
                      {sections.map((section, index) => (
                        <div
                          key={section.id}
                          className="h-1/7 flex w-full items-center justify-center"
                          style={{ height: `${100 / sections.length}%` }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                              opacity: activeAccordion === index ? 1 : 0.7,
                              scale: activeAccordion === index ? 1 : 0.95,
                            }}
                            transition={{
                              duration: 0.5,
                              ease: "easeOut",
                            }}
                            className="relative h-full w-full"
                          >
                            <Image
                              fill
                              alt={section.title}
                              className="object-cover"
                              src={section.image}
                            />

                            {/* Overlay for non-active images */}
                            {activeAccordion !== index && (
                              <div className="absolute inset-0 bg-slate-900/20" />
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decoration */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-3 shadow-lg"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeaturesSection;
