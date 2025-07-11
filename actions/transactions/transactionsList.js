"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";

export const getTransactions = async () => {
  const user = await currentUser();

  if (!user || !user.id) {
    return [];
  }

  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        requestDate: "desc",
      },
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export const getUserTransactionsByUserId = async (userId) => {
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        requestDate: "desc",
      },
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};
