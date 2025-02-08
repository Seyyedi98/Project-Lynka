import { useState } from "react";
import SquareButton from "../../common/button/square-button";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { colors, gradient, pattern } from "@/data/colors";
import { Input } from "@/components/ui/input";

const PageBackgroundSettings = () => {
  const [category, setCategory] = useState("color");
  const theme = useSelector((store) => store.page.theme);

  const dispatch = useDispatch();

  const setPageBackground = function (velue) {
    const payload = { ...theme, backgroundValue: velue };
    dispatch({ type: "page/setTheme", payload });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-4 border-b-2 pb-4">
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
      <div className="grid h-[60svh] w-full max-w-sm grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-4 overflow-y-scroll [scrollbar-width:none] md:h-[80vh] md:max-h-full">
        {category === "color" && (
          <>
            <div className="col-span-full my-4 block">
              <p className="mb-4 text-xs text-textLight">
                رنگ دلخواه خود را انتخاب کنید
              </p>
              <Input
                type="color"
                onChange={(e) => setPageBackground(e.target.value)}
              />
            </div>

            {colors.map((color) => (
              <div
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => setPageBackground(color)}
                className={cn(
                  `h-20 w-20 cursor-pointer rounded-full border border-primary duration-200 hover:shadow-xl`,
                  theme.backgroundValue === color && "border-4",
                )}
              ></div>
            ))}
          </>
        )}

        {category === "gradient" &&
          gradient.map((color) => {
            return (
              <div
                key={color}
                style={{ background: color }}
                onClick={() => setPageBackground(color)}
                className={cn(
                  `h-20 w-20 cursor-pointer rounded-full border border-primary duration-200 [scrollbar-width:none] hover:shadow-xl`,
                  theme.backgroundValue === color && "border-4",
                )}
              ></div>
            );
          })}

        {category === "pattern" &&
          pattern.map((color, index) => {
            return (
              <div
                key={index}
                style={{ background: color }}
                onClick={() => setPageBackground(color)}
                className={cn(
                  `h-20 w-20 cursor-pointer rounded-full border border-primary duration-200 [scrollbar-width:none] hover:shadow-xl`,
                  theme.backgroundValue === color && "border-4",
                )}
              ></div>
            );
          })}
      </div>
    </>
  );
};

export default PageBackgroundSettings;
