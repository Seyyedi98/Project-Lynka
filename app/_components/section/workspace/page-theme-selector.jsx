import { Palette, ChevronRight, Check } from "lucide-react";
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
import { useState } from "react";

const PageThemeSelector = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.page.elements, shallowEqual);
  const hero = useSelector((state) => state.page.hero);
  const prevTheme = useSelector((store) => store.page.theme);
  const { isPremium } = useUserSubscription();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateElementStyle = ({
    theme,
    type,
    textColor,
    bgColor,
    borderRadius,
  }) => {
    elements.forEach((element) => {
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
    heroType,
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

    setIsDialogOpen(false);
  };

  return (
    <div className="relative">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="flex w-full items-center justify-between rounded-[--radius] bg-card p-3 text-right shadow-sm hover:bg-accent">
            <div className="flex items-center gap-2">
              <div className="rounded-[--radius] bg-primary/10 p-2 text-primary">
                <Palette className="h-5 w-5" />
              </div>
              <span className="font-medium text-primary">تغییر تم صفحه</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </DialogTrigger>

        <DialogContent className="h-[90vh] max-h-[800px] w-full max-w-4xl overflow-hidden rounded-[--radius] border-border p-0">
          <DialogHeader className="border-b border-border bg-card p-6 text-right">
            <DialogTitle className="text-xl font-bold text-foreground">
              انتخاب تم صفحه
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              یک تم برای تغییر ظاهر صفحه انتخاب کنید
            </DialogDescription>
          </DialogHeader>

          <div className="h-full overflow-y-auto bg-secondaryBg pb-6">
            <ThemesList
              isPremium={isPremium}
              handleThemeUpdate={handleThemeUpdate}
              themes={themes}
              currentTheme={prevTheme}
            />
          </div>

          <div className="border-t border-border bg-card p-4">
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="rounded-[--radius] px-4 py-2 font-medium text-muted-foreground hover:bg-accent"
              >
                انصراف
              </button>
              {prevTheme && (
                <button
                  onClick={() => handleThemeUpdate(prevTheme, true)}
                  className="rounded-[--radius] bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary-hover"
                >
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4" />
                    <span>اعمال تم فعلی</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageThemeSelector;
