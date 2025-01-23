import useEditor from "@/hooks/useEditor";
import useModal from "@/hooks/useModal";
import { ThemeController } from "../controller/theme-controller";

const ElementThemeSelector = ({ elementInstance }) => {
  const { updateElement } = useEditor();
  const { closeMenu } = useModal();
  const element = elementInstance;
  const elementType = elementInstance?.type;

  const Themes = ThemeController[elementType];
  const themesList = Object.keys(Themes);

  return (
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
  );
};

export default ElementThemeSelector;
