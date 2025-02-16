import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLoadingSettings from "./page-loading-settings";
import PageMetaSettings from "./page-meta-settings";

const PageDataSettingsContainer = () => {
  return (
    <div className="max-w-md">
      <Tabs dir="rtl" defaultValue="browser" className="">
        <TabsList className="mb-4">
          <TabsTrigger value="browser">سئو</TabsTrigger>
          <TabsTrigger value="loading">لودینگ</TabsTrigger>
        </TabsList>

        <TabsContent value="browser">
          <PageMetaSettings />
        </TabsContent>

        <TabsContent value="loading">
          <PageLoadingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageDataSettingsContainer;
