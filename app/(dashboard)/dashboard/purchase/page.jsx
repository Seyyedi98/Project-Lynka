"use client";

import { purchase } from "@/actions/transactions/transactions";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Crown, Gem, Zap } from "lucide-react";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export default function Purchase() {
  const plans = [
    {
      id: "silver",
      name: "اشتراک نقره‌ای",
      price: "۱۰۰۰ تومان",
      duration: "۳۰ روز",
      features: [
        "دسترسی به ۵ فرم",
        "پشتیبانی اولیه",
        "محدودیت در تم‌های سفارشی",
      ],
      icon: <Gem className="h-6 w-6 text-gray-400" />,
    },
    {
      id: "gold",
      name: "اشتراک طلایی",
      price: "۳۰۰۰ تومان",
      duration: "۳۰ روز",
      features: [
        "دسترسی نامحدود به فرم‌ها",
        "پشتیبانی ویژه",
        "تم‌های سفارشی نامحدود",
        "ابزارهای پیشرفته",
      ],
      icon: <Crown className="h-6 w-6 text-yellow-400" />,
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 sm:mx-4 sm:mr-20 xl:pr-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white md:text-4xl"
        >
          ارتقاء به اشتراک پریمیوم
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-white"
        >
          امکانات پیشرفته برای نیازهای حرفه‌ای شما
        </motion.p>
      </div>

      {/* Plans */}
      <motion.div
        {...fade}
        className="grid gap-6 sm:mx-4 sm:mr-20 md:grid-cols-2 xl:pr-6"
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-xl border border-muted/30 bg-card/80 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  {plan.icon}
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                </div>
                <p className="mt-2 text-muted-foreground">
                  مدت زمان: {plan.duration}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{plan.price}</p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() =>
                purchase(plan.id === "silver" ? 1000 : 3000, plan.id, 30)
              }
              className="mt-8 w-full gap-2"
              size="lg"
            >
              خرید اشتراک
            </Button>
          </div>
        ))}
      </motion.div>

      {/* Free Plan */}
      <motion.div
        {...fade}
        className="mt-8 rounded-xl border border-muted/30 bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:mx-4 sm:mr-20 xl:pr-6"
      >
        <h3 className="text-xl font-bold text-white">اشتراک رایگان</h3>
        <p className="mt-2 text-muted-foreground">
          مناسب برای شروع و تست پلتفرم
        </p>

        <ul className="mt-6 space-y-3">
          <li className="flex items-start gap-3">
            <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-white">دسترسی به ۱ فرم</span>
          </li>
          <li className="flex items-start gap-3">
            <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-white">تم‌های محدود</span>
          </li>
          <li className="flex items-start gap-3">
            <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-white">پشتیبانی عمومی</span>
          </li>
        </ul>

        <Button
          variant="outline"
          className="mt-8 w-full gap-2"
          size="lg"
          disabled
        >
          فعال
        </Button>
      </motion.div>
    </div>
  );
}
