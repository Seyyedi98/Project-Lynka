"use server";

// 2025-03-09T05:01:19.678Z

import { getSubscriptionDataByUri } from "@/actions/auth/subscription";
import { auth } from "@/auth";

export const currentUserSubscription = async () => {
  const session = await auth();
  if (!session) return;

  let subscriptionPlan = session?.user?.subscriptionPlan;
  const subscriptionExpire = session?.user?.subscriptionExpire;
  let isPremium;

  const todayDate = new Date();
  const expiresDate = new Date(subscriptionExpire);

  const subscriptionDaysLeft =
    expiresDate - todayDate > 0
      ? Math.ceil((expiresDate - todayDate) / (1000 * 60 * 60 * 24))
      : 0;

  // if (subscriptionDaysLeft === 0) {
  //   await updatesubscriptionPlan("bronze");
  // }

  if (subscriptionPlan === "silver" && subscriptionDaysLeft > 0) {
    isPremium = true;
  } else {
    isPremium = false;
  }

  return { subscriptionPlan, subscriptionDaysLeft, isPremium };
};

export const getSubscriptionByUri = async (uri) => {
  if (!uri || uri === "grid.svg") return;
  const { subscriptionPlan, subscriptionExpire } =
    await getSubscriptionDataByUri(uri);

  const todayDate = new Date();

  const expiresDate = new Date(subscriptionExpire);
  let isPremium;

  const subscriptionDaysLeft =
    expiresDate - todayDate > 0
      ? Math.ceil((expiresDate - todayDate) / (1000 * 60 * 60 * 24))
      : 0;

  if (subscriptionPlan === "silver" && subscriptionDaysLeft > 0) {
    isPremium = true;
  } else {
    isPremium = false;
  }

  return { subscriptionPlan, subscriptionDaysLeft, isPremium };
};
