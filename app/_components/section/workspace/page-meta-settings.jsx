"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Text, Image as ImageIcon, Search, HelpCircle } from "lucide-react";
import MetaTitleForm from "../../common/form/meta-title-form";
import MetaImageForm from "../../common/form/meta-image-form";
import GoogleIndexForm from "../../common/form/google-index-form";
import HelpButton from "../../common/button/help";

const PageMetaSettings = () => {
  const metadata = useSelector((store) => store.page.metadata);
  const [activeTab, setActiveTab] = useState("metaTitle");
  const { uri } = useParams();

  const tabs = [
    {
      id: "metaTitle",
      label: "مرورگر",
      icon: <Text className="h-4 w-4" />,
      component: (
        <MetaTitleForm
          uri={uri}
          description={metadata.metaDescription}
          title={metadata.metaTitle}
        />
      ),
    },
    {
      id: "metaImage",
      label: "شبکه اجتماعی",
      icon: <ImageIcon className="h-4 w-4" />,
      component: (
        <MetaImageForm
          uri={uri}
          favicon={metadata.favicon}
          image={metadata.metaImage}
        />
      ),
    },
    {
      id: "index",
      label: "موتور جستجو",
      icon: <Search className="h-4 w-4" />,
      component: <GoogleIndexForm favicon={metadata.favicon} uri={uri} />,
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation */}
      <div className="flex w-full items-center justify-between border-b border-border pb-4">
        <div className="flex w-full items-center justify-center gap-4 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`flex shrink-0 items-center gap-0 rounded-[--radius] ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <HelpButton
        href={`${process.env.NEXT_PUBLIC_APP_URL}/blog/cmi1yqrmm0001ljkklf1g1w1s`}
      />

      {/* Active Tab Content */}
      <div className="w-full max-w-md">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default PageMetaSettings;
