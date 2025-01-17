import { getUserPages } from "@/actions/page";
import ExpandableRowCard from "@/app/_components/common/card/expandable-row-card";
import CreatePageButton from "@/app/_components/common/card/new-page-card";
import DashboardHeading from "@/app/_components/layout/navbar/dashboard-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const Dashboard = async () => {
  const allPages = await getUserPages();

  return (
    <main className="">
      <DashboardHeading>
        <CreatePageButton />
      </DashboardHeading>
      <Separator />

      <div className="no-scollbar flex h-[84.5dvh] flex-col gap-4 px-4 sm:mr-20 sm:h-full sm:px-12 xl:mr-56">
        <section className="h-full w-full overflow-scroll pb-8 pt-4 sm:overflow-visible">
          <Accordion type="single" defaultValue="pages" collapsible>
            <AccordionItem value="pages">
              <AccordionTrigger>صفحه های شما</AccordionTrigger>
              <AccordionContent>
                {/* <GridLayout> */}

                {allPages.map((page) => {
                  return <ExpandableRowCard page={page} key={page.uri} />;
                })}
                {/* </GridLayout> */}
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
