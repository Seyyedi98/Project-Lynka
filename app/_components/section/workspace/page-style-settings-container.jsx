import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageBackgroundSettings from "./page-background-settings";
import PageThemeSelector from "./page-theme-selector";

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
          <PageThemeSelector />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageStyleSettingsContainer;
