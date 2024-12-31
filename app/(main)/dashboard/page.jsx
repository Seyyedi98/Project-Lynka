import CreatePageBtn from "@/app/_components/common/button/create-page-btn";
import NewPageCard from "@/app/_components/common/card/new-page-card";
import Devider from "@/app/_components/common/ui/devider";
import GridLayout from "@/app/_components/layout/grid-layout";
import DashboardHeading from "@/app/_components/navbar/dashboard-heading";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const page = async () => {
  const session = await auth();

  return (
    <main className="">
      <DashboardHeading>
        <CreatePageBtn />
      </DashboardHeading>
      <Separator />
      <div className="no-scollbar flex h-[84.5dvh] flex-col gap-4 px-4 sm:mr-20 sm:h-full xl:mr-56">
        <section className="h-full w-full overflow-scroll pt-8 sm:overflow-visible">
          <GridLayout className="">
            <NewPageCard />
            <NewPageCard />
            <NewPageCard />
            <NewPageCard />
            <NewPageCard />
            <NewPageCard />
          </GridLayout>
        </section>
      </div>
    </main>
  );
};

export default page;
