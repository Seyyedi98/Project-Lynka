import { getUserPages } from "@/actions/page/page";
import CreatePageButton from "@/app/_components/common/button/new-page-btn";
import CarouselComponent from "@/app/_components/common/carousel";
import CreateNewPage from "@/app/_components/common/form/create-new-page";
import DashboardSidebar from "@/app/_components/layout/navbar/dashboard-sidebar";
import PagesList from "@/app/_components/section/dashboard-pages-list";

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
      // <ImageSlider />
      <div className="flex w-full select-none">
        <DashboardSidebar />
        <main className="grid w-full flex-1 auto-rows-auto grid-cols-2 gap-4 px-2 pt-52 md:mx-4 lg:mr-56 lg:pr-6">
          <div className="col-span-2 bg-sky-500 md:col-span-1">Guide</div>
          <div className="col-span-2 overflow-hidden rounded-lg bg-cyan-500 md:col-span-1">
            <CarouselComponent />
          </div>

          <div className="col-span-full h-fit overflow-hidden rounded-lg bg-red-50">
            <PagesList pages={allPages} />
            <div className="flex w-full justify-center bg-primary/80 transition-colors duration-200 hover:bg-primary">
              <CreatePageButton className="" />
            </div>
          </div>
          <div className="col-span-2 bg-purple-500 md:col-span-1">Blog</div>
          <div className="col-span-2 bg-green-500 md:col-span-1">Analytics</div>
        </main>
      </div>
    );
};

export default Dashboard;
