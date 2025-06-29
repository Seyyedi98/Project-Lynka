"use client";

import { purchase } from "@/actions/transactions/transactions";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/data/prices";
import { motion } from "framer-motion";
import { Gem, Crown, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export default function Pricing() {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0].id);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const calculateDiscountPrice = (price, duration) => {
    return (price * 0.9 * duration).toLocaleString("fa-IR");
  };

  const getPlanPrice = (planId) => {
    return planId === "silver" ? 100000 : 200000;
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 sm:mx-4 sm:mr-20 xl:pr-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-text md:text-4xl"
        >
          ارتقاء به اشتراک ویژه
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-text/80"
        >
          امکانات ویژه برای نیازهای حرفه‌ای شما
        </motion.p>
      </div>

      {/* Plan Selection */}
      {/* <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur-lg sm:mx-4 sm:mr-20 xl:pr-6">
          <h3 className="mb-4 text-xl font-bold text-text">نوع اشتراک</h3>
          <div className="flex gap-3">
            {PLANS.map((plan) => (
              <Button
                key={plan.id}
                variant={selectedPlan === plan.id ? "default" : "outline"}
                onClick={() => setSelectedPlan(plan.id)}
                className={`flex-1 border-white/20 bg-white/5 hover:bg-white/10 ${
                  plan.id === "gold" ? "hover:bg-amber-500/10" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {plan.id === "gold" ? (
                    <Crown className="h-5 w-5 text-amber-400" />
                  ) : (
                    <Gem className="h-5 w-5 text-gray-300" />
                  )}
                  {plan.name}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </motion.div> */}

      {/* Plan Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid gap-6 sm:mx-4 sm:mr-20 xl:pr-6"
      >
        {/* Features Card */}
        <motion.div
          {...fade}
          className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-lg"
        >
          <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center gap-3">
              {selectedPlan === "gold" ? (
                <>
                  <Crown className="h-8 w-8 text-amber-400" />
                  <h3 className="text-2xl font-bold text-text">
                    {PLANS.find((p) => p.id === selectedPlan).name}
                  </h3>
                </>
              ) : (
                <>
                  <Gem className="h-8 w-8 text-text/80" />
                  <h3 className="text-2xl font-bold text-text">
                    {PLANS.find((p) => p.id === selectedPlan).name}
                  </h3>
                </>
              )}
            </div>

            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <ul className="space-y-3">
              {PLANS.find((p) => p.id === selectedPlan).features.map(
                (feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-text/90">{feature}</span>
                  </motion.li>
                ),
              )}
            </ul>
          </div>
        </motion.div>

        {/* Duration Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur-lg">
            <h3 className="mb-4 text-xl font-bold text-text">
              مدت زمان اشتراک
            </h3>
            <div className="flex gap-3">
              {[1, 3, 6].map((duration) => (
                <Button
                  key={duration}
                  variant={
                    selectedDuration === duration ? "default" : "outline"
                  }
                  onClick={() => setSelectedDuration(duration)}
                  className="flex-1"
                >
                  {duration} ماه
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          {...fade}
          className="rounded-xl border border-muted/30 bg-card/80 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <h3 className="mb-6 text-2xl font-bold text-text">
                خلاصه پرداخت
              </h3>

              <div className="space-y-4">
                {/* <div className="flex items-center justify-between">
                  <span className="text-text">نوع اشتراک:</span>
                  <span className="font-medium text-text">
                    {PLANS.find((p) => p.id === selectedPlan).name}
                  </span>
                </div> */}

                <div className="flex items-center justify-between">
                  <span className="text-text">مدت زمان:</span>
                  <span className="font-medium text-text">
                    {selectedDuration} ماه
                  </span>
                </div>

                <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-muted/30 to-transparent" />

                {selectedDuration > 1 && (
                  <div className="flex items-center justify-between">
                    <span className="text-text">قیمت اصلی:</span>
                    <span className="text-muted-foreground line-through">
                      {(
                        getPlanPrice(selectedPlan) * selectedDuration
                      ).toLocaleString("fa-IR")}{" "}
                      تومان
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-text">تخفیف:</span>
                  <span className="font-medium text-green-400 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                    {selectedDuration > 1 ? "10%" : "ندارد"}
                  </span>
                </div>

                <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-muted/30 to-transparent" />

                <div className="flex items-center justify-between">
                  <span className="text-lg text-text">مبلغ قابل پرداخت:</span>
                  <span className="text-2xl font-bold text-text">
                    {selectedDuration > 1
                      ? calculateDiscountPrice(
                          getPlanPrice(selectedPlan),
                          selectedDuration,
                        )
                      : (
                          getPlanPrice(selectedPlan) * selectedDuration
                        ).toLocaleString("fa-IR")}{" "}
                    تومان
                  </span>
                </div>
              </div>
            </div>

            <Button
              className={`mt-8 w-full gap-2 text-lg ${
                selectedPlan === "gold"
                  ? "bg-amber-600/90 hover:bg-amber-600"
                  : "bg-primary/90 hover:bg-primary"
              }`}
              size="lg"
              disabled={isPurchasing}
              asChild
            >
              <Link href="/dashboard/purchase">
                {isPurchasing ? (
                  <>در حال انتقال به درگاه پرداخت...</>
                ) : (
                  `خرید ${PLANS.find((p) => p.id === selectedPlan).name}`
                )}
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
