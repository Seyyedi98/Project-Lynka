"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";

export const getSubscriptionData = async () => {
  const session = await currentUser();
  const data = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
    select: { subscriptionTier: true, subscriptionExpire: true },
  });

  return data;
};

export const updateSubscriptionData = async ({ subscriptionTier, days }) => {
  const session = await currentUser();

  let startingDate;

  if (session.subscriptionTier !== "bronze") {
    startingDate = session.subscriptionExpire;
  } else {
    startingDate = new Date();
  }

  const date = new Date(startingDate);
  date.setDate(date.getDate() + days);

  // updateSubscriptionData({ subscriptionTier: "silver", days: 30 });

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: { subscriptionTier, subscriptionExpire: date },
  });
};

export const updateSubscriptionTier = async (subscriptionTier) => {
  const session = await currentUser();
  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: { subscriptionTier },
  });
};

export const updateSubscriptionDate = async (subscriptionExpire) => {
  const session = await currentUser();
  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: { subscriptionExpire },
  });
};
