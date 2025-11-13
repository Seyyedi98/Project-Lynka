"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Smartphone,
  Code,
  Palette,
  Laptop,
  Zap,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "بدون نیاز به طراحی یا کدنویسی",
    description: "با رابط کاربری ساده و بصری",
    icon: <Palette className="h-5 w-5" />,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    title: "بدون نیاز به مهارت یا تجربه خاص",
    description: "آموزش قدم به قدم و راهنمای کامل",
    icon: <Code className="h-5 w-5" />,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    title: "قابل استفاده با موبایل یا لپ‌تاپ",
    description: "هماهنگ با تمام دستگاه‌ها",
    icon: <Laptop className="h-5 w-5" />,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-500/10",
  },
];

const images = [
  "https://arklight.storage.c2.liara.space/preview/editor.webp",
  "https://arklight.storage.c2.liara.space/preview/preview-dnd.webp",
  "https://arklight.storage.c2.liara.space/preview/themes.webp",
];

const textBubbles = [
  "فرآیند راه‌اندازی آسان!",
  "درگ اند دراپ ساده!",
  "قالب‌های آماده و زیبا!",
];

const CreateSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setShowText(false);

      const textTimer = setTimeout(() => {
        setShowText(true);
      }, 800);

      return () => clearTimeout(textTimer);
    }, 4000);

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-16 lg:flex-row-reverse lg:items-start">
          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <div className="mx-auto max-w-lg">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8 text-center lg:text-right"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20"
                >
                  <Zap className="h-4 w-4" />
                  ساخت سریع و آسان
                </motion.div>

                <h2 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
                  ساخت صفحه شخصی،{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    ساده‌تر از همیشه
                  </span>
                </h2>

                <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                  فقط در چند دقیقه، سایت خودتو بساز و به دنیا معرفی کن!
                </p>
              </motion.div>

              {/* Features List */}
              <div className="mb-8 space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200/50 bg-white/50 p-4 backdrop-blur-sm transition-all hover:bg-white/80 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/80"
                  >
                    <div
                      className={`rounded-xl p-2.5 ${feature.bg} transition-all duration-300`}
                    >
                      <div className={feature.color}>{feature.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="flex justify-center lg:justify-start"
              >
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-amber-500/25"
                >
                  <Link href="/auth/login" className="flex items-center gap-2">
                    <span>همه چیز آماده‌ست، شروع کن!</span>
                    <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
                  </Link>

                  {/* Shine effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all group-hover:translate-x-full" />
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={images[currentImage]}
                      alt="فرآیند ساخت"
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImage(index);
                        setShowText(false);
                        setTimeout(() => setShowText(true), 800);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        currentImage === index
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Text Bubble */}
              <AnimatePresence>
                {showText && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="absolute -bottom-4 -right-4 rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 text-right shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/90"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="font-semibold text-slate-900 dark:text-white"
                    >
                      {textBubbles[currentImage]}
                    </motion.p>

                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-slate-200 bg-white/90 dark:border-slate-700 dark:bg-slate-800/90" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-4 -top-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 shadow-lg"
              >
                <Smartphone className="h-5 w-5 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -right-4 -top-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-3 shadow-lg"
              >
                <Laptop className="h-5 w-5 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateSection;
