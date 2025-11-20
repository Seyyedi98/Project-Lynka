import { getUserPageData } from "@/actions/page/page";
import { updateSubscriptionData } from "@/actions/subscription";
import CreatePageButton from "@/app/_components/common/button/PrimaryButton/new-page-btn";
import DashboardDataCard from "@/app/_components/common/card/dashboard-data-card";
import Carousel from "@/app/_components/common/carousel";
import PagesList from "@/app/_components/section/dashboard-pages-list";
import { currentUserSubscription } from "@/lib/auth/user-subscription";
import { BadgeCheck, ChartSpline, SheetIcon, TrophyIcon } from "lucide-react";
import Link from "next/link";

const Dashboard = async () => {
  // updateSubscriptionData({ subscriptionPlan: "silver", days: 30 });
  const allPages = await getUserPageData();
  const { subscriptionPlan, subscriptionDaysLeft } =
    await currentUserSubscription();

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
        {/* Show if user hasn't created any pages */}
        {allPages.length === 0 && (
          <div className="col-span-2 w-full text-center">
            <div className="mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-800/50 dark:to-gray-900/50">
              <h3 className="mb-3 text-xl font-bold text-foreground dark:text-white">
                شما هنوز صفحه ای ایجاد نکرده اید!
              </h3>

              <p className="mb-4 text-sm text-muted-foreground dark:text-white/70">
                برای شروع، اولین صفحه خود را ایجاد کنید
              </p>

              <CreatePageButton allPages={allPages}>
                <div className="group relative mx-auto inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-primary-hover hover:to-secondary hover:shadow-primary/25 dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600">
                  <span>ایجاد صفحه جدید</span>
                  <div className="absolute inset-0 rounded-xl bg-white/0 transition-all group-hover:bg-white/10" />
                </div>
              </CreatePageButton>
            </div>
          </div>
        )}

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
              href="dashboard/analytics"
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
              text="قرعه کشی ها"
              href="dashboard/lottery"
            >
              <TrophyIcon className="h-20 w-20" />
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
        {subscriptionPlan &&
          subscriptionDaysLeft < 3 &&
          subscriptionDaysLeft > 0 && (
            <Link className="col-span-2" href="/dashboard/pricing">
              <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-[#ec407a] text-lg text-white">
                کمتر از ۳ روز تا پایان اشتراک باقی مانده است - همین حالا تمدید
                کنید!
              </div>
            </Link>
          )}

        {/* Pages List */}
        <div className="z-[2] col-span-full h-fit rounded-lg bg-card/50 backdrop-blur-lg dark:border dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-xl">
          <PagesList pages={allPages} />
          <div className="relative flex justify-center py-3 transition-colors duration-200">
            <div className="absolute top-0 mx-auto h-[1px] w-[95%] bg-primary" />
            <CreatePageButton allPages={allPages}>
              <div className="group relative mx-auto my-2 flex cursor-pointer gap-1 text-sm text-primary transition-colors duration-200 hover:text-secondary dark:text-amber-400 dark:hover:text-amber-300">
                <div className="absolute -bottom-1 right-1/2 h-[1px] w-0 bg-secondary transition-all group-hover:w-1/2 dark:bg-amber-300" />
                <div className="absolute -bottom-1 left-1/2 h-[1px] w-0 bg-secondary transition-all group-hover:w-1/2 dark:bg-amber-300" />
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
