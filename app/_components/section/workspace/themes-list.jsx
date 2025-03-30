import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const ThemesList = ({ themes, isSilver, handleThemeUpdate, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [loadingImages, setLoadingImages] = useState({});

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
    }
  };

  const handleImageLoad = (themeName) => {
    setLoadingImages((prev) => ({ ...prev, [themeName]: false }));
  };

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {themes.map((theme) => {
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
                <div className="absolute inset-0 animate-pulse bg-gray-300"></div>
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
      })}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="h-[100dvh] max-w-[100vw] rounded-none p-0 sm:h-[80vh] sm:max-w-2xl sm:rounded-lg sm:p-6">
          <div className="flex h-full flex-col">
            <DialogHeader className="px-4 pt-4 sm:px-0 sm:pt-0">
              <DialogTitle>Apply {selectedTheme?.name} Theme</DialogTitle>
              <DialogDescription>
                Preview and confirm your theme selection
              </DialogDescription>
            </DialogHeader>

            {selectedTheme && (
              <div className="flex h-full flex-col">
                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <Image
                      src="/album.jpg"
                      alt="theme preview"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                </div>

                <div className="w-full p-4 sm:bg-transparent sm:p-0">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="py-6 text-lg sm:py-3 sm:text-base"
                      size="lg"
                    >
                      <ChevronLeft className="mr-2 h-5 w-5" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSelectTheme}
                      className="py-6 text-lg sm:py-3 sm:text-base"
                      size="lg"
                    >
                      Select Theme
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThemesList;
