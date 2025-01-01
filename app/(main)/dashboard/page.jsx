import CreatePageBtn from "@/app/_components/common/button/create-page-btn";
import NewPageCard from "@/app/_components/common/card/new-page-card";
import GridLayout from "@/app/_components/layout/grid-layout";
import DashboardHeading from "@/app/_components/navbar/dashboard-heading";
import { Separator } from "@/components/ui/separator";

const Dashboard = async () => {
  return (
    <main className="">
      <DashboardHeading>
        <CreatePageBtn />
      </DashboardHeading>
      <Separator />
      <div className="no-scollbar flex h-[84.5dvh] flex-col gap-4 px-4 sm:mr-20 sm:h-full sm:px-12 xl:mr-56">
        <section className="h-full w-full overflow-scroll py-8 sm:overflow-visible">
          <GridLayout className="">
            <NewPageCard />

            {/* TODO: Show list of user created pages */}
          </GridLayout>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
