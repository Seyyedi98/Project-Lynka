import { useSession } from "next-auth/react";

export const useUserSubscription = () => {
  const session = useSession();

  const subscriptionTier = session.data?.user?.subscriptionTier;
  const subscriptionExpiry = session.data?.user?.subscriptionExpiry;

  return { subscriptionTier, subscriptionExpiry };
};
