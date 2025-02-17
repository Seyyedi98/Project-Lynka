import { auth } from "@/auth";

export const currentUserPremium = async () => {
  const session = await auth();

  const premiumLevel = session?.user?.premiumLevel;
  const premiumExpires = session?.user?.premiumExpires;

  return { premiumLevel, premiumExpires };
};
