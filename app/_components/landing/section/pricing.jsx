"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Rocket, Check, Star, Crown, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

const PricingSection = () => {
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const calculatePremiumPrice = (duration) => {
    const monthlyPrice = 90000;
    switch (duration) {
      case 1:
        return monthlyPrice;
      case 3:
        return 240000;
      case 6:
        return 390000;
      default:
        return monthlyPrice * 3;
    }
  };

  const pricingPlans = [
    {
      name: "پایه",
      price: "۰",
      duration: "",
      description: "مناسب برای شروع",
      features: [
        "ساخت یک صفحه اختصاصی",
        "امکان شخصی‌سازی ظاهر صفحه",
        "دسترسی به بلوک‌های پایه",
      ],
      cta: "شروع رایگان",
      popular: false,
      icon: <Star className="h-6 w-6" />,
      gradient:
        "from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50",
      border: "border-blue-200 dark:border-blue-800",
      iconBg: "bg-blue-500 dark:bg-blue-600",
      iconColor: "text-white",
      buttonStyle:
        "bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white",
      tagline: "همیشه رایگان",
    },
    {
      name: "حرفه‌ای",
      price: calculatePremiumPrice(selectedDuration).toLocaleString("fa-IR"),
      duration: "",
      description: "کامل‌ترین پکیج برای ساخت صفحه شخصی",
      features: [
        "ساخت تا ۳ صفحه هم‌زمان",
        "استفاده از قالب‌های متنوع",
        "دسترسی به بلوک‌های پیشرفته",
        "سفارشی‌سازی کامل بلوک‌ها",
        "زمان‌بندی هوشمند برای نمایش محتوا",
        "امکان گذاشتن رمز عبور برای لینک‌ها",
        "ساخت فرم های اطلاعاتی",
        "مشاهده آمار کلیک کاربران",
        "ایندکس شدن در گوگل",
      ],
      cta: "همین الان شروع کن",
      popular: true,
      icon: <Crown className="h-6 w-6" />,
      gradient:
        "from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50",
      border: "border-amber-200 dark:border-amber-800",
      iconBg:
        "bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600",
      iconColor: "text-white",
      buttonStyle:
        "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700 text-white shadow-lg",
      tagline: "پرفروش ترین پلن",
      showPopularBadge: selectedDuration === 3,
    },
  ];

  const PriceDisplay = ({ plan, duration }) => {
    if (!plan.popular) {
      return (
        <div className="text-center">
          <div className="mb-2 text-5xl font-bold text-slate-900 dark:text-white">
            رایگان
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            برای همیشه
          </div>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="mb-2 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">
            {plan.price}
          </span>
          <span className="text-lg text-slate-500 dark:text-slate-400">
            تومان
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          {duration > 1 && (
            <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
              {duration === 3 ? "۲۰%" : "۳۰%"} صرفه‌جویی
            </span>
          )}
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {duration === 1 ? "هر ماه" : `برای ${duration} ماه`}
          </span>
        </div>
      </div>
    );
  };

  // Reorder plans for mobile - premium first
  const getOrderedPlans = () => {
    const premiumPlan = pricingPlans.find((plan) => plan.popular);
    const freePlan = pricingPlans.find((plan) => !plan.popular);

    return [premiumPlan, freePlan];
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-24 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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
            تعرفه ها
          </motion.div>
          <h2 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            پلن مناسب با{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              نیازهایتان
            </span>{" "}
            را انتخاب کنید
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            با امکانات متنوع و قیمت‌گذاری شفاف، ایده‌هایتان را به واقعیت تبدیل
            کنید
          </p>
        </motion.div>

        {/* Duration Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-center"
        >
          <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white/80 p-2 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
            {[1, 3, 6].map((duration) => (
              <motion.button
                key={duration}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDuration(duration)}
                className={`relative rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                  selectedDuration === duration
                    ? "bg-slate-900 text-white shadow-sm dark:bg-slate-700"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {duration} ماهه
                {duration > 1 && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-green-500 px-1 text-[10px] text-white dark:bg-green-600">
                    {duration === 3 ? "۲۰٪" : "۳۰٪"}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards - Reordered for mobile */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 xl:gap-12">
          {getOrderedPlans().map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative rounded-3xl border bg-gradient-to-br ${plan.gradient} p-8 shadow-lg transition-all duration-500 ${plan.border} ${
                plan.popular
                  ? "ring-2 ring-amber-200/50 dark:ring-amber-500/20"
                  : ""
              } ${
                hoveredPlan === index
                  ? "-translate-y-2 scale-[1.02] shadow-xl"
                  : "hover:shadow-xl"
              }`}
              style={{
                order: plan.popular ? -1 : 1,
              }}
            >
              {/* Popular Badge - Only show for 3-month duration */}
              {plan.popular && plan.showPopularBadge && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg dark:from-amber-600 dark:to-orange-600">
                    <Sparkles className="h-4 w-4" />
                    {plan.tagline}
                  </div>
                </motion.div>
              )}

              {/* Free Plan Badge */}
              {!plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg dark:bg-blue-600">
                    {plan.tagline}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div
                    className={`rounded-2xl p-4 ${plan.iconBg} ${plan.iconColor} shadow-lg`}
                  >
                    {plan.icon}
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {plan.description}
                </p>
              </div>

              {/* Price Display */}
              <div className="mb-8">
                <PriceDisplay plan={plan} duration={selectedDuration} />
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    viewport={{ once: true }}
                    className="group flex items-start gap-3"
                  >
                    <div
                      className={`mt-1 flex-shrink-0 rounded-full p-1 ${
                        plan.popular
                          ? "bg-amber-100 text-amber-600 transition-transform group-hover:scale-110 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-blue-100 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    <span
                      className={`text-sm ${
                        plan.popular
                          ? "font-medium text-slate-800 dark:text-slate-200"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/dashboard/pricing">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-2xl py-4 font-semibold shadow-lg transition-all ${
                    plan.popular
                      ? "shadow-amber-500/25 hover:shadow-amber-500/40"
                      : "hover:shadow-xl"
                  } ${plan.buttonStyle}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {plan.cta}
                    {plan.popular && <Sparkles className="h-4 w-4" />}
                  </div>
                </motion.button>
              </Link>

              {/* Additional Info */}
              {!plan.popular && (
                <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                  بدون نیاز به پرداخت هزینه • شروع فوری
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
