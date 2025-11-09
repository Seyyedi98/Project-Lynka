"use server";

import prisma from "@/lib/client";

export async function getUserDataByUri(uri) {
  const userData = await prisma.page.findUnique({
    where: { uri },
    include: { User: true },
  });

  return userData;
}

export async function getUserContactInfo(id) {
  const data = await prisma.user.findUnique({
    where: { id },
    select: {
      phoneNumber: true,
      email: true,
    },
  });
  return data;
}
