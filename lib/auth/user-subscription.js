"use server";

import {
  getSubscriptionDataByUri,
  updatesubscriptionPlan,
} from "@/actions/auth/subscription";
import { auth } from "@/auth";

export const currentUserSubscription = async () => {
  const session = await auth();

  let subscriptionPlan = session?.user?.subscriptionPlan;
  const subscriptionExpire = session?.user?.subscriptionExpire;

  const todayDate = new Date();
  const expiresDate = new Date(subscriptionExpire);

  const subscriptionDaysLeft =
    expiresDate - todayDate > 0
      ? Math.floor((expiresDate - todayDate) / (1000 * 60 * 60 * 24))
      : 0;

  if (subscriptionDaysLeft === 0) {
    await updatesubscriptionPlan("bronze");
  }

  return { subscriptionPlan, subscriptionDaysLeft };
};

export const getSubscriptionByUri = async (uri) => {
  const { subscriptionPlan, subscriptionExpire } =
    await getSubscriptionDataByUri(uri);

  const todayDate = new Date();
  const expiresDate = new Date(subscriptionExpire);
  let isSilver;

  const subscriptionDaysLeft =
    expiresDate - todayDate > 0
      ? Math.floor((expiresDate - todayDate) / (1000 * 60 * 60 * 24))
      : 0;

  if (subscriptionPlan === "silver" && subscriptionDaysLeft > 0) {
    isSilver = true;
  }
  return { subscriptionPlan, subscriptionDaysLeft, isSilver };
};
