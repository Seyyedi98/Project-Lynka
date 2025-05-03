"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Gauge, ImageIcon, Palette, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTitle } from "../../common/modal/diolog";
import { Pagination } from "../../common/Pagination";
import ThemePreviewRenderer from "../../preview/Theme-preview-renderer";

const categories = [
  { title: "all", value: "همه", icon: null },
  { title: "color", value: "رنگی", icon: <Palette className="h-4 w-4" /> },
  {
    title: "image",
    value: "با تصویر زمینه",
    icon: <ImageIcon className="h-4 w-4" />,
  },
];

const ThemesList = ({ themes, isPremium, handleThemeUpdate, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [loadingImages, setLoadingImages] = useState({});
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Initialize loading states for all themes
  useEffect(() => {
    const initialLoadingStates = {};
    themes.forEach((theme) => {
      initialLoadingStates[theme.name] = true;
    });
    setLoadingImages(initialLoadingStates);
  }, [themes]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const filteredThemes = (category) => {
    if (category === "all") return themes;
    return themes.filter((theme) => theme.themeCategory === category);
  };

  const currentThemes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredThemes(category).slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredThemes(category).length / itemsPerPage);

  const handleThemeClick = (theme) => {
    const isAllowedToApplyTheme = theme.isPremium
      ? isPremium
        ? true
        : false
      : true;

    if (isAllowedToApplyTheme) {
      setSelectedTheme(theme);
      setIsModalOpen(true);
    }
  };

  const handleSelectTheme = () => {
    if (selectedTheme) {
      handleThemeUpdate(selectedTheme, true);
      setIsModalOpen(false);
      toast.success("تم جدید با موفقیت اعمال شد");
    }
  };

  const handleImageLoad = (themeName) => {
    setLoadingImages((prev) => ({ ...prev, [themeName]: false }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex h-full w-full flex-col justify-center gap-6 pt-8">
      {/* Theme categories */}
      <div className="flex w-full items-center justify-between border-b border-border pb-4">
        <div className="flex w-full items-center justify-center gap-2 overflow-x-auto pb-1">
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
              {tab.value}
            </Button>
          ))}
        </div>
      </div>

      {/* List of Themes */}
      <div className="grid grid-cols-1 gap-6 px-8 sm:grid-cols-3 sm:px-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {currentThemes().map((theme) => {
          const isAllowedToApplyTheme = theme.isPremium
            ? isPremium
              ? true
              : false
            : true;

          return (
            <div
              className={cn(
                "group relative h-full w-full overflow-hidden rounded-lg transition-all",
                !isAllowedToApplyTheme
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:scale-[1.03] hover:shadow-md",
                className,
              )}
              onClick={() => handleThemeClick(theme)}
              key={theme.name}
            >
              <div className="relative aspect-[3/5] w-full sm:aspect-[2/3]">
                {loadingImages[theme.name] && (
                  <div className="absolute inset-0 animate-pulse bg-muted"></div>
                )}
                <ThemePreviewRenderer
                  theme={theme}
                  onLoad={() => handleImageLoad(theme.name)}
                  style={{
                    display: loadingImages[theme.name] ? "none" : "block",
                  }}
                />
                {!loadingImages[theme.name] && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                    <div className="absolute bottom-3 left-3">
                      {theme.isPremium && !isPremium && (
                        <span className="mt-1 inline-block rounded-full bg-yellow-500/20 px-1.5 py-0.5 text-[10px] text-yellow-500">
                          پرمیوم
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {/* Preview specific theme */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="h-[100dvh] rounded-none sm:h-[80vh] sm:rounded-lg">
            <div className="flex h-full flex-col">
              <DialogTitle></DialogTitle>
              {selectedTheme && (
                <div className="flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-lg">
                  <div className="relative flex-1 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
                      <div className="relative h-full w-full max-w-sm">
                        {loadingImages[selectedTheme.name] && (
                          <div className="absolute inset-0 animate-pulse bg-muted"></div>
                        )}
                        <ThemePreviewRenderer
                          theme={selectedTheme}
                          onLoad={() => handleImageLoad(selectedTheme.name)}
                          style={{
                            display: loadingImages[selectedTheme.name]
                              ? "none"
                              : "block",
                          }}
                        />
                        {!loadingImages[selectedTheme.name] && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex gap-2 p-4">
                      <Button
                        onClick={handleSelectTheme}
                        className="w-full bg-gradient-to-r from-primary to-secondary py-4 text-lg font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:from-primary-hover hover:to-secondary"
                        size="lg"
                      >
                        انتخاب تم
                        <Sparkles className="mr-2 h-5 w-5" />
                      </Button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-card-light/80 backdrop-blur-sm transition-all hover:-translate-x-0.5 hover:bg-card-light hover:shadow-md"
                      >
                        <ArrowLeft className="h-6 w-6 text-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 pb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ThemesList;
