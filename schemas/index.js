import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "آدرس ایمیل نامعتبر است" }),
  password: z.string().min(1, { message: "رمز عبور نامعتبر" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "",
  }),
  email: z.string().email({ message: "آدرس ایمیل نامعتبر است" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید بیش از ۶ کاراکتر باشد" }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "پذیرش شرایط الزامی است" }),
  }),
});

export const OtpLoginSchema = z.object({
  phoneNumber: z.string().length(11),
  password: z.string().min(1, { message: "رمز عبور نامعتبر" }),
  code: z.optional(z.string()),
});

export const OtpRegisterSchema = z.object({
  phoneNumber: z.string().length(11),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید بیش از ۶ کاراکتر باشد" }),
  name: z.string().min(1, {
    message: "",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "آدرس ایمیل نامعتبر است" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "رمز عبور باید بیش از ۶ کاراکتر باشد" }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().min(3, { message: "نام کاربری باید حداثل ۳ حرف باشد" }),
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    { message: "New password is requider!", path: ["newPassword"] },
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    { message: "Password is requider!", path: ["password"] },
  );

export const PageUriSchema = z.object({
  uri: z
    .string()
    .min(3, { message: "نام کاربری باید حداقل ۳ حرف باشد" })
    .max(12, { message: "نام کاربری باید حداکثر ۱۲ حرف باشد" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "نام کاربری فقط باید شامل حروف انگلیسی و اعداد بدون فاصله باشد",
    }),
});

// Fields
export const heroFieldSchems = z.object({
  title: z
    .string()
    .max(50, { message: "عنوان نمی تواند بیش از ۱۰۰ کاراکتر باشد" }),
  theme: z.string(),
  textColor: z.string(),
  layout: z.string(),
  image: z.string(),
  href: z.string(),
  font: z.string(),
  borderRadius: z.string(),
  bgColor: z.string(),
  schedule: z.boolean(),
  scheduleStart: z.string(),
  scheduleEnd: z.string(),
  countdown: z.boolean(),
  countdownDate: z.string(),
  isProtected: z.boolean(),
  password: z.string(),
});

export const cardFieldSchems = z.object({
  title: z
    .string()
    .max(100, { message: "عنوان نمی تواند بیش از ۱۰۰ کاراکتر باشد" }),
  subtitle: z
    .string()
    .max(200, { message: "عنوان نمی تواند بیش از ۲۰۰ کاراکتر باشد" }),
  titleFont: z.any(),
  subtitleFont: z.any(),
  titleColor: z.any(),
  subtitleColor: z.any(),
  heroType: z.any(),
  heroValue: z.any(),
  primaryImage: z.any(),
  secondaryImage: z.any(),
  style: z.any(),
});
