import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { fade } from "@/utils/animation/animation";
import { AnimatePresence, motion } from "framer-motion";

const ElementScheduleFormField = ({ form, isSilver, scheduleState }) => {
  let isScheduleActive = scheduleState;
  if (form.watch("schedule") !== undefined) {
    isScheduleActive = form.watch("schedule");
  }

  return (
    <>
      <FormField
        control={form.control}
        name="schedule"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="flex flex-col gap-2">
              <Label htmlFor="schedule-toggle">زمان بندی نمایش بلوک</Label>
              <p className="text-wrap text-xs text-textLight">
                نمایش بلوک در ساعات خاصی از روز
              </p>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-readonly
                disabled={!isSilver}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {isSilver ? (
        <AnimatePresence>
          {isScheduleActive && (
            <motion.div
              key="schedule"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="mt-2 flex items-center justify-center gap-4"
            >
              <FormField
                control={form.control}
                name="scheduleStart"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ساعت شروع"
                        type="number"
                        max="24"
                        min="0"
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
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="ساعت پایان"
                        type="number"
                        max="24"
                        min="0"
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

export default ElementScheduleFormField;
