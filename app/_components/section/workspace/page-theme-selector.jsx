import { themes } from "@/data/themes";
import { useDispatch, useSelector } from "react-redux";

const PageThemeSelector = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.page.elements);
  const hero = useSelector((state) => state.page.hero);
  const prevTheme = useSelector((store) => store.page.theme);

  const updateElementStyle = ({ theme, textColor }) => {
    elements.map((element) => {
      const payload = {
        id: element.id,
        updatedElement: {
          ...element,
          extraAttributes: {
            ...element.extraAttributes,
            theme,
            textColor,
          },
        },
      };

      dispatch({
        type: "page/updateElement",
        payload: payload,
      });
    });
  };

  const updateHeroStyle = ({
    style,
    heroType, // outdated
    titleFont,
    subtitleFont,
    titleColor,
    subtitleColor,
  }) => {
    const newHero = {
      ...hero,
      extraAttributes: {
        ...hero.extraAttributes,
        style,
        heroType,
        titleFont,
        subtitleFont,
        titleColor,
        subtitleColor,
      },
    };

    dispatch({
      type: "page/setHero",
      payload: newHero,
    });
  };

  const updateThemeAndBackground = ({ theme }) => {
    dispatch({ type: "page/setTheme", payload: theme });
  };

  const handleThemeUpdate = (theme) => {
    updateThemeAndBackground({ theme });

    updateHeroStyle({
      style: theme.heroStyle,
      heroType: theme.heroType, // outdated
      titleFont: theme.heroTitleFont,
      subtitleFont: theme.heroSubtitleFont,
      titleColor: theme.heroTitleColor,
      subtitleColor: theme.heroSubtitleColor,
    });

    updateElementStyle({
      theme: theme.name,
      textColor: theme.elementTextColor,
      bgColor: theme.elementColor,
    });
  };

  return (
    <div>
      <h4>PageThemeSelector</h4>
      <div>
        {themes.map((theme) => (
          <p onClick={() => handleThemeUpdate(theme)} key={theme.name}>
            {theme.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PageThemeSelector;
