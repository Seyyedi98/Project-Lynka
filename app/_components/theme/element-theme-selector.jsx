import { useState } from "react";
import { useDispatch } from "react-redux";
import SquareButton from "../common/button/square-button";
import { ElementThemeController } from "../controller/element-theme-controller";
import useFilterTheme from "@/hooks/useFilterTheme";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";

const ElementThemeSelector = ({ elementInstance }) => {
  const dispatch = useDispatch();
  const [themeCategory, setThemeCategory] = useState("color"); // color || pattern || gradient || image
  const element = elementInstance;
  const elementType = elementInstance?.type;
  const { isSilver } = useUserSubscription();

  const Themes = ElementThemeController[elementType];

  const filteredThemesList = useFilterTheme(Themes, "color");

  if (!Themes) return;
  const themesList = Object.keys(Themes);

  return (
    <div>
      <div className="mb-4 mt-0 flex w-full items-center justify-between gap-2">
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

      <div className="grid grid-cols-1 justify-start">
        {themesList.map((theme, index) => {
          const isPremiumTheme = Themes[theme][2].isPremium;
          const isAllowedToApplyTheme = isPremiumTheme
            ? isSilver
              ? true
              : false
            : true;

          const RenderedElement =
            ElementThemeController[element.type][theme][0];

          return (
            <div
              key={(index, theme)}
              className={cn(
                `relative scale-[0.85] transition-all duration-200 hover:scale-[0.87] hover:shadow-xl`,
                !isAllowedToApplyTheme
                  ? "pointer-events-none"
                  : "cursor-pointer",
              )}
              onClick={() => {
                const payload = {
                  id: element.id,
                  updatedElement: {
                    ...element,
                    extraAttributes: {
                      ...element.extraAttributes,
                      theme: isAllowedToApplyTheme
                        ? theme
                        : element.extraAttributes.theme,
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
              <div
                className={cn(
                  `left-2 top-1 rounded-full bg-[#CE8946] px-2 py-1 text-xs text-white opacity-100`,
                  !isAllowedToApplyTheme ? "absolute" : "hidden",
                )}
              >
                <p>نیازمند اشتراک ویژه</p>
              </div>
              <div className={cn(!isAllowedToApplyTheme ? "opacity-60" : "")}>
                <RenderedElement
                  theme={element.extraAttributes.theme}
                  bgColor={element.extraAttributes.bgColor}
                  textColor={element.extraAttributes.element}
                  title={element.extraAttributes.title}
                  font={element.extraAttributes.font}
                  borderRadius={element.extraAttributes.borderRadius}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElementThemeSelector;
