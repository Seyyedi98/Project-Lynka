"use client";

import { UpdatePageContent, UpdatePageTheme } from "@/actions/page/page";
import { Button } from "@/components/ui/button";
import { themes } from "@/data/themes";
import { idGenerator } from "@/lib/id-generator";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Crown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Pagination } from "../common/Pagination";
import { Dialog, DialogContent, DialogTitle } from "../common/modal/diolog";
import { PageHeroElement } from "../elements/hero/page-hero-element";
import ThemePreviewRenderer from "../preview/Theme-preview-renderer";
import { currentUserSubscription } from "@/lib/auth/user-subscription";

const categories = [
  { title: "all", value: "همه", icon: <Sparkles className="h-4 w-4" /> },
  { title: "color", value: "رنگی", icon: <Palette className="h-4 w-4" /> },
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [loadingImages, setLoadingImages] = useState({});
  const itemsPerPage = 12;
  const [loadingIsPremium, setLoadingIsPremium] = useState(true);
  const [isPremium, setIsPremium] = useState(null); // Start as null to indicate not loaded

  useEffect(() => {
    const checkPremiumUser = async () => {
      try {
        const { isPremium } = await currentUserSubscription();
        setIsPremium(isPremium);
      } catch (error) {
        console.error("Error fetching subscription:", error);
        setIsPremium(false); // Set to false on error to prevent infinite loading
      } finally {
        setLoadingIsPremium(false);
      }
    };
    checkPremiumUser();
  }, []);

  useEffect(() => {
    if (!loadingIsPremium && isPremium !== null) {
      const initialLoadingStates = {};
      themes.forEach((theme) => {
        initialLoadingStates[theme.name] = true;
      });
      setLoadingImages(initialLoadingStates);
    }
  }, [loadingIsPremium, isPremium]);

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
    // Double check premium status before applying premium theme
    if (theme.isPremium && !isPremium) {
      return;
    }

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

  const handleThemeClick = (theme) => {
    // Prevent clicking on premium themes for non-premium users
    if (theme.isPremium && !isPremium) {
      return;
    }
    setSelectedTheme(theme);
    setIsModalOpen(true);
  };

  const handleSelectTheme = () => {
    if (selectedTheme) {
      onSelect(selectedTheme);
    }
  };

  const handleImageLoad = (themeName) => {
    setLoadingImages((prev) => ({ ...prev, [themeName]: false }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading state while checking premium status
  if (loadingIsPremium || isPremium === null) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Show error if premium status failed to load
  if (isPremium === null && !loadingIsPremium) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center text-destructive">
          <p className="text-lg font-medium">خطا در اتصال</p>
          <p className="mt-2 text-sm text-muted-foreground">
            لطفاً اتصال اینترنت خود را بررسی کرده و مجدداً تلاش کنید.
          </p>
        </div>
      </div>
    );
  }

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

      {/* Main Content Area with Fixed Pagination */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 place-items-center gap-6 p-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {currentThemes().map((theme) => {
              const isPremiumLocked = theme.isPremium && !isPremium;

              return (
                <div
                  className={cn(
                    "group relative h-full w-full overflow-hidden rounded-lg transition-all",
                    isPremiumLocked
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer hover:shadow-md",
                  )}
                  onClick={() => !isPremiumLocked && handleThemeClick(theme)}
                  key={theme.name}
                >
                  <div className="relative aspect-[3/5] w-full sm:aspect-[3/5]">
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
                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent",
                            isPremiumLocked ? "opacity-90" : "opacity-80",
                          )}
                        ></div>
                        <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                          {theme.isPremium && (
                            <span
                              className={cn(
                                "inline-block rounded-full px-1.5 py-0.5 text-[10px]",
                                isPremiumLocked
                                  ? "bg-gray-500/20 text-gray-400"
                                  : "bg-yellow-500/20 text-yellow-500",
                              )}
                            >
                              {isPremiumLocked ? (
                                <span className="flex items-center gap-1">
                                  <Crown className="h-3 w-3" />
                                  قفل شده
                                </span>
                              ) : (
                                "پرمیوم"
                              )}
                            </span>
                          )}
                        </div>

                        {/* Premium Lock Overlay */}
                        {isPremiumLocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="text-center text-white">
                              <Crown className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
                              <p className="px-2 text-xs font-medium">
                                برای استفاده از این تم نیاز به اشتراک ویژه دارید
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fixed Pagination at Bottom */}
        {totalPages > 1 && (
          <div className="sticky bottom-0 z-10 border-t border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}

        {/* Theme Preview Dialog */}
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
                        disabled={isPending}
                      >
                        {isPending ? "در حال اعمال..." : "انتخاب تم"}
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
    </div>
  );
};

export default InitialThemeSelector;
