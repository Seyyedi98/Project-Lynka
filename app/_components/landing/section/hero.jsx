"use client";

import { motion } from "framer-motion";
import { Globe, Link2, Share2, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const floatingIcons = [
  { icon: Link2, top: "10%", left: "5%" },
  { icon: Share2, top: "20%", left: "85%" },
  { icon: Users, top: "70%", left: "10%" },
  { icon: Globe, top: "80%", left: "80%" },
  { icon: Sparkles, top: "50%", left: "50%" },
];

// Text animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const underlineVariants = {
  hidden: { scaleX: 0, originX: 1 },
  visible: {
    scaleX: 1,
    transition: {
      delay: 0.4,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const LandingPageHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(207,90%,54%)] to-[hsl(172,100%,37%)] py-24 transition-colors duration-300 md:py-32">
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 224 12"
          fill="currentColor"
          className="-mb-1 w-full text-white"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto mt-12 flex flex-col-reverse items-center gap-16 px-4 md:flex-row">
        <div className="w-full text-right md:w-1/2">
          <motion.h1
            initial="hidden"
            animate="visible"
            className="mb-6 text-center text-4xl font-bold leading-relaxed text-white md:text-right md:text-3xl lg:text-4xl xl:text-5xl"
          >
            <motion.span variants={textVariants} className="block">
              همه‌ی محتوای شما، در یک‌جا
            </motion.span>
            <br className="hidden md:block" />
            <motion.span
              variants={textVariants}
              custom={1}
              className="relative inline-block md:mt-4"
            >
              به سادگی و زیبایی
              <motion.div
                variants={underlineVariants}
                className="h-1 w-full rounded-full bg-white/30 md:mt-4"
                initial="hidden"
                animate="visible"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={1.5}
            className="mb-10 max-w-md text-center text-lg leading-7 text-white/90 sm:text-right sm:leading-4 md:text-xl"
          >
            تمام لینک‌ها، شبکه‌های اجتماعی، محصولات و خدمات‌تان را در یک صفحه‌ی
            زیبا و اختصاصی به نمایش بگذارید.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            className="items-center gap-4"
          >
            <Link
              href="/dashboard"
              className="focus:shadow-outline inline-flex h-12 w-full items-center justify-center rounded-lg bg-white px-6 font-medium tracking-wide text-[hsl(207,90%,54%)] shadow-md transition duration-200 hover:bg-white/90 focus:outline-none md:w-auto"
            >
              رایگان شروع کنید
            </Link>
          </motion.div>
        </div>

        {/* Preview and floating components */}
        <div className="relative flex w-full items-center justify-center md:w-1/2">
          <div className="relative h-[520px] w-[260px]">
            <Image
              src="/mobile-earth.webp"
              alt="پیش‌نمایش موبایل"
              fill
              className="rounded-2xl object-cover shadow-2xl"
            />
          </div>
          {floatingIcons.map(({ icon: Icon, top, left }, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/90 p-3 text-[hsl(207,90%,54%)] shadow-md backdrop-blur-sm"
              style={{ top, left }}
              variants={floatVariants}
              initial="initial"
              animate="animate"
              custom={i}
            >
              <Icon className="h-5 w-5" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPageHero;
