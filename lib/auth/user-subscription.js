import {
  updateSubscriptionData,
  updateSubscriptionTier,
} from "@/actions/auth/subscription";
import { auth } from "@/auth";

export const currentUserSubscription = async () => {
  const session = await auth();

  let subscriptionTier = session?.user?.subscriptionTier;
  const subscriptionExpire = session?.user?.subscriptionExpire;

  const todayDate = new Date();
  const expiresDate = new Date(subscriptionExpire);

  const subscriptionDaysLeft =
    expiresDate - todayDate > 0
      ? Math.floor((expiresDate - todayDate) / (1000 * 60 * 60 * 24))
      : 0;

  if (subscriptionDaysLeft === 0) {
    await updateSubscriptionTier("bronze");
  }

  return { subscriptionTier, subscriptionDaysLeft };
};
