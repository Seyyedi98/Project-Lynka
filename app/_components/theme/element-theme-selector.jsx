import useModal from "@/hooks/useModal";
import { ThemeController } from "../controller/theme-controller";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";

const ElementThemeSelector = ({ elementInstance }) => {
  const dispatch = useDispatch();
  const [themeCategory, setThemeCategory] = useState("color"); // color || pattern || gradient || image
  const { closeMenu } = useModal();
  const element = elementInstance;
  const elementType = elementInstance?.type;

  const Themes = ThemeController[elementType];

  if (!Themes) return;
  const themesList = Object.keys(Themes);

  return (
    <>
      <div className="mb-4 flex w-full flex-grow items-center justify-between gap-2">
        <CategoryButton
          setThemeCategory={setThemeCategory}
          themeCategory={themeCategory}
          category="color"
        >
          رنگ
        </CategoryButton>
        <CategoryButton
          setThemeCategory={setThemeCategory}
          themeCategory={themeCategory}
          category="pattern"
        >
          الگو
        </CategoryButton>
        <CategoryButton
          setThemeCategory={setThemeCategory}
          themeCategory={themeCategory}
          category="gradient"
        >
          گرادیانت
        </CategoryButton>
        <CategoryButton
          setThemeCategory={setThemeCategory}
          themeCategory={themeCategory}
          category="image"
        >
          تصویر
        </CategoryButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
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

                closeMenu();
                setTimeout(
                  dispatch({ type: "page/setSelectedElement", payload: null }),
                  200,
                );
              }}
            >
              <RenderedElement title={theme} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ElementThemeSelector;

const CategoryButton = ({
  themeCategory,
  setThemeCategory,
  category,
  children,
}) => {
  return (
    <div
      onClick={() => setThemeCategory(category)}
      className={cn(
        `grid h-10 w-20 min-w-20 cursor-pointer place-items-center rounded-md border bg-primary-foreground transition-colors duration-200`,
        themeCategory === category && "bg-primary text-primary-foreground",
      )}
    >
      {children}
    </div>
  );
};
