"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";

export const getSubscriptionData = async () => {
  const session = await currentUser();
  if (!session) return;

  const data = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
    select: { subscriptionPlan: true, subscriptionExpire: true },
  });

  return data;
};

export const getSubscriptionDataByUri = async (uri) => {
  const session = await currentUser();
  if (!session) return;

  const userId = await prisma.page.findUnique({
    where: { uri },
    select: { User: true },
  });

  const { subscriptionPlan, subscriptionExpire } = userId.User;

  return { subscriptionPlan, subscriptionExpire };
};

export const updateSubscriptionData = async ({ subscriptionPlan, days }) => {
  const session = await currentUser();
  if (!session) return;

  let startingDate;

  if (session.subscriptionPlan !== "bronze") {
    startingDate = session.subscriptionExpire;
  } else {
    startingDate = new Date();
  }

  const date = new Date(startingDate);
  date.setDate(date.getDate() + days);

  // updateSubscriptionData({ subscriptionPlan: "silver", days: 30 });

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: { subscriptionPlan, subscriptionExpire: date },
  });
};

export const updatesubscriptionPlan = async (subscriptionPlan) => {
  const session = await currentUser();
  if (!session) return;

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: { subscriptionPlan },
  });
};

export const updateSubscriptionDate = async (subscriptionExpire) => {
  const session = await currentUser();
  if (!session) return;

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: { subscriptionExpire },
  });
};
