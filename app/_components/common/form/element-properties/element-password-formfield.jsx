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
import { useEffect } from "react";
import { Toggle } from "rsuite";

const ElementPasswordFormField = ({ form, isPremium, passwordData }) => {
  let isProtected = passwordData.isProtected;
  if (form.watch("password") !== undefined) {
    isProtected = form.watch("isProtected");
  }
  useEffect(() => form.setValue("password", ""), [form]);

  return (
    <>
      <FormField
        control={form.control}
        name="isProtected"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
            <div className="flex flex-col gap-2">
              <Label htmlFor="schedule-toggle">لینک محافظت شده</Label>
              <p className="text-textLight text-wrap text-xs">
                دسترسی به لینک تنها با وارد کردن رمز عبور
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
          </FormItem>
        )}
      />

      {isPremium ? (
        <AnimatePresence>
          {isProtected && (
            <motion.div
              key="password"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="mt-2 flex items-center justify-center gap-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="رمز"
                        max="12"
                        min="0"
                        type="password"
                        onKeyDown={(e) => {
                          if (e.key === " ") {
                            e.preventDefault();
                          }
                        }}
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

export default ElementPasswordFormField;
