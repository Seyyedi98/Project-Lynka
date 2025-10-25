import moment from "moment-jalaali";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { fade } from "@/utils/animation/animation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DateInput } from "rsuite";
import Toggle from "rsuite/Toggle";
import {
  Calendar,
  Clock,
  Crown,
  Info,
  AlertCircle,
  Keyboard,
  MousePointer,
} from "lucide-react";
import "rsuite/Toggle/styles/index.css";

const PremiumFeatureCard = ({ onUpgrade }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 rounded-lg border border-destructive bg-destructive/10 p-4 dark:border-destructive/50 dark:bg-destructive/5"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 dark:bg-destructive/10">
          <Crown className="h-4 w-4 text-destructive dark:text-destructive/80" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-destructive dark:text-destructive/90">
            قابلیت زمان‌بندی پیشرفته
          </h4>
          <p className="mt-1 text-xs text-destructive/80 dark:text-destructive/70">
            برای استفاده از نمایش زمان‌دار به اشتراک ویژه نیاز دارید.
          </p>
          <button
            onClick={onUpgrade}
            className="mt-2 rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-destructive/90"
          >
            ارتقا به اشتراک ویژه
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const DateDisplayPreview = ({ date }) => {
  if (!date) return null;

  const formatShamsiDate = (date) => {
    return moment(date).format("jYYYY/jMM/jDD - HH:mm");
  };

  const formatRemainingTime = (date) => {
    const now = new Date();
    const target = new Date(date);
    const diff = target - now;

    if (diff <= 0) {
      return "زمان به پایان رسیده";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days} روز و ${hours} ساعت باقی مانده`;
    } else if (hours > 0) {
      return `${hours} ساعت و ${minutes} دقیقه باقی مانده`;
    } else {
      return `${minutes} دقیقه باقی مانده`;
    }
  };
};

// Enhanced Date Input Component
const UserFriendlyDateInput = ({ value, onChange, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-3">
      {/* Input with enhanced styling */}
      <div
        className={`relative rounded-lg border-2 transition-all duration-200 ${
          isFocused
            ? "border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900"
            : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
        }`}
      >
        <DateInput
          value={value}
          onChange={onChange}
          dir="ltr"
          format="yyyy/MM/dd HH:mm"
          placeholder={placeholder}
          className="w-full border-0 px-10 py-3 text-sm focus:ring-0 dark:bg-gray-800 dark:text-white"
        />

        {/* Calendar Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Calendar className="h-4 w-4 text-gray-400" />
        </div>

        {/* Clock Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Clock className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Input Guide */}
      <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
        <div className="mb-2 flex items-center gap-2">
          <Keyboard className="h-4 w-4 text-gray-500" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            راهنمای ورود تاریخ
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <span>فرمت صحیح:</span>
            <code className="rounded bg-white px-2 py-1 font-mono text-gray-800 dark:bg-gray-600 dark:text-gray-200">
              1403/01/15 14:30
            </code>
          </div>
        </div>
      </div>

      {/* Quick Format Examples */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
        <div className="mb-2 flex items-center gap-2">
          <Info className="h-4 w-4 text-green-600" />
          <span className="text-xs font-medium text-green-800 dark:text-green-300">
            نمونه‌های فرمت صحیح
          </span>
        </div>
        <div className="space-y-1 text-xs text-green-700 dark:text-green-400">
          <div className="flex justify-between">
            <span>امروز ساعت ۱۴:۳۰:</span>
            <code className="font-mono">1403/01/15 14:30</code>
          </div>
          <div className="flex justify-between">
            <span>فردا ساعت ۹:۰۰:</span>
            <code className="font-mono">1403/01/16 09:00</code>
          </div>
          <div className="flex justify-between">
            <span>پس‌فردا ساعت ۲۳:۴۵:</span>
            <code className="font-mono">1403/01/17 23:45</code>
          </div>
        </div>
      </div>
    </div>
  );
};

const ElementCountdownFormField = ({
  form,
  isPremium,
  countdownData,
  showToggle,
  onUpgrade,
}) => {
  const { countdownDate, countdown } = countdownData;

  // Adjust date for timezone offset - KEEPING ORIGINAL LOGIC
  const adjustedCountdownDate = new Date(countdownDate);
  adjustedCountdownDate.setHours(adjustedCountdownDate.getHours() - 3);
  adjustedCountdownDate.setMinutes(adjustedCountdownDate.getMinutes() - 26);

  const [startDate, setStartDate] = useState(adjustedCountdownDate);

  // KEEPING ORIGINAL LOGIC
  const handleChange = (date) => {
    const shamsiDate = moment(date).format("jYYYY/jMM/jDD HH:mm");
    const adjustedDate = new Date(date);
    adjustedDate.setHours(adjustedDate.getHours() + 3);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + 26);
    const isoDate = adjustedDate.toISOString();
    setStartDate(date);
    form.setValue("countdownDate", isoDate);
  };

  let isCountdownActive = countdownData;
  if (form.watch("countdown") !== undefined) {
    isCountdownActive = form.watch("countdown");
  }

  const currentCountdownDate = form.watch("countdownDate");

  return (
    <div className="space-y-4">
      {/* Countdown Toggle */}
      {showToggle && (
        <FormField
          control={form.control}
          name="countdown"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 rounded-xl border px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                      نمایش زمان‌دار
                    </Label>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      این بلوک را تا تاریخ مشخص‌شده نمایش دهید
                    </p>
                  </div>
                </div>
                <FormControl>
                  <div className="flex items-center gap-3">
                    {!isPremium && <Crown className="h-5 w-5 text-amber-500" />}
                    <Toggle
                      dir="rtl"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={!isPremium}
                      color="blue"
                    />
                  </div>
                </FormControl>
              </div>

              {!isPremium && (
                <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    برای فعال‌سازی نمایش زمان‌دار، اشتراک ویژه لازم است
                  </p>
                </div>
              )}
            </FormItem>
          )}
        />
      )}

      {/* Date Picker */}
      {isPremium ? (
        <AnimatePresence>
          {(isCountdownActive || !showToggle) && (
            <motion.div
              key="countdown"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <FormField
                  control={form.control}
                  name="countdownDate"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <div>
                        <Label className="mb-3 flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          انتخاب تاریخ و ساعت نمایش
                        </Label>
                        <FormControl>
                          <UserFriendlyDateInput
                            value={startDate}
                            onChange={handleChange}
                            placeholder="دقیقه:ساعت  روز/ماه/سال"
                          />
                        </FormControl>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Date Preview */}
              {currentCountdownDate && (
                <DateDisplayPreview date={currentCountdownDate} />
              )}

              {/* Help Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20"
              >
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      نکات مهم
                    </h4>
                    <ul className="mt-2 space-y-2 text-xs text-amber-700 dark:text-amber-400">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        تاریخ را به فرمت <strong>شمسی</strong> وارد کنید
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        کیبورد باید روی <strong>زبان انگلیسی</strong> باشد
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        برای ساعت‌های تک رقمی از صفر استفاده کنید (۰۹:۰۰)
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <PremiumFeatureCard onUpgrade={onUpgrade} />
      )}
    </div>
  );
};

export default ElementCountdownFormField;
