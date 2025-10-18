"use server";
import { getUserByEmail, getUserById } from "@/data/user";
import prisma from "@/lib/client";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/auth/tokens";
import bcrypt from "bcryptjs";
import { currentUser } from "@/lib/auth/get-user";
export const settings = async (values) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "این ایمیل قبلا استفاده شده است" };
    }

    const verficationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(verficationToken.email, verficationToken.token);

    return {
      success:
        "لینک تایید به ایمیل شما ارسال شد. در صورت عدم دریافت پوشه spam را بررسی کنید",
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwrdsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwrdsMatch) {
      return { error: "رمز عبور اشتباه است" };
    }
    if (values.password === values.newPassword) {
      return { error: "لطفا رمز عبور دیگری انتخاب کنید" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await prisma.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "پروفایل به روز رسانی شد" };
};
