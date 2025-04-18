"use server";

import prisma from "@/lib/client";

export async function getUserDataByUri(uri) {
  const userData = await prisma.page.findUnique({
    where: { uri },
    include: { User: true },
  });

  return userData;
}
