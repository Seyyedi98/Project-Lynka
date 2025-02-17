import { auth } from "@/auth";

export const currentUserSubscription = async () => {
  const session = await auth();

  const subscriptionTier = session?.user?.subscriptionTier;
  const subscriptionExpiry = session?.user?.subscriptionExpiry;

  return { subscriptionTier, subscriptionExpiry };
};
