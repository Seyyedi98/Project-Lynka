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
import { useEffect, useState } from "react";
import { Toggle } from "rsuite";
import { Lock, Crown, Eye, EyeOff, Shield, Key } from "lucide-react";

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
            قابلیت محافظت با رمز عبور
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

const PasswordStrengthIndicator = ({ password }) => {
  if (!password) return null;

  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) score++;
    if (pass.match(/\d/)) score++;
    if (pass.match(/[^a-zA-Z\d]/)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabels = ["خیلی ضعیف", "ضعیف", "متوسط", "قوی", "خیلی قوی"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-2 space-y-2"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600 dark:text-gray-400">سطح امنیت رمز:</span>
        <span
          className={`font-medium ${
            strength < 2
              ? "text-red-600"
              : strength < 3
                ? "text-orange-600"
                : strength < 4
                  ? "text-yellow-600"
                  : "text-green-600"
          }`}
        >
          {strengthLabels[strength]}
        </span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all ${
              index <= strength
                ? strengthColors[strength]
                : "bg-gray-200 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const ElementPasswordFormField = ({
  form,
  isPremium,
  passwordData,
  onUpgrade,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  let isProtected = passwordData.isProtected;
  if (form.watch("isProtected") !== undefined) {
    isProtected = form.watch("isProtected");
  }

  // Clear password when protection is disabled
  useEffect(() => {
    if (!isProtected) {
      form.setValue("password", "");
      setPassword("");
    }
  }, [isProtected, form]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    form.setValue("password", value);
  };

  return (
    <div className="space-y-4">
      {/* Protection Toggle */}
      <FormField
        control={form.control}
        name="isProtected"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 rounded-xl border px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                    محافظت با رمز عبور
                  </Label>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    دسترسی به این بخش را با رمز عبور محدود کنید
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
                  برای فعال‌سازی محافظت با رمز عبور، اشتراک ویژه لازم است
                </p>
              </div>
            )}
          </FormItem>
        )}
      />

      {/* Password Input */}
      {isPremium ? (
        <AnimatePresence>
          {isProtected && (
            <motion.div
              key="password"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <div>
                        <Label className="mb-3 flex items-center gap-2 text-sm font-medium">
                          <Key className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          رمز عبور را وارد کنید
                        </Label>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              value={password}
                              onChange={handlePasswordChange}
                              placeholder="رمز عبور خود را وارد کنید..."
                              type={showPassword ? "text" : "password"}
                              maxLength={12}
                              className="w-full rounded-md border border-gray-300 px-10 py-2.5 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                            />

                            {/* Lock Icon */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <Lock className="h-4 w-4 text-gray-400" />
                            </div>

                            {/* Show/Hide Password Toggle */}
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>

                        {/* Password Strength Indicator */}
                        <PasswordStrengthIndicator password={password} />

                        {/* Password Requirements */}
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            نکات امنیتی رمز عبور:
                          </p>
                          <ul className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                              <div
                                className={`h-1.5 w-1.5 rounded-full ${
                                  password.length >= 8
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                              />
                              حداقل ۸ کاراکتر
                            </li>
                            <li className="flex items-center gap-2">
                              <div
                                className={`h-1.5 w-1.5 rounded-full ${
                                  password.match(/[a-zA-Z]/) &&
                                  password.match(/\d/)
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                              />
                              ترکیب حروف و اعداد
                            </li>
                          </ul>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Security Tips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20"
              >
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      نکات امنیتی
                    </h4>
                    <ul className="mt-2 space-y-2 text-xs text-amber-700 dark:text-amber-400">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        رمز عبور قوی و منحصر به فرد انتخاب کنید
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        از به اشتراک گذاری رمز عبور خودداری کنید
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        رمز عبور را در جای امن یادداشت کنید
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

export default ElementPasswordFormField;
