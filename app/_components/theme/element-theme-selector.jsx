import useEditor from "@/hooks/useEditor";
import useModal from "@/hooks/useModal";
import { ThemeController } from "../controller/theme-controller";
import { useState } from "react";

const ElementThemeSelector = ({ elementInstance }) => {
  const { updateElement, setSelectedElement } = useEditor();
  const [themeCategory, setThemeCategory] = useState("color"); // color || pattern || gradient || image
  const { closeMenu } = useModal();
  const element = elementInstance;
  const elementType = elementInstance?.type;

  const Themes = ThemeController[elementType];

  if (!Themes) return;
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
          const RenderedElement = ThemeController[element.type][theme];
          return (
            <div
              key={(index, theme)}
              className="scale-[0.85] cursor-pointer transition-all duration-200 hover:scale-[0.87] hover:shadow-xl"
              onClick={() => {
                updateElement(element.id, {
                  ...element,
                  extraAttributes: {
                    ...element.extraAttributes,
                    theme,
                  },
                });
                closeMenu();
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
