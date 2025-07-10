"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";

export async function getUserData(searchType, searchTerm) {
  const user = await currentUser();
  if (!user || user.id !== process.env.ADMIN_ID || user.role !== "ADMIN") {
    return;
  }

  let users = [];

  if (searchType === "email") {
    users = await prisma.user.findMany({
      where: { email: searchTerm },
    });
  }

  if (searchType === "phoneNumber") {
    users = await prisma.user.findMany({
      where: { phoneNumber: searchTerm },
    });
  }

  if (searchType === "name") {
    users = await prisma.user.findMany({
      where: { name: searchTerm },
    });
  }

  if (searchType === "uri") {
    const ownerId = await prisma.page.findMany({
      where: { uri: searchTerm },
      select: { owner: true },
    });

    if (ownerId.length !== 0) {
      users = await prisma.user.findMany({
        where: { id: ownerId[0].owner },
      });
    }
  }

  return users;
}
