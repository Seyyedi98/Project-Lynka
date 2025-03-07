import { getUserPages } from "@/actions/page/page";
import CreateNewPage from "@/app/_components/common/form/create-new-page";
import DashboardHeading from "@/app/_components/layout/navbar/dashboard-heading";
import DashboardSidebar from "@/app/_components/layout/navbar/dashboard-sidebar";
import PagesList from "@/app/_components/section/dashboard/pages-list";
import { currentUserSubscription } from "@/lib/auth/user-subscription";

const Dashboard = async () => {
  const allPages = await getUserPages();

  if (allPages.length === 0)
    return (
      <main className="h-full w-full">
        <CreateNewPage />
      </main>
    );

  if (allPages.length > 0)
    return (
      <div className="flex w-full">
        <DashboardSidebar />
        <main className="h-fit w-full flex-1 lg:mr-56">
          <div className="no-scollbar z-50 mx-2 mt-52 flex flex-col gap-4 rounded-lg bg-card px-8 pt-6 sm:h-full md:mx-4 md:pt-10">
            <PagesList pages={allPages} />
          </div>
        </main>
      </div>
    );
};

export default Dashboard;
