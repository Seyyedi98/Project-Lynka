import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import DeleteElementBtn from "../../common/button/delete-element-button";
import { PageElements } from "../../controller/page-elements";
import { PageHeroElement } from "../../elements/hero/page-hero-element";
import ElementThemeSelector from "../../theme/element-theme-selector";
import HeroThemeSelector from "../../theme/hero-theme-selector";
import { fadeSlideLeft } from "@/utils/animation/animation";

const ElementProperties = ({ element }) => {
  const [isThemeSelectPage, setIsThemeSelectPage] = useState(false);

  let PropertiesForm;
  PropertiesForm = PageElements[element?.type]?.PropertiesComponent;

  if (!PropertiesForm) PropertiesForm = PageHeroElement?.PropertiesComponent;

  return (
    <div className="relative flex h-full flex-col justify-between md:mt-20">
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
        <Button
          className="mt-4 w-full"
          onClick={() => setIsThemeSelectPage(!isThemeSelectPage)}
        >
          {isThemeSelectPage ? "بازگشت" : "تغییر تم"}
        </Button>
        {element?.type !== "HeroElement" && (
          <DeleteElementBtn id={element?.id}>
            <Button
              asChild
              variant="destructive"
              className="mt-2 flex w-full cursor-pointer items-center justify-center p-2 duration-200"
            >
              <span>
                حذف بلوک
                <TrashIcon className="h-4 w-4 text-white" />
              </span>
            </Button>
          </DeleteElementBtn>
        )}
      </div>
    </div>
  );
};

export default ElementProperties;
