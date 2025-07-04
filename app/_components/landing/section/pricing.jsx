"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Rocket, Check, Star } from "lucide-react";
import Link from "next/link";

const PricingSection = () => {
  const [selectedDuration, setSelectedDuration] = useState(3); // Default to 3 months
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const calculatePremiumPrice = (duration) => {
    const monthlyPrice = 100000;
    switch (duration) {
      case 1:
        return monthlyPrice;
      case 3:
        return monthlyPrice * 3 * 0.9; // 10% discount
      case 6:
        return monthlyPrice * 6 * 0.85; // 15% discount
      default:
        return monthlyPrice * 3;
    }
  };

  const pricingPlans = [
    {
      name: "رایگان",
      price: "",
      duration: "",
      description: "",
      features: [
        "ایجاد ۱ صفحه",
        "شخصی سازی ظاهر صفحه",
        "استفاده از بلوک های پایه",
      ],
      cta: "شروع رایگان",
      popular: false,
      icon: <Star className="h-6 w-6 text-blue-400" />,
    },
    {
      name: "حرفه‌ای",
      price: calculatePremiumPrice(selectedDuration).toLocaleString("fa-IR"),
      duration: "",
      description: "تمام امکانات پیشرفته",
      features: [
        "ساخت حداکثر ۳ صفحه",
        "استفاده از تم های گوناگون",
        "دسترسی به بلوک های پیشرفته",
        "شخصی سازی بلوک ها",
        "زمان بندی نمایش محتوا",
        "ایجاد فرم",
        "گزارش گیری از فرم ها",
        "مشاهده آمار کاربران",
        "ثبت در گوگل",
        "شخصی سازی لینک صفحه شخصی شما در شبکه های اجتماعی",
      ],
      cta: "خرید اشتراک",
      popular: true,
      icon: <Rocket className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            انتخاب پلن مناسب
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            امکانات ویژه برای نیازهای شما
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative rounded-2xl border bg-white p-8 shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 ${
                plan.popular
                  ? "border-primary/30 ring-2 ring-primary/20 dark:ring-primary/30"
                  : "border-gray-200"
              } ${hoveredPlan === index ? "scale-[1.03] shadow-xl" : ""}`}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">{plan.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {plan.description}
                  </p>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Price */}
              <div className="mb-6 flex w-full items-center gap-1 text-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                {plan.popular && selectedDuration === 1 && (
                  <span className="text-gray-500 dark:text-gray-400">/ماه</span>
                )}
                {plan.popular && selectedDuration > 1 && (
                  <span className="text-sm text-green-500">
                    ({selectedDuration === 3 ? "۱۰%" : "۱۵%"} تخفیف)
                  </span>
                )}
              </div>

              {/* Duration Selector */}
              {plan.popular && (
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    مدت زمان اشتراک
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 3, 6].map((duration) => (
                      <motion.button
                        key={duration}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDuration(duration)}
                        className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                          selectedDuration === duration
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        }`}
                      >
                        {duration} ماه
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 flex w-full justify-center"
        >
          <button className="w-full rounded-lg bg-primary px-8 py-3 font-medium text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg">
            <Link href="/auth/login">همین حالا شروع کنید</Link>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
