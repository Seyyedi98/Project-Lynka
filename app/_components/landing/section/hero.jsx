"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Link2,
  Share2,
  Sparkles,
  Users,
  Zap,
  ArrowLeft,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPageHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const floatVariants = {
    initial: { opacity: 0, y: -20, scale: 0.8 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const underlineVariants = {
    hidden: { scaleX: 0, originX: 1 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 0.6,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingIcons = [
    {
      icon: <Link2 className="h-6 w-6" />,
      delay: 0,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Share2 className="h-5 w-5" />,
      delay: 0.2,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="h-5 w-5" />,
      delay: 0.4,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      delay: 0.6,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-32 md:py-32 lg:py-56"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"
        />
      </div>

      {/* Parallax Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-purple-500/10" />
      </motion.div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="absolute hidden lg:block"
          style={{
            top: `${20 + index * 15}%`,
            left: index % 2 === 0 ? "10%" : "85%",
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
            className={`rounded-2xl bg-gradient-to-r ${item.color} p-3 shadow-2xl`}
          >
            <div className="text-white">{item.icon}</div>
          </motion.div>
        </motion.div>
      ))}

      {/* Bottom wave */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <svg
          viewBox="0 0 224 12"
          fill="currentColor"
          className="-mb-1 w-full text-white dark:text-gray-900"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>

      <div className="container relative z-20 mx-auto flex flex-col items-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white/90">
            پلتفرم ساخت صفحه شخصی
          </span>
        </motion.div>

        <div className="w-full max-w-4xl text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <motion.span variants={textVariants} custom={0} className="block">
              صفحه شخصی خودت رو
            </motion.span>

            <motion.span
              variants={textVariants}
              custom={1}
              className="relative mt-2 inline-block bg-gradient-to-r from-amber-300 to-cyan-300 bg-clip-text text-transparent"
            >
              حرفه‌ای بساز
              <motion.div
                variants={underlineVariants}
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-amber-400 to-cyan-400"
                initial="hidden"
                animate="visible"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={2}
            className="mx-auto mb-8 mt-8 text-lg leading-8 text-white/80 md:mt-12 md:text-xl md:leading-9"
          >
            لینک‌ها، شبکه‌های اجتماعی، محصولات و خدمات خود را در یک صفحه اختصاصی
            و جذاب گرد هم آورید تا همیشه حرفه‌ای دیده شوید.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-amber-500/25 sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  همین الان شروع کن!
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </span>

                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all group-hover:translate-x-full" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={3}
            className="mt-16 flex flex-wrap justify-center gap-8 text-white/70"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">+۵۰۰</div>
              <div className="text-sm">صفحه فعال</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">+۹۵٪</div>
              <div className="text-sm">رضایت کاربران</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">۲۴/۷</div>
              <div className="text-sm">پشتیبانی</div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default LandingPageHero;
