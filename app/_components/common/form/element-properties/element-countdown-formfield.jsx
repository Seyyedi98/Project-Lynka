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
  isSilver,
  countdownData,
  showToggle,
}) => {
  const { countdownDate, countdown } = countdownData;

  const adjustedCountdownDate = new Date(countdownDate);
  adjustedCountdownDate.setHours(adjustedCountdownDate.getHours() - 3);
  adjustedCountdownDate.setMinutes(adjustedCountdownDate.getMinutes() - 26);

  const [startDate, setStartDate] = useState(adjustedCountdownDate);

  const handleChange = (date) => {
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
            <FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
              <div className="flex flex-col gap-2">
                <Label htmlFor="schedule-toggle">شمارش معکوس</Label>
                <p className="text-textLight text-wrap text-xs">
                  بلوک تا تاریخ مشخض شده پنهان می ماند
                </p>
              </div>
              <FormControl>
                <Toggle
                  dir="rtl"
                  checked={field.value}
                  onChange={field.onChange}
                  aria-readonly
                  disabled={!isSilver}
                  color="blue"
                />
              </FormControl>
            </FormItem>
          )
        }
      />

      {isSilver ? (
        <AnimatePresence>
          {(isCountdownActive || !showToggle) && (
            <motion.div
              key="countdown"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="mt-2 flex items-center justify-center gap-4"
            >
              <FormField
                control={form.control}
                name="countdownDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <DateInput
                        {...field}
                        value={startDate}
                        onChange={handleChange}
                        dir="ltr"
                        format="yyyy/MM/dd HH:mm"
                        placeholder="دقیقه:ساعت  روز/ماه/سال"
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
        <p className="mt-2 text-sm text-destructive">
          برای استفاده ای این قابلیت به اشتراک ویژه نیاز دارید
        </p>
      )}
    </>
  );
};

export default ElementCountdownFormField;
