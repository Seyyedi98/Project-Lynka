import { Input } from "@/components/ui/input";
import { colors, gradient, pattern } from "@/data/colors";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SquareButton from "../../common/button/square-button";
import PageBgImageForm from "../../common/form/page-bg-image-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PageBackgroundSettings = () => {
  const [category, setCategory] = useState("color");
  const theme = useSelector((store) => store.page.theme);

  const dispatch = useDispatch();

  const setPageBackground = function (velue, type) {
    const payload = {
      ...theme,
      backgroundColor: velue,
      backgroundType: type,
    };
    dispatch({ type: "page/setTheme", payload });
  };

  const toggleIsBackgroundAnimated = function () {
    const payload = {
      ...theme,
      isBackgroundAnimated: !theme.isBackgroundAnimated,
    };
    dispatch({ type: "page/setTheme", payload });
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b-2 pb-2 md:gap-[10px]">
        <SquareButton state={category} action={setCategory} rule="color">
          رنگ
        </SquareButton>
        <SquareButton state={category} action={setCategory} rule="gradient">
          طیف رنگی
        </SquareButton>
        <SquareButton state={category} action={setCategory} rule="pattern">
          الگو
        </SquareButton>
        <SquareButton state={category} action={setCategory} rule="image">
          تصویر
        </SquareButton>
      </div>
      <div className="grid h-[60svh] w-full max-w-sm grid-cols-[repeat(auto-fit,minmax(80px,1fr))] place-items-center gap-4 overflow-y-scroll [scrollbar-width:none] md:h-[80vh] md:max-h-full">
        {category === "color" && (
          <>
            <div className="col-span-full my-2 block w-full">
              <p className="mb-4 text-xs text-textLight">
                رنگ دلخواه خود را انتخاب کنید
              </p>
              <Input
                type="color"
                defaultValue={
                  theme?.backgroundType === "color"
                    ? theme?.backgroundColor
                    : "#FFFFFF"
                }
                onChange={(e) => setPageBackground(e.target.value, "color")}
              />
            </div>

            {colors.map((color) => (
              <div
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => setPageBackground(color, "color")}
                className={cn(
                  `h-20 w-20 cursor-pointer rounded-full border border-primary duration-200 hover:shadow-xl`,
                  theme.backgroundColor === color && "border-4",
                )}
              ></div>
            ))}
          </>
        )}

        {category === "gradient" && (
          <>
            <div className="col-span-full mb-3 flex w-[99%] items-center justify-between space-x-2 rounded-md border border-primary/50 p-4 py-6">
              <Label htmlFor="animation-toggle">پس زمینه متحرک</Label>
              <Switch
                checked={theme.isBackgroundAnimated}
                onCheckedChange={toggleIsBackgroundAnimated}
                id="animation-toggle"
              />
            </div>

            {gradient.map((color) => {
              return (
                <div
                  key={color}
                  style={{ background: color }}
                  onClick={() => setPageBackground(color, "gradient")}
                  className={cn(
                    `h-20 w-20 cursor-pointer rounded-full border border-primary duration-200 [scrollbar-width:none] hover:shadow-xl`,
                    theme.backgroundColor === color && "border-4",
                  )}
                ></div>
              );
            })}
          </>
        )}

        {category === "pattern" &&
          pattern.map((color, index) => {
            return (
              <div
                key={index}
                style={{ background: color }}
                onClick={() => setPageBackground(color, "pattern")}
                className={cn(
                  `h-20 w-20 cursor-pointer rounded-full border border-primary duration-200 [scrollbar-width:none] hover:shadow-xl`,
                  theme.backgroundColor === color && "border-4",
                )}
              ></div>
            );
          })}

        {category === "image" && (
          <div className="h-full">
            <PageBgImageForm
              theme={theme}
              bgType={theme.backgroundType}
              image={theme.backgroundColor}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PageBackgroundSettings;
