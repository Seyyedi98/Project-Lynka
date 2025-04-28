"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Smartphone, Code, Palette, Laptop } from "lucide-react";

const features = [
  {
    title: "بدون نیاز به طراح و برنامه‌نویس",
    icon: <Palette className="h-6 w-6 text-primary" />,
  },
  {
    title: "نیاز به مهارت خاصی ندارد",
    icon: <Code className="h-6 w-6 text-primary" />,
  },
  {
    title: "از موبایل یا کامپیوتر",
    icon: <Laptop className="h-6 w-6 text-primary" />,
  },
];

const images = [
  "/mobile-earth.webp",
  "/mobile-earth.webp",
  "/mobile-earth.webp",
];

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const CreateSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setShowText(false);

      const textTimer = setTimeout(() => {
        setShowText(true);
      }, 1000);

      return () => clearTimeout(textTimer);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Right side content*/}
          <div className="w-full lg:w-1/2">
            <div className="max-w-md">
              <h2 className="mb-8 text-4xl font-bold text-gray-900">
                راحت‌تر از آنچه فکر می‌کنید
              </h2>
              <p className="mb-8 text-nowrap text-2xl text-gray-600">
                تنها در چند دقیقه صفحه اختصاصی خود را بسازید.
              </p>

              <div className="mb-8 space-y-4 text-xl">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="mt-2">{feature.icon}</div>
                    <p className="text-slate-500">{feature.title}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-start"
              >
                <button className="rounded-lg bg-primary px-8 py-3 font-medium text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg">
                  همین حالا شروع کنید
                </button>
              </motion.div>
            </div>
          </div>

          {/* Left side image*/}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* کانتینر تصویر */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={images[currentImage]}
                    alt="فرآیند ساخت"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>

              {/* text bubble*/}
              <AnimatePresence>
                {showText && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="absolute -bottom-6 -right-6 rounded-full border border-gray-100 bg-white px-6 py-4 text-right shadow-lg"
                  >
                    <motion.p
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 }}
                      className="font-medium text-gray-800"
                    >
                      فرآیند راه‌اندازی آسان!
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateSection;
