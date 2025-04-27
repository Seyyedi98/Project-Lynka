"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const sections = [
  {
    id: "feature1",
    title: "طراحی زیبا و مدرن",
    content: "صفحه‌ای زیبا و حرفه‌ای برای نمایش تمام محتوای خود داشته باشید.",
    imageSection: 0,
  },
  {
    id: "feature2",
    title: "ادغام با شبکه‌های اجتماعی",
    content: "تمام پلتفرم‌های خود را در یکجا به مخاطبان نشان دهید.",
    imageSection: 1,
  },
  {
    id: "feature3",
    title: "فروش مستقیم",
    content: "محصولات و خدمات خود را مستقیماً به فروش برسانید.",
    imageSection: 2,
  },
  {
    id: "feature4",
    title: "تحلیل پیشرفته",
    content: "از رفتار مخاطبان خود آگاه شوید و عملکرد را بهبود بخشید.",
    imageSection: 3,
  },
  {
    id: "feature5",
    title: "سفارشی‌سازی آسان",
    content: "ظاهر صفحه را به سلیقه خود تغییر دهید.",
    imageSection: 4,
  },
];

const InteractiveFeaturesSection = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const imageContainerRef = useRef(null);

  const handleAccordionClick = (index) => {
    setActiveAccordion(index);
    if (imageContainerRef.current) {
      const sectionHeight = imageContainerRef.current.scrollHeight / 5;
      imageContainerRef.current.scrollTo({
        top: sectionHeight * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          {/* Right side - accordion */}
          <div className="w-full space-y-1 lg:w-1/2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="shadow-xs group overflow-hidden rounded-lg bg-white"
              >
                <button
                  onClick={() => handleAccordionClick(index)}
                  className="flex w-full items-center justify-between p-5 transition-colors hover:bg-gray-50 focus:outline-none"
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
                          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-primary/10"
                        >
                          <span className="text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex h-2 w-2 items-center justify-center rounded-full border-2 border-gray-300 transition-all group-hover:border-primary"
                        >
                          <span className="text-xs text-transparent">
                            {index + 1}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                    <h3
                      className={`pr-3 text-right text-lg font-medium transition-colors ${
                        activeAccordion === index
                          ? "text-black"
                          : "text-primary group-hover:text-black"
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
                      className="px-5 text-right text-[0.95rem] leading-relaxed text-gray-600"
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
              <div className="rounded-xl border-2 border-gray-200 bg-white p-1 shadow-sm">
                <div
                  ref={imageContainerRef}
                  className="h-[32rem] w-full overflow-hidden rounded-lg"
                >
                  <div className="h-[500%]">
                    {sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="flex h-1/5 w-full items-center justify-center bg-gradient-to-br from-blue-50 to-green-50"
                        style={{ height: "20%" }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: activeAccordion === index ? 1 : 0.7,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          className="w-full p-6 text-center"
                        >
                          <h3 className="mb-3 text-xl font-bold text-gray-800">
                            {section.title}
                          </h3>
                          <p className="text-gray-600">{section.content}</p>
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
