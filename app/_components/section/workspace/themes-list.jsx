import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTitle } from "../../common/modal/diolog";

const categories = [
  { title: "all", value: "همه" },
  { title: "color", value: "رنگی" },
  { title: "gradient", value: "گرادیانت" },
  { title: "image", value: "با تصویر زمینه" },
];

const ThemesList = ({ themes, isSilver, handleThemeUpdate, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [loadingImages, setLoadingImages] = useState({});
  const [category, setCategory] = useState("all");

  const filteredThemes = (category) => {
    if (category === "all") return themes;
    return themes.filter((theme) => theme.themeCategory === category);
  };

  const handleThemeClick = (theme) => {
    const isAllowedToApplyTheme = theme.isPremium
      ? isSilver
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

  return (
    <div className="flex h-full w-full flex-col justify-center gap-6 pt-8">
      <div className="flex w-full items-center justify-center gap-2">
        {categories.map((el) => {
          return (
            <div
              key={el.value}
              className={cn(
                `flex cursor-pointer items-center justify-center rounded-full border-2 border-primary px-4 py-1 text-base`,
                category === el.title && "bg-primary text-primary-foreground",
              )}
              onClick={() => setCategory(el.title)}
            >
              {el.value}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 px-8 sm:grid-cols-3 sm:px-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredThemes(category)
          ? filteredThemes(category).map((theme) => {
              const isAllowedToApplyTheme = theme.isPremium
                ? isSilver
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
                  <div className="relative aspect-[2/3] w-full">
                    {loadingImages[theme.name] !== false && (
                      <div className="absolute inset-0 animate-pulse bg-muted"></div>
                    )}
                    <Image
                      fill
                      alt="theme preview"
                      src="/album.jpg"
                      className={cn(
                        "object-cover transition-all group-hover:brightness-90",
                        loadingImages[theme.name] !== false && "invisible",
                      )}
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      onLoadingComplete={() => handleImageLoad(theme.name)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                    <div className="absolute bottom-3 left-3">
                      <p className="line-clamp-1 text-sm font-medium text-white">
                        {theme.name}
                      </p>
                      {theme.isPremium && !isSilver && (
                        <span className="mt-1 inline-block rounded-full bg-yellow-500/20 px-1.5 py-0.5 text-[10px] text-yellow-500">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          : "بارگزاری ناموفق"}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="h-[100dvh] rounded-none sm:h-[80vh] sm:rounded-lg">
            <div className="flex h-full flex-col">
              <DialogTitle></DialogTitle>
              {selectedTheme && (
                <div className="flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-lg">
                  <div className="relative flex-1 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
                      <div className="relative h-full w-full">
                        <Image
                          src="/album.jpg"
                          alt="theme preview"
                          fill
                          className="object-contain transition-all duration-300"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
    </div>
  );
};

export default ThemesList;
