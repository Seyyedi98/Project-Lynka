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
  const { isPremium } = useUserSubscription();

  // Update each element's style with the selected theme
  const updateElementStyle = ({
    theme,
    type,
    textColor,
    bgColor,
    borderRadius,
  }) => {
    elements.forEach((element) => {
      dispatch({
        type: "page/updateElement",
        payload: {
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
        },
      });
    });
  };

  // Update hero section styles
  const updateHeroStyle = ({
    style,
    heroType,
    titleFont,
    subtitleFont,
    titleColor,
    subtitleColor,
  }) => {
    dispatch({
      type: "page/setHero",
      payload: {
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
      },
    });
  };

  // Set the overall theme
  const updateThemeAndBackground = ({ theme }) => {
    dispatch({ type: "page/setTheme", payload: theme });
  };

  // Central function to handle theme update logic
  const handleThemeUpdate = (theme, isAllowedToApplyTheme) => {
    if (!isAllowedToApplyTheme) return;

    updateThemeAndBackground({ theme });

    updateHeroStyle({
      style: theme.heroStyle,
      heroType: theme.heroType,
      titleFont: theme.heroTitleFont,
      subtitleFont: theme.heroSubtitleFont,
      titleColor: theme.heroTitleColor,
      subtitleColor: theme.heroSubtitleColor,
    });

    updateElementStyle({
      theme: theme.elementStyle,
      textColor: theme.elementTextColor,
      bgColor: theme.elementColor,
      borderRadius: theme.borderRadius,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-10 w-full rounded-md bg-primary text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-hover">
          انتخاب تم صفحه
        </button>
      </DialogTrigger>

      <DialogContent className="flex h-screen max-h-svh w-screen max-w-full flex-col gap-0 overflow-y-scroll p-0">
        <DialogHeader className="pt-16">
          <DialogTitle className="px-10 text-lg font-bold">
            تم صفحه را تغییر دهید
          </DialogTitle>
          <DialogDescription className="px-10 text-sm text-muted-foreground">
            برای تنظیم استایل کلی صفحه، یکی از تم‌های زیر را انتخاب کنید.
          </DialogDescription>

          <ThemesList
            isPremium={isPremium}
            handleThemeUpdate={handleThemeUpdate}
            themes={themes}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PageThemeSelector;
