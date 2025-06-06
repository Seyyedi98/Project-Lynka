import moment from "moment-jalaali"; // Import moment-jalaali for Shamsi dates
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
import "rsuite/Toggle/styles/index.css";

const ElementCountdownFormField = ({
  form,
  isPremium,
  countdownData,
  showToggle,
}) => {
  const { countdownDate, countdown } = countdownData;

  // Adjust date for timezone offset
  const adjustedCountdownDate = new Date(countdownDate);
  adjustedCountdownDate.setHours(adjustedCountdownDate.getHours() - 3);
  adjustedCountdownDate.setMinutes(adjustedCountdownDate.getMinutes() - 26);

  const [startDate, setStartDate] = useState(adjustedCountdownDate);

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

  return (
    <>
      <FormField
        control={form.control}
        name="countdown"
        render={({ field }) =>
          showToggle && (
            <FormItem className="flex flex-col gap-2 rounded-xl border px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label
                    className="text-sm font-medium"
                    htmlFor="schedule-toggle"
                  >
                    نمایش از تاریخ
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    بلوک تا تاریخ مشخص‌شده پنهان می‌ماند.
                  </p>
                </div>
                <FormControl>
                  <Toggle
                    dir="rtl"
                    checked={field.value}
                    onChange={field.onChange}
                    aria-readonly
                    disabled={!isPremium}
                    color="blue"
                  />
                </FormControl>
              </div>
            </FormItem>
          )
        }
      />

      {isPremium ? (
        <AnimatePresence>
          {(isCountdownActive || !showToggle) && (
            <motion.div
              key="countdown"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="mt-4"
            >
              <FormField
                control={form.control}
                name="countdownDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label className="mb-1 block text-sm font-medium">
                      انتخاب تاریخ شروع نمایش
                    </Label>
                    <FormControl>
                      <DateInput
                        {...field}
                        value={startDate}
                        onChange={handleChange}
                        dir="ltr"
                        format="yyyy/MM/dd HH:mm"
                        placeholder="دقیقه:ساعت  روز/ماه/سال"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className="mt-4 rounded-md border border-destructive bg-destructive/10 px-4 py-2 text-sm text-destructive">
          برای استفاده از این قابلیت به اشتراک ویژه نیاز دارید.
        </div>
      )}
    </>
  );
};

export default ElementCountdownFormField;
