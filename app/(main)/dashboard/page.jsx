import CreatePageBtn from "@/app/_components/common/button/PrimaryButton/create-page-btn";
import NewPageCard from "@/app/_components/common/card/new-page-card";
import PageViewCard from "@/app/_components/common/card/page-view-card";
import GridLayout from "@/app/_components/layout/grid-layout";
import DashboardHeading from "@/app/_components/navbar/dashboard-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { getUserPages } from "@/actions/page";

const Dashboard = async () => {
  const allPages = await getUserPages();

  // console.log([] == 0);

  // console.log(true + true);
  // console.log(true === 1);

  // console.log(9 + 5);
  // console.log("9" + 5);
  // console.log("9" - 5);
  // console.log("5" + 5);
  // console.log("5" - 5);
  // console.log("5" === 5);

  // console.log(0.1 + 0.1 == 0.2);
  // console.log(0.1 + 0.2 == 0.3);

  return (
    <main className="">
      <DashboardHeading>
        <CreatePageBtn />
      </DashboardHeading>
      <Separator />

      <div className="no-scollbar flex h-[84.5dvh] flex-col gap-4 px-4 sm:mr-20 sm:h-full sm:px-12 xl:mr-56">
        <section className="h-full w-full overflow-scroll pb-8 pt-4 sm:overflow-visible">
          <Accordion type="single" defaultValue="pages" collapsible>
            <AccordionItem value="pages">
              <AccordionTrigger>صفحه های شما</AccordionTrigger>
              <AccordionContent>
                <GridLayout>
                  <NewPageCard />

                  {allPages.map((page) => {
                    return <PageViewCard page={page} key={page.uri} />;
                  })}
                </GridLayout>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="showcase">
              <AccordionTrigger>نمونه صفحه ها</AccordionTrigger>
              <AccordionContent>Sample pages</AccordionContent>
            </AccordionItem>

            <AccordionItem value="explore">
              <AccordionTrigger>راهنما</AccordionTrigger>
              <AccordionContent>News and docs</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
