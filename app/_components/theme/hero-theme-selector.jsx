import useFilterTheme from "@/hooks/useFilterTheme";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SquareButton from "../common/button/square-button";
import { HeroController } from "../controller/hero-controller";

const HeroThemeSelector = () => {
  const dispatch = useDispatch();
  const hero = useSelector((state) => state.page.hero);

  const [themeCategory, setThemeCategory] = useState("color"); // color || pattern || gradient || image

  const Themes = HeroController;
  if (!Themes) throw new Error("Cannot load hero themes");

  const filteredThemesList = useFilterTheme(Themes, themeCategory);
  const themesList = Object.keys(Themes);

  return (
    <div className="h-full w-full overflow-auto">
      <div className="grid w-full grid-cols-1 gap-x-2 gap-y-8 px-2 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {themesList.map((theme, index) => {
          return (
            <div
              className="mx-auto"
              key={(index, theme)}
              onClick={() => {
                dispatch({
                  type: "page/setHero",
                  payload: {
                    ...hero,
                    extraAttributes: {
                      ...hero.extraAttributes,
                      style: theme,
                    },
                  },
                });

                dispatch({ type: "modal/closeMenu" });

                setTimeout(
                  () =>
                    dispatch({
                      type: "page/setSelectedElement",
                      payload: null,
                    }),
                  200,
                );
              }}
            >
              <div className="h-96 w-60 cursor-pointer bg-gray-500 transition-transform duration-200 hover:scale-105">
                {theme}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroThemeSelector;
