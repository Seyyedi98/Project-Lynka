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

const ElementScheduleFormField = ({ form, isPremium, scheduleData }) => {
  let isScheduleActive = scheduleData.schedule;
  if (form.watch("schedule") !== undefined) {
    isScheduleActive = form.watch("schedule");
  }

  return (
    <>
      <FormField
        control={form.control}
        name="schedule"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 rounded-xl border px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label
                  className="text-sm font-medium"
                  htmlFor="schedule-toggle"
                >
                  زمان‌بندی نمایش بلوک
                </Label>
                <p className="text-xs text-muted-foreground">
                  نمایش بلوک فقط در ساعات مشخص‌شده از روز فعال خواهد بود.
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
        )}
      />

      {isPremium ? (
        <AnimatePresence>
          {isScheduleActive && (
            <motion.div
              key="schedule"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="scheduleStart"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-1 block text-sm font-medium">
                      ساعت شروع
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ساعت شروع"
                        type="number"
                        min="0"
                        max="24"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduleEnd"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-1 block text-sm font-medium">
                      ساعت پایان
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ساعت پایان"
                        type="number"
                        min="0"
                        max="24"
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

export default ElementScheduleFormField;
