import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThemeController } from "../controller/theme-controller";
import SquareButton from "../common/button/square-button";

const ElementThemeSelector = ({ elementInstance }) => {
  const dispatch = useDispatch();
  const [themeCategory, setThemeCategory] = useState("color"); // color || pattern || gradient || image
  const element = elementInstance;
  const elementType = elementInstance?.type;

  const Themes = ThemeController[elementType];

  if (!Themes) return;
  const themesList = Object.keys(Themes);

  return (
    <div>
      <div className="mb-4 mt-0 flex w-full items-center justify-between gap-2 md:mt-10">
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

      <div className="grid grid-cols-1 justify-start sm:grid-cols-2">
        {themesList.map((theme, index) => {
          const RenderedElement = ThemeController[element.type][theme];

          return (
            <div
              key={(index, theme)}
              className="scale-[0.85] cursor-pointer transition-all duration-200 hover:scale-[0.87] hover:shadow-xl"
              onClick={() => {
                const payload = {
                  id: element.id,
                  updatedElement: {
                    ...element,
                    extraAttributes: {
                      ...element.extraAttributes,
                      theme,
                    },
                  },
                };
                dispatch({ type: "page/updateElement", payload });

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
              <RenderedElement title={theme} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElementThemeSelector;
