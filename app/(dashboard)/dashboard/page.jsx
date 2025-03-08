import { getUserPageData } from "@/actions/page/page";
import CreatePageButton from "@/app/_components/common/button/new-page-btn";
import DashboardDataCard from "@/app/_components/common/card/dashboard-data-card";
import Carousel from "@/app/_components/common/carousel";
import CreateNewPage from "@/app/_components/common/form/create-new-page";
import DashboardSidebar from "@/app/_components/layout/navbar/dashboard-sidebar";
import PagesList from "@/app/_components/section/dashboard-pages-list";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { ApertureIcon, BadgeCheck, ChartSpline } from "lucide-react";

const Dashboard = async () => {
  const allPages = await getUserPageData();

  if (allPages.length === 0)
    return (
      <main className="h-full w-full">
        <CreateNewPage />
      </main>
    );

  if (allPages.length > 0)
    return (
      // <ImageSlider />
      <div className="relative flex w-full select-none">
        <DashboardSidebar />
        <h2 className="absolute right-4 top-40 pr-0 text-3xl text-white md:pr-3">
          پنل کاربری
        </h2>
        <main className="grid w-full flex-1 auto-rows-auto grid-cols-2 gap-4 px-2 pt-60 md:mx-4 lg:mr-56 lg:pr-6">
          {/* Slider */}
          <div className="col-span-2 h-60 overflow-hidden rounded-lg md:col-span-1">
            <Carousel showArrows={true} />
          </div>

          {/* Cards */}
          <div className="col-span-2 flex h-60 flex-col gap-2 md:col-span-1">
            <div className="flex h-full w-full gap-2">
              <DashboardDataCard bgColor="#ec407a" text="پیام جدید" data="12">
                <EnvelopeClosedIcon className="h-20 w-20" />
              </DashboardDataCard>

              <DashboardDataCard bgColor="#536dfe" text=" بازدید ها" data="12">
                <ChartSpline className="h-20 w-20" />
              </DashboardDataCard>
            </div>

            <div className="flex h-full w-full gap-2">
              <DashboardDataCard
                bgColor="#7cb342"
                text="اشتراک ویژه"
                data="۱۲ روز"
              >
                <BadgeCheck className="h-20 w-20" />
              </DashboardDataCard>

              <DashboardDataCard bgColor="#fb8c00" text="قرعه کشی" data="12">
                <ApertureIcon className="h-20 w-20" />
              </DashboardDataCard>
            </div>
          </div>

          {/* Pages List */}
          <div className="col-span-full h-fit overflow-hidden rounded-lg">
            <PagesList pages={allPages} />
            <div className="flex w-full justify-center bg-primary/80 transition-colors duration-200 hover:bg-primary">
              <CreatePageButton className="" />
            </div>
          </div>

          {/* Blog */}
          <div className="col-span-2 h-60 rounded-lg bg-purple-500 md:col-span-1">
            Blog
          </div>

          {/* Analytics */}
          <div className="col-span-2 h-60 rounded-lg bg-green-500 md:col-span-1">
            Analytics
          </div>
        </main>
      </div>
    );
};

export default Dashboard;
