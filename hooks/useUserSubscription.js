import { useSession } from "next-auth/react";

export const useUserSubscription = () => {
  const session = useSession();

  const subscriptionTier = session.data?.user?.subscriptionTier;
  const subscriptionExpire = session.data?.user?.subscriptionExpire;

  const todayDate = new Date();
  const expiresDate = new Date(subscriptionExpire);

  const subscriptionDaysLeft = Math.floor(
    (expiresDate - todayDate) / (1000 * 60 * 60 * 24),
  );

  return { subscriptionTier, subscriptionDaysLeft };
};
