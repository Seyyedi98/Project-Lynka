"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";

export const getUserTransactions = async () => {
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

export const getAdminTransactions = async (page = 1, perPage = 20) => {
  try {
    const skip = (page - 1) * perPage;

    const [transactions, totalCount] = await Promise.all([
      prisma.transactions.findMany({
        skip,
        take: perPage,
        orderBy: {
          requestDate: "desc",
        },
      }),
      prisma.transactions.count(),
    ]);

    const totalPages = Math.ceil(totalCount / perPage);

    return {
      transactions,
      totalPages,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      transactions: [],
      totalPages: 1,
      currentPage: 1,
      totalCount: 0,
    };
  }
};

export const searchTransactions = async (searchType, searchValue) => {
  try {
    if (!searchValue.trim()) {
      return [];
    }

    const where = {};
    if (searchType === "transactionId") {
      where.id = searchValue;
    } else if (searchType === "userId") {
      where.userId = searchValue;
    }

    return await prisma.transactions.findMany({
      where,
      orderBy: {
        requestDate: "desc",
      },
      take: 20, // Limit search results to 20
    });
  } catch (error) {
    console.error("Error searching transactions:", error);
    return [];
  }
};
