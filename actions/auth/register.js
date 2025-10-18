"use server";

import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/auth/tokens";
import prisma from "@/lib/client";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterSchema } from "@/schemas";

export const register = async (values) => {
  // server side values validation
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password, phoneNumber } = validatedFields.data;

  // Encrypt use password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user with this email already registered
  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return {
      error:
        " کاربری با این ایمیل قبلا ثبت نام کرده است. در صورت فراموشی رمز، رمز عبور را بازنشانی کنید",
    };

  // Create user
  await prisma.user.create({
    data: {
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success:
      "لینک تایید به ایمیل شما ارسال شد. در صورت عدم دریافت پوشه spam را بررسی کنید",
  };
};
