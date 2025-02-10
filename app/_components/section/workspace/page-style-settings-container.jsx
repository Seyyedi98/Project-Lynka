import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageBackgroundSettings from "./page-background-settings";

const PageStyleSettingsContainer = () => {
  return (
    <div>
      <Tabs dir="rtl" defaultValue="background" className="">
        <TabsList className="mb-4">
          <TabsTrigger value="background">پس زمینه</TabsTrigger>
          <TabsTrigger value="theme">تم</TabsTrigger>
        </TabsList>

        <TabsContent value="background">
          <PageBackgroundSettings />
        </TabsContent>

        <TabsContent value="theme">
          <PageBackgroundSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageStyleSettingsContainer;
