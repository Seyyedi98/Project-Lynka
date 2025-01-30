import useFilterTheme from "@/hooks/useFilterTheme";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SquareButton from "../common/button/square-button";
import { HeroController } from "../controller/hero-controller";

const HeroThemeSelector = () => {
  const dispatch = useDispatch();
  const hero = useSelector((state) => state.page.hero);

  const [themeCategory, setThemeCategory] = useState("color"); // color || pattern || gradient || image
  const { closeMenu } = useModal();

  const Themes = HeroController;
  if (!Themes) throw new Error("Cannot load hero themes");

  const filteredThemesList = useFilterTheme(Themes, themeCategory);

  return (
    <>
      <div className="mb-4 flex w-full flex-grow items-center justify-between gap-2">
        <SquareButton
          action={setThemeCategory}
          state={themeCategory}
          rule="color"
        >
          رنگ
        </SquareButton>
        <SquareButton
          action={setThemeCategory}
          state={themeCategory}
          rule="pattern"
        >
          الگو
        </SquareButton>
        <SquareButton
          action={setThemeCategory}
          state={themeCategory}
          rule="gradient"
        >
          گرادیانت
        </SquareButton>
        <SquareButton
          action={setThemeCategory}
          state={themeCategory}
          rule="image"
        >
          تصویر
        </SquareButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {filteredThemesList.map((theme, index) => {
          return (
            <div
              key={(index, theme)}
              onClick={() => {
                dispatch({
                  type: "page/setHero",
                  payload: {
                    ...hero,
                    extraAttributes: {
                      ...hero.extraAttributes,
                      style: theme[0],
                    },
                  },
                });
                closeMenu();
              }}
            >
              {theme[0]}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeroThemeSelector;
