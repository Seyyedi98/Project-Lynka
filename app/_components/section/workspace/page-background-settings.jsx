"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Palette, Image as ImageIcon, Gauge, Hash } from "lucide-react";
import { colors, gradient, pattern } from "@/data/colors";
import { cn } from "@/lib/utils";
import PageBgImageForm from "../../common/form/page-bg-image-form";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const PageBackgroundSettings = () => {
  const [activeTab, setActiveTab] = useState("color");
  const [isPending, setIsPending] = useState(false);
  const theme = useSelector((store) => store.page.theme);
  const [selectedColor, setSelectedColor] = useState(
    theme?.backgroundType === "color" ? theme?.backgroundColor : "#ffffff",
  );
  const dispatch = useDispatch();

  const tabs = [
    {
      id: "color",
      label: "رنگ",
      icon: <Palette className="h-4 w-4" />,
    },
    {
      id: "gradient",
      label: "طیف رنگی",
      icon: <Gauge className="h-4 w-4" />,
    },
    {
      id: "pattern",
      label: "الگو",
      icon: <Hash className="h-4 w-4" />,
    },
    {
      id: "image",
      label: "تصویر",
      icon: <ImageIcon className="h-4 w-4" />,
    },
  ];

  const applyBackgroundChange = (value, type) => {
    if (theme.backgroundType === type && theme.backgroundColor === value) {
      return;
    }

    try {
      setIsPending(true);
      const payload = {
        ...theme,
        backgroundColor: value,
        backgroundType: type,
      };
      dispatch({ type: "page/setTheme", payload });
      toast.success("پس‌زمینه با موفقیت تغییر کرد");
    } catch (error) {
      toast.error("خطا در تغییر پس‌زمینه");
    } finally {
      setIsPending(false);
    }
  };

  const toggleIsBackgroundAnimated = () => {
    const payload = {
      ...theme,
      isBackgroundAnimated: !theme.isBackgroundAnimated,
    };
    dispatch({ type: "page/setTheme", payload });
    toast.success(
      `پس‌زمینه ${payload.isBackgroundAnimated ? "متحرک" : "ثابت"} شد`,
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation */}
      <div className="flex w-full items-center justify-between border-b border-border pb-4">
        <div className="flex w-full items-center justify-between gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`flex shrink-0 items-center gap-2 rounded-[--radius] ${
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

      {/* Active Tab Content */}
      <div className="grid h-[60svh] w-full grid-cols-[repeat(auto-fit,minmax(80px,1fr))] place-items-center gap-4 overflow-y-scroll [scrollbar-width:none] md:h-[80vh]">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Color Tab */}
        {activeTab === "color" && (
          <>
            <div className="col-span-full my-2 w-full space-y-4 px-4">
              <div className="flex items-center gap-4">
                <div className="relative w-full">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="h-12 w-full cursor-pointer appearance-none rounded-md border border-input bg-background"
                  />
                </div>

                <Button
                  onClick={() => applyBackgroundChange(selectedColor, "color")}
                  disabled={isPending}
                >
                  اعمال رنگ
                </Button>
              </div>
            </div>

            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  applyBackgroundChange(color, "color");
                }}
                className={cn(
                  "h-20 w-20 rounded-xl border-2 transition-all hover:shadow-md",
                  theme.backgroundType === "color" &&
                    theme.backgroundColor === color
                    ? "border-primary ring-4 ring-primary/30"
                    : "border-muted",
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </>
        )}

        {/* Gradient Tab */}
        {activeTab === "gradient" && (
          <>
            <div className="col-span-full mb-3 flex w-full items-center justify-between rounded-md border border-border p-4">
              <span className="text-sm">پس‌زمینه متحرک</span>
              <input
                type="checkbox"
                checked={theme.isBackgroundAnimated}
                onChange={toggleIsBackgroundAnimated}
                className="h-5 w-5 cursor-pointer"
              />
            </div>

            {gradient.map((grad) => (
              <button
                key={grad}
                onClick={() => applyBackgroundChange(grad, "gradient")}
                className={cn(
                  "h-20 w-20 rounded-xl border-2 transition-all hover:shadow-md",
                  theme.backgroundType === "gradient" &&
                    theme.backgroundColor === grad
                    ? "border-primary ring-4 ring-primary/30"
                    : "border-muted",
                )}
                style={{ background: grad }}
              />
            ))}
          </>
        )}

        {/* Pattern Tab */}
        {activeTab === "pattern" && (
          <>
            <div className="col-span-full my-2 w-full">
              <span className="text-sm">الگوهای پس‌زمینه</span>
            </div>

            {pattern.map((pat, index) => (
              <button
                key={index}
                onClick={() => applyBackgroundChange(pat, "pattern")}
                className={cn(
                  "h-20 w-20 rounded-xl border-2 transition-all hover:shadow-md",
                  theme.backgroundType === "pattern" &&
                    theme.backgroundColor === pat
                    ? "border-primary ring-4 ring-primary/30"
                    : "border-muted",
                )}
                style={{ background: pat }}
              />
            ))}
          </>
        )}

        {/* Image Tab */}
        {activeTab === "image" && (
          <div className="col-span-full h-full w-full">
            <PageBgImageForm
              theme={theme}
              bgType={theme.backgroundType}
              image={theme.backgroundColor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBackgroundSettings;
