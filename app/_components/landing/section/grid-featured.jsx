import React from "react";
import { motion } from "framer-motion";
import {
  FiLayers,
  FiSmartphone,
  FiShield,
  FiPieChart,
  FiZap,
  FiGlobe,
  FiUsers,
  FiSettings,
  FiLock,
  FiStar,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import {
  FileSymlink,
  FormInput,
  Link2,
  Palette,
  TrophyIcon,
} from "lucide-react";

const LandingPageFeatures = () => {
  const features = [
    {
      icon: <FiLayers className="h-6 w-6" />,
      title: "بلوک‌های کاربردی",
      description:
        "با بیش از ۱۵ ابزار مختلف، صفحه‌ات رو هرجور که دوست داری بساز!",
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: <FiSmartphone className="h-6 w-6" />,
      title: "طراحی واکنش‌ گرا",
      description:
        "با ظاهری جذاب و واکنش گرا، محتوایت رو روی همه دستگاه‌ها به بهترین شکل نمایش بده!",
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: <Link2 className="h-6 w-6" />,
      title: "لینک‌های متنوع",
      description:
        "از محصولات و خدمات گرفته تا شبکه‌های اجتماعی، همه لینک‌های مهمت رو در یکجا جمع کن!",
      gradient: "from-green-500 to-emerald-500",
      bg: "bg-green-50 dark:bg-green-500/10",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: <FileSymlink className="h-6 w-6" />,
      title: "صفحات مختلف",
      description:
        "اگر یک صفحه کافی نیست، چندین صفحه بساز و به راحتی به هم وصلشون کن!",
      gradient: "from-orange-500 to-red-500",
      bg: "bg-orange-50 dark:bg-orange-500/10",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: <FiLock className="h-6 w-6" />,
      title: "لینک‌های امن",
      description:
        "روی لینک‌های مهمت رمز بذار و دسترسی رو فقط به افراد خاص محدود کن!",
      gradient: "from-red-500 to-rose-500",
      bg: "bg-red-50 dark:bg-red-500/10",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      icon: <FormInput className="h-6 w-6" />,
      title: "فرم‌ساز حرفه‌ای",
      description:
        "فرم‌های ساده یا پیشرفته بساز و اطلاعات مورد نیازت رو از کاربران جمع‌آوری کن!",
      gradient: "from-indigo-500 to-blue-500",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: <FiUsers className="h-6 w-6" />,
      title: "شبکه های اجتماعی",
      description:
        "با لینک‌های هوشمند، کاربران رو مستقیماً به شبکه‌های اجتماعیت هدایت کن!",
      gradient: "from-cyan-500 to-blue-500",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: <TrophyIcon className="h-6 w-6" />,
      title: "قرعه‌کشی",
      description:
        "با برگزاری قرعه‌کشی‌های جذاب، مخاطبان بیشتری جذب و تعامل رو افزایش بده!",
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: <FiTrendingUp className="h-6 w-6" />,
      title: "آنالیز پیشرفته",
      description: "آمار دقیق بازدیدها و کلیک‌ها رو بررسی کن !",
      gradient: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "قالب‌های آماده",
      description:
        "از بین ده‌ها قالب زیبا و حرفه‌ای انتخاب کن و در زمانت صرفه‌جویی کن!",
      gradient: "from-violet-500 to-purple-500",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
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
            <FiZap className="h-4 w-4" />
            قابلیت‌های ویژه
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            هرآنچه برای{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              موفقیت آنلاین
            </span>{" "}
            نیاز دارید
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            با ابزارهای قدرتمند و امکانات کامل، ایده‌هایتان را به واقعیت تبدیل
            کنید
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group relative flex flex-col rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/80"
            >
              {/* Icon Container - FIXED */}
              <div
                className={`mx-auto mb-4 inline-flex rounded-xl p-3 text-center ${feature.bg} transition-all duration-300 group-hover:scale-110`}
              >
                <div className={feature.iconColor}>{feature.icon}</div>
              </div>

              {/* Content */}
              <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>

              {/* Hover Effect Line */}
              <div
                className={`absolute bottom-0 right-0 h-1 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300 group-hover:w-full`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
            <FiAward className="h-5 w-5 text-amber-500" />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              همین حالا شروع کن و از همه این امکانات استفاده کن!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingPageFeatures;
