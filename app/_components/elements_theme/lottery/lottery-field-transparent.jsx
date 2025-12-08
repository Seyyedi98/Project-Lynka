"use client";

import {
  getLotteryData,
  submitLotteryParticipation,
} from "@/actions/lottery/lottery";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { loadFont } from "@/utils/loadFont";
import { AnimatePresence, motion } from "framer-motion";

const LotteryFieldTransparent = (props) => {
  const {
    bgColor,
    borderRadius,
    borderColor,
    cardBorderRadius,
    font,
    title,
    textColor,
    lotteryId,
    isPremium,
    isLive,
  } = props;
  const [hasParticipated, setHasParticipated] = useState(false);
  const [loadedFont, setLoadedFont] = useState(null);
  const [showWinnersModal, setShowWinnersModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lotteryData, setLotteryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getLotteryData(lotteryId);
        setLotteryData(data);

        // Check local storage for participation
        const participatedLotteries = JSON.parse(
          localStorage.getItem("participatedLotteries") || "[]",
        );
        setHasParticipated(participatedLotteries.includes(lotteryId));
      } catch (error) {
        console.error("Error loading lottery data:", error);
        toast.error("خطا در دریافت اطلاعات قرعه کشی");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [lotteryId]);

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const fontVariable = await loadFont(font);
        setLoadedFont(fontVariable);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };
    fetchFont();
  }, [font]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await submitLotteryParticipation({
        lotteryId,
        firstName: data.firstName,
        lastName: data.lastName,
        contactInfo: data.contactInfo,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Update local storage
      const participatedLotteries = JSON.parse(
        localStorage.getItem("participatedLotteries") || "[]",
      );
      if (!participatedLotteries.includes(lotteryId)) {
        localStorage.setItem(
          "participatedLotteries",
          JSON.stringify([...participatedLotteries, lotteryId]),
        );
      }

      setHasParticipated(true);
      toast.success("شما با موفقیت در قرعه کشی شرکت کردید!");
      reset();
    } catch (error) {
      toast.error(error.message || "خطا در ثبت اطلاعات");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          {/* React Icons Spinner with black border */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </motion.div>

          {/* Loading text */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              در حال دریافت اطلاعات قرعه کشی...
            </p>
            <p className="mt-1 text-xs text-gray-500">لطفاً شکیبا باشید</p>
          </div>

          {/* Minimal dots animation */}
          <div className="flex space-x-1">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-gray-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-gray-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-gray-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="relative w-full">
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      </div>
    );
  }

  const isActive = lotteryData?.isActive;
  const winners = lotteryData?.winners || [];

  if (isLive && !isActive && winners?.length > 0) {
    return (
      <div className="w-full text-center">
        <div
          style={{ borderRadius: cardBorderRadius, borderColor: borderColor }}
          className="flex w-full flex-col border"
        >
          <p className="py-2">قرعه کشی به پایان رسیده است</p>
          <button
            style={{
              backgroundColor: bgColor,
              borderBottomRightRadius: cardBorderRadius,
              borderBottomLeftRadius: cardBorderRadius,
            }}
            onClick={() => setShowWinnersModal(true)}
            className="mt-2 rounded-b-md px-4 py-2 text-white transition-opacity duration-300 hover:opacity-85"
          >
            مشاهده برندگان
          </button>
        </div>
        {showWinnersModal && (
          <AnimatePresence>
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            >
              <motion.div
                key="modal-content"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="w-full max-w-md rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">
                    لیست برندگان قرعه کشی
                  </h3>
                  <button
                    onClick={() => setShowWinnersModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {winners
                    .filter((winner) => winner.position === 1)
                    .map((winner, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center rounded-xl bg-white p-4 shadow-sm"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white">
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <div className="mr-3 text-right">
                          <h4 className="font-semibold text-gray-800">
                            {winner.firstName} {winner.lastName}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowWinnersModal(false)}
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3 font-medium text-white shadow-lg hover:from-blue-600 hover:to-blue-700"
                >
                  بستن
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  }

  if (isLive && !isActive) {
    return (
      <div className="p-4 text-center">
        <p>قرعه کشی به پایان رسیده است</p>
        <p className="mt-2">برنده ای وجود ندارد</p>
      </div>
    );
  }

  if (hasParticipated && isLive) {
    return (
      <div className="p-4 text-center">
        <p>شما قبلاً در این قرعه کشی شرکت کرده اید</p>
        <p className="mt-2">نتایج پس از پایان قرعه کشی اعلام خواهد شد</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isPremium && "opacity-70",
        )}
      >
        <div
          style={{
            color: textColor,
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          }}
          className="mb-2 text-center text-lg"
        >
          {title}
        </div>
        <div
          style={{
            borderRadius: cardBorderRadius,
            color: textColor,
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          }}
          className="h-full w-full"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div className="mb-4">
              <label
                style={{
                  color: textColor,
                  fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                }}
                className="mb-2 mr-1 block text-sm font-medium"
              >
                نام
              </label>
              <input
                {...register("firstName", { required: "نام الزامی است" })}
                style={{
                  borderRadius: borderRadius,
                  borderColor: borderColor,
                  fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                }}
                className="h-12 w-full rounded-md border-2 bg-transparent px-2"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                style={{
                  color: textColor,
                  fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                }}
                className="mb-2 mr-1 block text-sm font-medium"
              >
                نام خانوادگی
              </label>
              <input
                {...register("lastName", {
                  required: "نام خانوادگی الزامی است",
                })}
                style={{
                  borderRadius: borderRadius,
                  borderColor: borderColor,
                  fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                }}
                className="h-12 w-full rounded-md border-2 bg-transparent px-2"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div className="mb-4">
              <label
                style={{
                  color: textColor,
                  fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                }}
                className="mb-2 mr-1 block text-sm font-medium"
              >
                شماره موبایل
              </label>
              <input
                {...register("contactInfo", {
                  required: "اطلاعات تماس الزامی است",
                  validate: (value) =>
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                    /^(\+98|0)?9\d{9}$/.test(value) ||
                    "لطفاً ایمیل یا شماره موبایل معتبر وارد کنید",
                })}
                style={{
                  borderRadius: borderRadius,
                  borderColor: borderColor,
                  fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                }}
                className="h-12 w-full rounded-md border-2 bg-transparent px-2"
              />
              {errors.contactInfo && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.contactInfo.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{
                borderRadius: borderRadius,
                backgroundColor: bgColor,
                fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
              }}
              className="mt-4 w-full border-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  در حال ارسال...
                </span>
              ) : (
                "ارسال"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LotteryFieldTransparent;
