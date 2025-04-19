"use server";

import prisma from "@/lib/client";

export async function sendContactMessage({ userId, title, message }) {
  await prisma.contactUsMessages.create({
    data: { userId, title, message },
  });

  return { success: "Message sent!" };
}
