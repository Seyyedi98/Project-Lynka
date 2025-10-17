"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const sections = [
  {
    id: "feature1",
    title: "طراحی شیک و حرفه‌ای",
    content:
      "یه کارت دیجیتال جذاب بساز که کسب و کارت رو به بهترین شکل نشون بده.",
    imageSection: 0,
    image: "https://arklight.storage.c2.liara.space/preview/rose.webp",
  },
  {
    id: "feature2",
    title: "اتصال به شبکه‌های اجتماعی",
    content: "تمام لینک‌هات رو یکجا بچین و راحت مخاطبات ارتباط برقرار کن.",
    imageSection: 1,
    image: "https://arklight.storage.c2.liara.space/preview/socials.webp",
  },
  {
    id: "feature3",
    title: "بلوک های متنوع",
    content: "با بلوک های گوناگون صفحه ی خودرا هر طور که دوست داری بساز",
    imageSection: 2,
    image:
      "https://arklight.storage.c2.liara.space/preview/preview-grayart.webp",
  },
  {
    id: "feature4",
    title: "تحلیل رفتار کاربران",
    content: "رفتار بازدیدکننده‌هات رو بررسی کن.",
    imageSection: 3,
    image: "https://arklight.storage.c2.liara.space/preview/analytics.webp",
  },
  {
    id: "feature5",
    title: "سفارشی‌سازی کامل",
    content: "رنگ، فونت، چیدمان و هر چیزی که بخوای رو به سبک خودت تنظیم کن.",
    imageSection: 4,
    image: "https://arklight.storage.c2.liara.space/preview/edit.webp",
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
      const sectionHeight = imageContainerRef.current.scrollHeight / 5;
      imageContainerRef.current.scrollTo({
        top: sectionHeight * index,
        behavior: "smooth",
      });

      // Reset scrolling state after animation completes
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
      if (isScrolling) return; // Don't update during programmatic scroll

      const scrollTop = container.scrollTop;
      const sectionHeight = container.scrollHeight / 5;
      const newActiveIndex = Math.floor(scrollTop / sectionHeight);

      if (newActiveIndex !== activeAccordion) {
        setActiveAccordion(newActiveIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeAccordion, isScrolling]);

  return (
    <section className="bg-[#0f172a] py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          {/* Right side - accordion */}
          <div className="w-full space-y-1 lg:w-1/2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="overflow-hidden rounded-lg bg-[#1e293b] shadow-sm"
              >
                <button
                  onClick={() => handleAccordionClick(index)}
                  className="flex w-full items-center justify-between p-5 hover:bg-[#334155] focus:outline-none"
                >
                  <div className="flex items-center">
                    <motion.div
                      className="relative ml-3 flex h-6 w-6 items-center justify-center"
                      animate={{
                        scale: activeAccordion === index ? 1.1 : 1,
                      }}
                    >
                      {activeAccordion === index ? (
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#3b82f6] bg-[#1e40af]"
                        >
                          <span className="text-xs font-medium text-white">
                            {index + 1}
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex h-2 w-2 items-center justify-center rounded-full border-2 border-[#64748b] hover:border-[#3b82f6]"
                        >
                          <span className="text-xs text-transparent">
                            {index + 1}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                    <h3
                      className={`pr-3 text-right text-lg font-medium ${
                        activeAccordion === index
                          ? "text-white"
                          : "text-[#94a3b8] hover:text-white"
                      }`}
                    >
                      {section.title}
                    </h3>
                  </div>
                </button>

                <AnimatePresence mode="wait">
                  {activeAccordion === index && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      animate={{
                        opacity: 1,
                        paddingTop: "0.5rem",
                        paddingBottom: "1.5rem",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mb-8 px-5 text-right text-[0.95rem] leading-relaxed text-[#cbd5e1] sm:mb-4"
                    >
                      {section.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Left side - Mobile preview */}
          <div className="w-full lg:w-1/2">
            <div className="relative mx-auto max-w-xs">
              <div className="rounded-xl border-2 border-[#334155] bg-[#1e293b] p-1 shadow-sm">
                <div
                  ref={imageContainerRef}
                  className="scrollbar-hide h-[32rem] w-full overflow-y-scroll rounded-lg [scrollbar-width:none]"
                >
                  <div className="h-[500%]">
                    {sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="flex h-1/5 w-full items-center justify-center bg-gradient-to-br from-[#1e3a8a] to-[#0f766e]"
                        style={{ height: "20%" }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: activeAccordion === index ? 1 : 0.3,
                            y: 0,
                            scale: activeAccordion === index ? 1 : 0.95,
                          }}
                          transition={{
                            duration: 0.4,
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
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeaturesSection;
