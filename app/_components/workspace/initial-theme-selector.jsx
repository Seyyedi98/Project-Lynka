"use client";

import { UpdatePageContent, UpdatePageTheme } from "@/actions/page/page";
import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import ExpandableThemeGridCard from "../common/card/expandable-grid-card-theme";
import { PageHeroElement } from "../elements/hero/page-hero-element";
import { idGenerator } from "@/lib/id-generator";
import { themes } from "@/data/themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Palette, Image as ImageIcon, Gauge, Sparkles } from "lucide-react";
import { Pagination } from "../common/Pagination";

const categories = [
  { title: "all", value: "همه", icon: <Sparkles className="h-4 w-4" /> },
  { title: "color", value: "رنگی", icon: <Palette className="h-4 w-4" /> },
  { title: "gradient", value: "گرادیانت", icon: <Gauge className="h-4 w-4" /> },
  {
    title: "image",
    value: "تصویر زمینه",
    icon: <ImageIcon className="h-4 w-4" />,
  },
];

const InitialThemeSelector = ({ uri }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredThemes = () => {
    if (category === "all") return themes;
    return themes.filter((theme) => theme.themeCategory === category);
  };

  const currentThemes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredThemes().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredThemes().length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const onSelect = async (theme) => {
    const heroElement = PageHeroElement.construct(idGenerator());

    const StyledHeroElement = [
      {
        ...heroElement,
        extraAttributes: {
          ...heroElement.extraAttributes,
          style: theme.heroStyle,
          heroType: theme.heroType,
          heroValue: theme.heroValue,
        },
      },
    ];

    const fullContent = [StyledHeroElement, []];
    const JSONElement = JSON.stringify(fullContent);
    const JSONTheme = JSON.stringify(theme);

    startTransition(() => {
      UpdatePageTheme(uri, JSONTheme).then(
        UpdatePageContent(uri, JSONElement).then((data) => {
          if (data.success) router.refresh();
        }),
      );
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      {/* Mobile Category Tabs (hidden on desktop) */}
      <div className="sticky top-0 z-10 flex w-full justify-center border-b border-border bg-background/95 py-3 backdrop-blur-sm lg:hidden">
        <div className="flex items-center gap-2 overflow-x-auto px-4 pb-1">
          {categories.map((tab) => (
            <Button
              key={tab.title}
              variant={category === tab.title ? "default" : "ghost"}
              className={`flex shrink-0 items-center gap-2 rounded-[--radius] ${
                category === tab.title
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }`}
              onClick={() => setCategory(tab.title)}
            >
              {tab.icon}
              <span className="text-sm">{tab.value}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden w-64 shrink-0 border-r border-border lg:block">
        <div className="h-full overflow-y-auto p-6">
          <div className="space-y-1">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="h-5 w-5" />
              دسته بندی تم ها
            </h3>
            {categories.map((tab) => (
              <button
                key={tab.title}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-right text-sm transition-colors hover:bg-accent",
                  category === tab.title &&
                    "bg-primary text-primary-foreground",
                )}
                onClick={() => setCategory(tab.title)}
              >
                {tab.icon}
                <span>{tab.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 place-items-center gap-6 p-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {currentThemes().map((theme, index) => (
            <ExpandableThemeGridCard
              key={`${theme}-${index}`}
              isPending={isPending}
              onSelect={onSelect}
              theme={theme}
              className="h-[320px] w-full"
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 pb-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InitialThemeSelector;
