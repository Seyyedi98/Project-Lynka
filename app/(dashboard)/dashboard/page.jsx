import { getUserPageData } from "@/actions/page/page";
import CreatePageButton from "@/app/_components/common/button/PrimaryButton/new-page-btn";
import BlogWidget from "@/app/_components/common/card/blog-widget";
import DashboardDataCard from "@/app/_components/common/card/dashboard-data-card";
import Carousel from "@/app/_components/common/carousel";
import PagesList from "@/app/_components/section/dashboard-pages-list";
import { currentUserSubscription } from "@/lib/auth/user-subscription";
import { ApertureIcon, BadgeCheck, ChartSpline, SheetIcon } from "lucide-react";
import Link from "next/link";

const Dashboard = async () => {
  const allPages = await getUserPageData();
  const { subscriptionPlan, subscriptionDaysLeft } =
    await currentUserSubscription();

  const totalViews = allPages.reduce((sum, item) => sum + item.views, 0);

  // const elementsAnalytics = await Promise.all(
  //   allPages.map(async (page) => {
  //     const elementsData = await getPageAnalytics(page.uri);
  //     return elementsData;
  //   }),
  // );

  return (
    <div className="relative mx-auto flex w-full max-w-7xl select-none pb-10">
      <h2 className="absolute right-4 top-40 pr-0 text-3xl text-white sm:mr-20 sm:pr-3">
        پنل کاربری
      </h2>

      <main className="grid w-full flex-1 auto-rows-auto grid-cols-2 gap-4 px-2 pt-60 sm:mx-4 sm:mr-20 xl:pr-6">
        {/* ImageSlider */}
        <div className="col-span-2 h-60 overflow-hidden rounded-lg md:col-span-1 xl:h-80">
          <Carousel showArrows={true} />
        </div>

        {/* Cards */}
        <div className="col-span-2 flex h-60 flex-col gap-2 md:col-span-1 xl:h-80">
          <div className="flex h-full w-full gap-2">
            <DashboardDataCard
              bgColor="#ec407a"
              text="صفحات فعال"
              data={allPages.length}
            >
              <SheetIcon className="h-16 w-16" />
            </DashboardDataCard>

            <DashboardDataCard
              bgColor="#536dfe"
              text="تعداد بازدیدها"
              data={totalViews}
            >
              <ChartSpline className="h-16 w-16" />
            </DashboardDataCard>
          </div>

          <div className="flex h-full w-full gap-2">
            <DashboardDataCard
              bgColor="#7cb342"
              text="اشتراک ویژه"
              data={
                <span className="flex items-center gap-1">
                  <p className="mt-2">{subscriptionDaysLeft}</p>
                  <p className="text-base">روز</p>
                </span>
              }
            >
              <BadgeCheck className="h-20 w-20" />
            </DashboardDataCard>

            <DashboardDataCard
              bgColor="#fb8c00"
              text="قرعه کشی های فعال"
              data="۱۲"
            >
              <ApertureIcon className="h-20 w-20" />
            </DashboardDataCard>
          </div>
        </div>

        {subscriptionPlan && subscriptionDaysLeft === 0 && (
          <Link className="col-span-2" href="/dashboard/pricing">
            <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-[#ec407a] text-lg text-white">
              خرید اشتراک پرمیوم
            </div>
          </Link>
        )}

        {/* Pages List */}
        <div className="z-[2] col-span-full h-fit rounded-lg bg-card/50 backdrop-blur-lg">
          <PagesList pages={allPages} />
          <div className="relative flex justify-center py-3 transition-colors duration-200">
            <div className="absolute top-0 mx-auto h-[1px] w-[95%] bg-primary" />
            <CreatePageButton allPages={allPages}>
              <div className="group relative mx-auto my-2 flex cursor-pointer gap-1 text-sm text-primary transition-colors duration-200 hover:text-secondary">
                <div className="absolute -bottom-1 right-1/2 h-[1px] w-0 bg-secondary transition-all group-hover:w-1/2" />
                <div className="absolute -bottom-1 left-1/2 h-[1px] w-0 bg-secondary transition-all group-hover:w-1/2" />
                ایجاد صفحه جدید
              </div>
            </CreatePageButton>
          </div>
        </div>

        {/* Blog */}
        {/* <div className="col-span-2 h-60 rounded-lg bg-secondaryBg/50 backdrop-blur-lg md:col-span-1">
          <BlogWidget />
        </div> */}

        {/* Analytics */}
        {/* <div className="col-span-2 h-60 rounded-lg bg-secondaryBg/50 backdrop-blur-lg md:col-span-1">
          <AnalyticsWidget
            pages={allPages}
            elementsAnalytics={elementsAnalytics}
          />
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
