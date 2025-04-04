import { themes } from "@/data/themes";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../common/modal/diolog";
import ThemesList from "./themes-list";

const PageThemeSelector = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.page.elements, shallowEqual);
  const hero = useSelector((state) => state.page.hero);
  const prevTheme = useSelector((store) => store.page.theme);
  const { isSilver } = useUserSubscription();

  // Update the theme and background of the page based on the selected theme
  const updateElementStyle = ({
    theme,
    type,
    textColor,
    bgColor,
    borderRadius,
  }) => {
    elements.map((element) => {
      const payload = {
        id: element.id,
        updatedElement: {
          ...element,
          extraAttributes: {
            ...element.extraAttributes,
            theme,
            type,
            textColor,
            bgColor,
            borderRadius,
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

  const handleThemeUpdate = (theme, isAllowedToApplyTheme) => {
    isAllowedToApplyTheme && updateThemeAndBackground({ theme });

    isAllowedToApplyTheme &&
      updateHeroStyle({
        style: theme.heroStyle,
        heroType: theme.heroType, // outdated
        titleFont: theme.heroTitleFont,
        subtitleFont: theme.heroSubtitleFont,
        titleColor: theme.heroTitleColor,
        subtitleColor: theme.heroSubtitleColor,
      });

    isAllowedToApplyTheme &&
      updateElementStyle({
        theme: theme.elementStyle,
        textColor: theme.elementTextColor,
        bgColor: theme.elementColor,
        borderRadius: theme.borderRadius,
      });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full">
          <div
            variant="primary_2"
            className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-primary text-white transition-colors duration-200 hover:bg-primary-hover"
          >
            انتخاب تم صفحه
          </div>
        </DialogTrigger>
        <DialogContent className="flex h-screen max-h-svh w-screen max-w-full flex-grow flex-col gap-0 overflow-y-scroll p-0">
          <DialogHeader className="pt-16">
            <DialogTitle className="px-10">تم صفحه را تغییر دهید</DialogTitle>
            <DialogDescription></DialogDescription>

            <ThemesList
              isSilver={isSilver}
              handleThemeUpdate={handleThemeUpdate}
              themes={themes}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div></div>
    </div>
  );
};

export default PageThemeSelector;
