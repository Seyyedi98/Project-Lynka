import { useSession } from "next-auth/react";

export const useUserPremium = () => {
  const session = useSession();

  const premiumLevel = session.data?.user?.premiumLevel;
  const premiumExpires = session.data?.user?.premiumExpires;

  return { premiumLevel, premiumExpires };
};
