import useEditor from "@/hooks/useEditor";
import useModal from "@/hooks/useModal";
import { HeroController } from "../controller/hero-controller";
import { useState } from "react";

const HeroThemeSelector = () => {
  const { hero, updateHero, setSelectedElement } = useEditor();
  const [themeCategory, setThemeCategory] = useState("color"); // color || pattern || gradient || image
  const { closeMenu } = useModal();

  const Themes = HeroController;
  if (!Themes) throw new Error("Cannot load hero themes");
  const themesList = Object.keys(Themes);

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between gap-2">
        <div
          onClick={() => setThemeCategory("color")}
          className="grid h-20 w-20 place-items-center rounded-md border bg-primary-foreground"
        >
          رنگ
        </div>
        <div
          onClick={() => setThemeCategory("pattern")}
          className="grid h-20 w-20 place-items-center rounded-md border bg-primary-foreground"
        >
          الگو
        </div>
        <div
          onClick={() => setThemeCategory("gradient")}
          className="grid h-20 w-20 place-items-center rounded-md border bg-primary-foreground"
        >
          گرادیانت
        </div>
        <div
          onClick={() => setThemeCategory("image")}
          className="grid h-20 w-20 place-items-center rounded-md border bg-primary-foreground"
        >
          تصویر
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {themesList.map((theme, index) => {
          return (
            <div
              key={(index, theme)}
              onClick={() => {
                updateHero({
                  ...hero,
                  extraAttributes: {
                    ...hero.extraAttributes,
                    style: theme,
                  },
                });
                closeMenu();
              }}
            >
              {theme}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeroThemeSelector;
