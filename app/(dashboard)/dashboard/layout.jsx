/* eslint-disable @next/next/no-img-element */
import DashboardHeading from "@/app/_components/layout/navbar/dashboard-heading";
import DashboardSidebar from "@/app/_components/layout/navbar/dashboard-sidebar";
import { currentUserSubscription } from "@/lib/auth/user-subscription";
const bgMaskLight = "/bg-dashboard-mask.svg";
const bgMaskDark = "/bg-dashboard-mask-dark.svg";

const EditorLayout = async ({ children }) => {
  const { subscriptionPlan, subscriptionDaysLeft } =
    await currentUserSubscription();

  return (
    <>
      <DashboardSidebar />
      {/* Light */}
      <img
        className="fixed mt-60 w-full dark:hidden"
        src={bgMaskLight}
        alt="bgmask"
      />

      {/* Mask */}
      <img
        className="fixed mt-60 hidden w-full dark:block"
        src={bgMaskDark}
        alt="bgmask"
      />
      <main className="relative h-svh w-full">
        {/* Background */}
        <div className="fixed left-0 top-0 z-[-1] h-80 w-full bg-main-gradient-2"></div>
        <DashboardHeading
          subscriptionPlan={subscriptionPlan}
          subscriptionDaysLeft={subscriptionDaysLeft}
        />
        {children}
      </main>
    </>
  );
};

export default EditorLayout;
