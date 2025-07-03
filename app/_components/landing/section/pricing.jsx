"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Rocket, Zap, Check, Star } from "lucide-react";

const pricingPlans = [
  {
    name: "رایگان",
    price: "۰",
    duration: "",
    description: "برای شروع و آشنایی با سرویس",
    features: ["۱ صفحه شخصی", "۱ تم پایه", "بلوک‌های اصلی", "پشتیبانی ایمیل"],
    cta: "شروع رایگان",
    popular: false,
    icon: <Star className="h-6 w-6 text-blue-400" />,
  },
  {
    name: "حرفه‌ای",
    price: "۱۰۰,۰۰۰",
    duration: "/ماه",
    description: "تمام امکانات پیشرفته",
    features: [
      "۳ صفحه شخصی",
      "تم‌های نامحدود",
      "بلوک‌های پیشرفته",
      "گزارش‌گیری کامل",
      "پشتیبانی ۲۴/۷",
    ],
    cta: "خرید اشتراک",
    popular: true,
    icon: <Rocket className="h-6 w-6 text-primary" />,
  },
  {
    name: "سازمانی",
    price: "تماس",
    duration: "",
    description: "راه‌حل سفارشی برای کسب‌وکارها",
    features: [
      "صفحات نامحدود",
      "تم‌های سفارشی",
      "پشتیبانی اختصاصی",
      "ابزارهای پیشرفته",
      "هماهنگی با نیازهای شما",
    ],
    cta: "درخواست مشاوره",
    popular: false,
    icon: <Zap className="h-6 w-6 text-purple-500" />,
  },
];

const PricingSection = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

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
            قیمت‌گذاری ساده و شفاف
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            پلن مناسب برای هر نیازی
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-white">
                  پرفروش
                </div>
              )}

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

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {plan.duration}
                  </span>
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

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto"
              >
                <button
                  className={`w-full rounded-lg py-3 font-medium transition-all ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-4xl rounded-2xl bg-white/50 p-8 backdrop-blur-sm dark:bg-gray-800/50"
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            سوالات متداول
          </h3>
          <div className="space-y-4">
            {[
              "آیا می‌توانم پلن خود را بعداً تغییر دهم؟",
              "آیا امکان بازگشت وجه وجود دارد؟",
              "چگونه می‌توانم ارتقاء پیدا کنم؟",
            ].map((question, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {question}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
