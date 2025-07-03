"use client";

import { Check, Zap, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export const PricingCard = ({
  title,
  price,
  duration,
  description,
  features,
  isPremium = false,
  isPurchasing = false,
  selectedDuration = 1,
  onDurationChange = () => {},
  actionText,
  actionHref,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col rounded-2xl border-2 p-8 shadow-lg ${
        isPremium
          ? "border-primary bg-white dark:bg-gray-800"
          : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
      }`}
    >
      <div className="flex items-center gap-3">
        {isPremium ? (
          <Rocket className="h-8 w-8 text-primary" />
        ) : (
          <Star className="h-8 w-8 text-blue-500" />
        )}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            {isPremium && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                پیشنهاد ویژه
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <div className="my-6">
        <span className="text-5xl font-bold text-gray-900 dark:text-white">
          {price}
        </span>
        {duration && (
          <span className="text-lg text-gray-500 dark:text-gray-400">
            / {duration}
          </span>
        )}
      </div>

      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {isPremium ? (
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            ) : (
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      {isPremium ? (
        <>
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              مدت زمان اشتراک
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[1, 3, 6].map((duration) => (
                <button
                  key={duration}
                  onClick={() => onDurationChange(duration)}
                  className={`rounded-xl py-3 text-sm font-medium transition-all ${
                    selectedDuration === duration
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  {duration} ماه
                </button>
              ))}
            </div>
          </div>

          <Button
            className="mt-auto h-14 w-full text-lg font-bold shadow-lg"
            size="lg"
            disabled={isPurchasing}
            asChild
          >
            <Link href={actionHref}>
              <span className="flex items-center gap-2">
                {isPurchasing ? "در حال انتقال به درگاه..." : actionText}
                {!isPurchasing && <Rocket className="h-5 w-5" />}
              </span>
            </Link>
          </Button>
        </>
      ) : (
        <Button
          variant="outline"
          className="mt-auto h-12 w-full text-lg"
          disabled={isPurchasing}
          asChild
        >
          <Link href={actionHref}>
            {isPurchasing ? "در حال پردازش..." : actionText}
          </Link>
        </Button>
      )}
    </motion.div>
  );
};
