import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fade } from "@/utils/animation/animation";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "rsuite";
import { Clock, ChevronUp, ChevronDown, Crown, Info } from "lucide-react";
import { useState, useEffect } from "react";

const TimePickerInput = ({
  value,
  onChange,
  placeholder,
  min,
  max,
  label,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleIncrement = () => {
    setHasInteracted(true);
    const currentValue = parseInt(value) || min;
    if (currentValue < max) {
      onChange((currentValue + 1).toString());
    }
  };

  const handleDecrement = () => {
    setHasInteracted(true);
    const currentValue = parseInt(value) || min;
    if (currentValue > min) {
      onChange((currentValue - 1).toString());
    }
  };

  const handleInputChange = (e) => {
    setHasInteracted(true);
    const newValue = e.target.value;
    if (
      newValue === "" ||
      (parseInt(newValue) >= min && parseInt(newValue) <= max)
    ) {
      onChange(newValue);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    const numValue = parseInt(e.target.value);
    if (isNaN(numValue)) {
      onChange(min.toString());
    } else if (numValue < min) {
      onChange(min.toString());
    } else if (numValue > max) {
      onChange(max.toString());
    }
  };

  const getDisplayValue = () => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return "";
    return `${numValue.toString().padStart(2, "0")}:00`;
  };

  return (
    <FormItem className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Clock className="h-4 w-4 text-gray-600" />
        {label}
      </Label>

      <div className="relative">
        <div
          className={`relative rounded-md border transition-all duration-200 ${
            isFocused
              ? "border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900"
              : error
                ? "border-red-300 dark:border-red-400"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
          }`}
        >
          <Input
            value={value}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            type="number"
            min={min}
            max={max}
            className="w-full border-0 px-3 py-2 pr-12 text-sm [appearance:textfield] focus:ring-0 dark:bg-gray-800 dark:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          {/* Time display preview */}
          {value && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="rounded bg-blue-50 px-2 py-1 dark:bg-blue-900/30">
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  {getDisplayValue()}
                </span>
              </div>
            </div>
          )}

          {/* Control buttons */}
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-0.5">
            <button
              type="button"
              onClick={handleIncrement}
              disabled={parseInt(value || min) >= max}
              className="flex h-4 w-4 items-center justify-center rounded-sm transition-colors hover:bg-gray-100 disabled:opacity-30 dark:hover:bg-gray-700"
            >
              <ChevronUp className="h-3 w-3 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={parseInt(value || min) <= min}
              className="flex h-4 w-4 items-center justify-center rounded-sm transition-colors hover:bg-gray-100 disabled:opacity-30 dark:hover:bg-gray-700"
            >
              <ChevronDown className="h-3 w-3 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {error && <FormMessage />}
    </FormItem>
  );
};

const TimeRangeDisplay = ({ start, end }) => {
  if (!start && !end) return null;

  const formatTime = (time) => {
    const hour = parseInt(time) || 0;
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  const isValidRange = parseInt(start) < parseInt(end);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-blue-700 dark:text-blue-300">
          بازه زمانی فعال:
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded border bg-white px-2 py-1 font-mono text-blue-800 dark:bg-gray-800 dark:text-blue-300">
            {formatTime(start)}
          </span>
          <span className="text-blue-600 dark:text-blue-400">تا</span>
          <span className="rounded border bg-white px-2 py-1 font-mono text-blue-800 dark:bg-gray-800 dark:text-blue-300">
            {formatTime(end)}
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
        {isValidRange ? (
          <span>
            ✓ بلوک از ساعت {formatTime(start)} تا {formatTime(end)} نمایش داده
            می‌شود
          </span>
        ) : (
          <span className="text-amber-600 dark:text-amber-400">
            ⚠ ساعت شروع باید قبل از ساعت پایان باشد
          </span>
        )}
      </div>
    </motion.div>
  );
};

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
            قابلیت زمان‌بندی
          </h4>
          <p className="mt-1 text-xs text-destructive/80 dark:text-destructive/70">
            برای استفاده از این قابلیت به اشتراک ویژه نیاز دارید.
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

const ElementScheduleFormField = ({
  form,
  isPremium,
  scheduleData,
  onUpgrade,
}) => {
  const [isScheduleActive, setIsScheduleActive] = useState(
    scheduleData.schedule,
  );

  // Watch form values
  const scheduleValue = form.watch("schedule");
  const scheduleStart = form.watch("scheduleStart");
  const scheduleEnd = form.watch("scheduleEnd");

  // Update local state when form value changes
  useEffect(() => {
    if (scheduleValue !== undefined) {
      setIsScheduleActive(scheduleValue);
    }
  }, [scheduleValue]);

  return (
    <div className="space-y-4">
      {/* Schedule Toggle */}
      <FormField
        control={form.control}
        name="schedule"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 rounded-xl border px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label
                  className="flex items-center gap-2 text-sm font-medium dark:text-white"
                  htmlFor="schedule-toggle"
                >
                  <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  زمان‌بندی نمایش بلوک
                </Label>
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  نمایش بلوک فقط در ساعات مشخص‌شده از روز فعال خواهد بود.
                </p>
              </div>
              <FormControl>
                <Toggle
                  dir="rtl"
                  checked={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    setIsScheduleActive(value);
                  }}
                  aria-readonly
                  disabled={!isPremium}
                  color="blue"
                />
              </FormControl>
            </div>
          </FormItem>
        )}
      />

      {/* Schedule Configuration */}
      {isPremium ? (
        <AnimatePresence>
          {isScheduleActive && (
            <motion.div
              key="schedule"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="mt-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="scheduleStart"
                  render={({ field, fieldState }) => (
                    <TimePickerInput
                      {...field}
                      label="ساعت شروع"
                      placeholder="0"
                      min={0}
                      max={23}
                      error={fieldState.error}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="scheduleEnd"
                  render={({ field, fieldState }) => (
                    <TimePickerInput
                      {...field}
                      label="ساعت پایان"
                      placeholder="24"
                      min={1}
                      max={24}
                      error={fieldState.error}
                    />
                  )}
                />
              </div>

              {(scheduleStart || scheduleEnd) && (
                <TimeRangeDisplay start={scheduleStart} end={scheduleEnd} />
              )}

              {/* Help Card */}
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-900/20">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      راهنمای زمان‌بندی
                    </h4>
                    <ul className="mt-1 space-y-1 text-xs text-amber-700 dark:text-amber-400">
                      <li>• ساعت شروع باید قبل از ساعت پایان باشد</li>
                      <li>• ساعت ۰ نشان‌دهنده نیمه‌شب است</li>
                      <li>• ساعت ۲۴ نشان‌دهنده پایان روز است</li>
                      <li>• بلوک فقط در این بازه زمانی نمایش داده می‌شود</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <PremiumFeatureCard onUpgrade={onUpgrade} />
      )}
    </div>
  );
};

export default ElementScheduleFormField;
