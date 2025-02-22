import { Button } from "@/components/ui/button";
import { ChevronLeft, TrashIcon } from "lucide-react";
import { useState } from "react";
import DeleteElementBtn from "../../common/button/delete-element-button";
import { PageElements } from "../../controller/page-elements-controller";
import { PageHeroElement } from "../../elements/hero/page-hero-element";
import ElementThemeSelector from "../../theme/element-theme-selector";
import HeroThemeSelector from "../../theme/hero-theme-selector";
import { ShinyButton } from "../../common/button/shiny-button";

const ElementProperties = ({ element }) => {
  const [isThemeSelectPage, setIsThemeSelectPage] = useState(false);

  let PropertiesForm;
  PropertiesForm = PageElements[element?.type]?.PropertiesComponent;

  if (!PropertiesForm) PropertiesForm = PageHeroElement?.PropertiesComponent;

  return (
    <div className="relative flex h-full flex-col justify-between">
      {element && !isThemeSelectPage && (
        <PropertiesForm elementInstance={element} />
      )}

      {isThemeSelectPage &&
        (element?.type == "HeroElement" ? (
          <HeroThemeSelector />
        ) : (
          <ElementThemeSelector elementInstance={element} />
        ))}

      <div>
        <ShinyButton
          className="mt-4 h-14 w-full bg-button hover:bg-card-light"
          size="lg"
          onClick={() => setIsThemeSelectPage(!isThemeSelectPage)}
        >
          <span className="s flex w-full items-center justify-between text-primary">
            {isThemeSelectPage ? "بازگشت" : "تغییر تم"}
            <ChevronLeft />
          </span>
        </ShinyButton>

        {element?.type !== "HeroElement" && (
          <DeleteElementBtn id={element?.id}>
            <Button
              asChild
              variant="destructive"
              className="mt-2 hidden h-12 w-full cursor-pointer items-center justify-center p-2 duration-200 md:flex"
            >
              <span>
                حذف بلوک
                <TrashIcon className="h-4 w-4 text-white" />
              </span>
            </Button>
          </DeleteElementBtn>
        )}

        {element?.type !== "HeroElement" && (
          <DeleteElementBtn id={element?.id}>
            <button
              variant="destructive"
              className="absolute -top-16 left-2 flex cursor-pointer items-center justify-center rounded-full bg-destructive p-2 duration-200 hover:bg-green-600 md:right-0 md:hidden"
            >
              <TrashIcon className="h-4 w-4 text-white" />
            </button>
          </DeleteElementBtn>
        )}
      </div>
    </div>
  );
};

export default ElementProperties;
