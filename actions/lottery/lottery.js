"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";
import { revalidatePath } from "next/cache";

export async function getUserLotteries() {
  const user = await currentUser();
  if (!user) return { error: "شما به این بخش دسترسی ندارید" };

  try {
    return await prisma.lottery.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { submissions: true },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch user lotteries:", error);
    throw new Error("Failed to fetch lotteries");
  }
}

export async function getLotteryData(lotteryId) {
  const user = await currentUser();
  if (!user) return { error: "شما به این بخش دسترسی ندارید" };

  try {
    return await prisma.lottery.findUnique({
      where: { id: lotteryId },
    });
  } catch (error) {
    console.error("Failed to fetch user lotteries:", error);
    throw new Error("Failed to fetch lotteries");
  }
}

export async function createLottery(name, winnerCount) {
  const user = await currentUser();
  if (!user) return { error: "شما به این بخش دسترسی ندارید" };

  try {
    const activeLottery = await prisma.lottery.findFirst({
      where: {
        userId: user.id,
        isActive: true,
      },
    });

    if (activeLottery) {
      throw new Error("You can only have one active lottery at a time");
    }

    const slug = Array.from({ length: 12 }, () =>
      "abcdefghijklmnopqrstuvwxyz0123456789".charAt(
        Math.floor(Math.random() * 36),
      ),
    ).join("");
    const lottery = await prisma.lottery.create({
      data: {
        userId: user.id,
        name,
        slug,
        winnerCount,
        isActive: true,
      },
    });

    revalidatePath("/dashboard/lottery");
    return lottery;
  } catch (error) {
    console.error("Failed to create lottery:", error);
    throw error;
  }
}

export async function endLottery(lotteryId) {
  const user = await currentUser();
  if (!user) return { error: "شما به این بخش دسترسی ندارید" };

  const lottery = await prisma.lottery.findUnique({
    where: { id: lotteryId },
  });

  if (lottery.userId !== user.id)
    return { error: "شما به این بخش دسترسی ندارید" };

  try {
    // Get all submissions for this lottery
    const submissions = await prisma.lotterySubmission.findMany({
      where: { lotteryId },
    });

    if (submissions.length === 0) {
      await prisma.lottery.update({
        where: { id: lotteryId },
        data: {
          isActive: false,
          endedAt: new Date(),
        },
      });
      throw new Error("قرعه کشی بدون برنده پایان یافت");
    }

    if (!lottery) {
      throw new Error("Lottery not found");
    }

    // Select winners and alternatives
    const winners = [];
    const shuffled = [...submissions].sort(() => 0.5 - Math.random());

    // Take first n as winners, next n as 1st alternatives, next n as 2nd alternatives
    for (let i = 0; i < lottery.winnerCount; i++) {
      if (shuffled[i]) {
        winners.push({
          firstName: shuffled[i].firstName,
          lastName: shuffled[i].lastName,
          contactInfo: shuffled[i].contactInfo,
          position: 1, // Winner
        });
      }
      if (shuffled[i + lottery.winnerCount]) {
        winners.push({
          firstName: shuffled[i + lottery.winnerCount].firstName,
          lastName: shuffled[i + lottery.winnerCount].lastName,
          contactInfo: shuffled[i + lottery.winnerCount].contactInfo,
          position: 2, // 1st alternative
        });
      }
      if (shuffled[i + lottery.winnerCount * 2]) {
        winners.push({
          firstName: shuffled[i + lottery.winnerCount * 2].firstName,
          lastName: shuffled[i + lottery.winnerCount * 2].lastName,
          contactInfo: shuffled[i + lottery.winnerCount * 2].contactInfo,
          position: 3, // 2nd alternative
        });
      }
    }

    // Update lottery with winners and mark as inactive
    const updatedLottery = await prisma.lottery.update({
      where: { id: lotteryId },
      data: {
        isActive: false,
        endedAt: new Date(),
        winners: winners,
        submissions: {
          deleteMany: {}, // Remove all submissions
        },
      },
    });

    revalidatePath("/dashboard/lottery");
    return updatedLottery;
  } catch (error) {
    console.error("Failed to end lottery:", error);
    throw error;
  }
}

export async function submitLotteryParticipation(submissionData) {
  try {
    // Check if user already participated
    const existingSubmission = await prisma.lotterySubmission.findFirst({
      where: {
        lotteryId: submissionData.lotteryId,
        contactInfo: submissionData.contactInfo,
      },
    });

    if (existingSubmission) {
      throw new Error("شما قبلاً در این قرعه کشی شرکت کرده اید");
    }

    // Create new submission
    const submission = await prisma.lotterySubmission.create({
      data: {
        lotteryId: submissionData.lotteryId,
        firstName: submissionData.firstName,
        lastName: submissionData.lastName,
        contactInfo: submissionData.contactInfo,
      },
    });

    revalidatePath(`/lottery/${submissionData.lotteryId}`);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function countLotterySubmissions(lotteryId) {
  const user = await currentUser();
  if (!user) return { error: "شما به این بخش دسترسی ندارید" };

  try {
    const count = await prisma.lotterySubmission.count({
      where: {
        lotteryId: lotteryId,
      },
    });

    return { count };
  } catch {
    console.error("Failed to get data:", error);
    throw error;
  }
}
