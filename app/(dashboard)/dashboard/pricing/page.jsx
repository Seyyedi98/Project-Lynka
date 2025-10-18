"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PLANS } from "@/data/prices";
import { motion } from "framer-motion";
import { Check, Gem, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Pricing() {
  const [selectedDuration, setSelectedDuration] = useState(3); // Default to 3 months
  const [isPurchasing, setIsPurchasing] = useState(false);
  const premiumPlan = PLANS.find((p) => p.id === "silver");

  const getPremiumPrice = () => {
    const monthlyPrice = 90000;
    switch (selectedDuration) {
      case 1:
        return monthlyPrice;
      case 3:
        return 240000; // 20% deiscount
      case 6:
        return 390000; // 30% deiscount
      default:
        return monthlyPrice * 3;
    }
  };

  const features = [
    { name: "تعداد صفحات", free: "۱ صفحه", premium: "۳ صفحه" },
    {
      name: "دسترسی نامحدود به تم ها",
      free: "تم های ساده",
      premium: "تم‌های پیشرفته",
    },
    { name: "شخصی‌سازی  پیشرفته بلوک‌ها", free: "—", premium: "✓" },
    { name: "زمان‌بندی محتوا", free: "—", premium: "✓" },
    { name: "رمزگزاری لینک ها", free: "—", premium: "✓" },
    { name: "ساخت فرم", free: "—", premium: "✓" },
    { name: "ایجاد قرعه کشی", free: "—", premium: "✓" },
    {
      name: "شخصی سازی لینک منتشر شده در شبکه های اجتماعی",
      free: "—",
      premium: "✓",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 sm:mx-4 sm:mr-20 xl:pr-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          {premiumPlan.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-white"
        >
          امکانات ویژه برای نیازهای حرفه‌ای شما
        </motion.p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 sm:mx-4 sm:mr-20 lg:grid-cols-2 xl:pr-6">
        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col rounded-xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/90"
        >
          <div className="flex items-center gap-3">
            <Gem className="h-7 w-7 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              رایگان
            </h3>
          </div>

          <ul className="my-6 space-y-3">
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                ۱ صفحه شخصی
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                تم های پایه
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                بلوک‌های اصلی
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col rounded-xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/90"
        >
          <div className="flex items-center gap-3">
            <Rocket className="h-7 w-7 text-primary" />
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {premiumPlan.name}
              </h3>
            </div>
          </div>

          {/* Price Display */}
          <div className="my-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {getPremiumPrice().toLocaleString("fa-IR")}
            </span>
            <span className="text-gray-500 dark:text-gray-400">تومان</span>
            {selectedDuration > 1 && (
              <span className="ml-2 text-sm text-green-500">
                ({selectedDuration === 3 ? "۱۰%" : "۱۵%"} تخفیف)
              </span>
            )}
          </div>

          <ul className="mb-6 space-y-3">
            {premiumPlan.features.slice(0, 5).map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Zap className="mt-0.5 h-5 w-5 text-primary" />
                <span className="text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Duration Selector */}
          <div className="my-3">
            <div className="grid grid-cols-3 gap-2">
              {[1, 3, 6].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                    selectedDuration === duration
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  {duration} ماه
                </button>
              ))}
            </div>
          </div>

          <Button asChild className="mt-auto bg-primary hover:bg-primary/90">
            <Link
              href={`/purchase/price?plan=silver&duration=${selectedDuration}`}
            >
              خرید
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-12 sm:mx-4 sm:mr-20 xl:pr-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 text-2xl font-bold text-gray-900 dark:text-white"
        >
          مقایسه امکانات
        </motion.h2>

        <div className="rounded-lg border border-gray-200 bg-white/90 p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800/90">
          <Table dir="rtl">
            <TableHeader className="text-textLight text-sm font-semibold">
              <TableRow>
                <TableHead className="min-w-[120px] text-start"></TableHead>
                <TableHead className="min-w-[50px] text-center">
                  رایگان
                </TableHead>
                <TableHead className="min-w-[50px] text-center">
                  {premiumPlan.name}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow
                  key={feature.name}
                  className="border-b border-border/40 hover:bg-accent/30"
                >
                  <TableCell className="text-start font-medium">
                    {feature.name}
                  </TableCell>
                  <TableCell className="text-textLight text-center">
                    {feature.free}
                  </TableCell>
                  <TableCell className="text-center text-primary">
                    {feature.premium}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
