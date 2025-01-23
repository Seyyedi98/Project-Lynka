import { Button } from "@/components/ui/button";
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

  //   themes.map((theme) => console.log(theme));
  return (
    <div>
      {themesList.map((theme, index) => (
        <Button
          key={(index, theme)}
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
          {theme}
        </Button>
      ))}
    </div>
  );
};

export default ElementThemeSelector;
