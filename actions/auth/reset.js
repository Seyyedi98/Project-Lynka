"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/auth/tokens";
import { ResetSchema } from "@/schemas";

export const reset = async (values) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "لطفا آدرس ایمیل را به درستی وارد کنید" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser.error === "User not found!") {
    return { error: "کاربری با این ایمیل یافت نشد" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "لینک بازیابی به ایمیل شما ارسال شد" };
};
