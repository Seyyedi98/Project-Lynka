import DashboardHeading from "@/app/_components/layout/navbar/dashboard-heading";
import { currentUserSubscription } from "@/lib/auth/user-subscription";

const EditorLayout = async ({ children }) => {
  const { subscriptionPlan, subscriptionDaysLeft } =
    await currentUserSubscription();

  return (
    <main className="relative h-svh w-full">
      {/* Background */}
      <div className="fixed left-0 top-0 z-[-1] h-80 w-full bg-main-gradient-2"></div>

      <DashboardHeading
        subscriptionPlan={subscriptionPlan}
        subscriptionDaysLeft={subscriptionDaysLeft}
      />

      {children}
    </main>
  );
};

export default EditorLayout;
