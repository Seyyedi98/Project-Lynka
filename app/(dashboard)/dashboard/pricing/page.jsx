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
import getSubscriptionDiscount from "@/utils/getSubscriptionDiscount";
import getSubscriptionPrice from "@/utils/getSubscriptionPrice";
import { motion } from "framer-motion";
import { Check, Gem, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Pricing() {
  const [selectedDuration, setSelectedDuration] = useState(3); // Default to 3 months
  const premiumPlan = PLANS.find((p) => p.id === "silver");

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
      <div className="grid gap-8 sm:mx-4 sm:mr-20 lg:grid-cols-2 xl:pr-6">
        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="group relative flex flex-col rounded-2xl border border-gray-200/50 bg-white/95 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/95"
        >
          {/* Free Badge */}

          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-2 dark:bg-blue-900/30">
              <Gem className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                رایگان
              </h3>
              <p className="text-gray-500 dark:text-gray-400">برای شروع</p>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              رایگان
            </span>
          </div>

          <ul className="my-6 flex-1 space-y-4">
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                ۱ صفحه شخصی
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                تم های پایه
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                بلوک‌های اصلی
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative flex flex-col rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-primary/20 dark:from-primary/10 dark:to-purple-500/10"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 p-2">
              <Rocket className="h-8 w-8 text-primary dark:text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {premiumPlan.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">حرفه‌ای</p>
            </div>
          </div>

          {/* Price Display */}
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {new Intl.NumberFormat("fa-IR").format(
                getSubscriptionPrice("silver", selectedDuration),
              )}
            </span>
            <span className="text-gray-500 dark:text-gray-400">تومان</span>
            {selectedDuration > 1 && (
              <span className="mr-auto rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                {new Intl.NumberFormat("fa-IR").format(
                  getSubscriptionDiscount("silver", selectedDuration),
                )}
                ٪ ارزان تر
              </span>
            )}
          </div>

          <ul className="mb-6 flex-1 space-y-4">
            {premiumPlan.features.slice(0, 5).map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Duration Selector */}
          <div className="my-4">
            <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              مدت زمان اشتراک:
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[1, 3, 6].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={`rounded-xl py-3 text-sm font-medium transition-all duration-200 ${
                    selectedDuration === duration
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-white text-gray-900 shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  {duration} ماه
                </button>
              ))}
            </div>
          </div>

          <Button
            asChild
            className="mt-auto w-full bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/25 transition-all duration-200 hover:from-primary/90 hover:to-purple-600/90 hover:shadow-primary/40"
          >
            <Link
              href={`/purchase/price?plan=silver&duration=${selectedDuration}`}
            >
              <Rocket className="ml-2 h-4 w-4" />
              ارتقا به پلن حرفه‌ای
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-16 sm:mx-4 sm:mr-20 xl:pr-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            مقایسه امکانات
          </h2>
          <p className="mx-auto max-w-2xl border-gray-600/50 dark:text-gray-300">
            تمام ویژگی‌های پلن‌های مختلف را مقایسه کنید و بهترین گزینه را برای
            نیازهای خود انتخاب نمایید
          </p>
        </motion.div>

        <div className="rounded-2xl border border-gray-200/50 bg-white/95 p-6 shadow-xl backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/95">
          <Table dir="rtl">
            <TableHeader className="bg-gradient-to-r from-primary/5 to-purple-500/5">
              <TableRow className="border-b-2 border-primary/20">
                <TableHead className="min-w-[200px] py-4 text-start text-lg font-bold text-gray-900 dark:text-white">
                  ویژگی‌ها
                </TableHead>
                <TableHead className="min-w-[120px] py-4 text-center text-lg font-bold text-gray-900 dark:text-white">
                  رایگان
                </TableHead>
                <TableHead className="min-w-[120px] py-4 text-center text-lg font-bold text-primary dark:text-primary">
                  {premiumPlan.name}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, index) => (
                <TableRow
                  key={feature.name}
                  className={`border-b border-border/40 transition-colors hover:bg-accent/30 ${
                    index % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-700/20" : ""
                  }`}
                >
                  <TableCell className="py-4 text-start font-medium text-gray-900 dark:text-white">
                    {feature.name}
                  </TableCell>
                  <TableCell className="py-4 text-center text-gray-600 dark:text-gray-400">
                    {feature.free}
                  </TableCell>
                  <TableCell className="py-4 text-center font-semibold text-primary dark:text-primary">
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
