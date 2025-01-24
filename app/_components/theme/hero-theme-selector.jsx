import useEditor from "@/hooks/useEditor";
import useModal from "@/hooks/useModal";
import { HeroController } from "../controller/hero-controller";

const HeroThemeSelector = () => {
  const { hero, updateHero } = useEditor();
  const { closeMenu } = useModal();

  const Themes = HeroController;
  if (!Themes) throw new Error("Cannot load hero themes");

  const themesList = Object.keys(Themes);

  return (
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
  );
};

export default HeroThemeSelector;
