import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLoadingSettings from "./page-loading-settings";
import PageMetaSettings from "./page-meta-settings";

const PageDataSettings = () => {
  return (
    <div className="max-w-md">
      <Tabs defaultValue="browser" className="">
        <TabsList className="mb-4">
          <TabsTrigger value="browser">مرورگر</TabsTrigger>
          <TabsTrigger value="loading">لودینگ</TabsTrigger>
        </TabsList>

        <TabsContent dir="rtl" value="browser">
          <PageMetaSettings />
        </TabsContent>

        <TabsContent dir="rtl" value="loading">
          <PageLoadingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageDataSettings;
