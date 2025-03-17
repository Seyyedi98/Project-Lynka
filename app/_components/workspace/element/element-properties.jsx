import { Button } from "@/components/ui/button";
import { ChevronLeft, TrashIcon } from "lucide-react";
import DeleteElementBtn from "../../common/button/delete-element-button";
import { ShinyButton } from "../../common/button/shiny-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../common/modal/diolog";
import { PageElements } from "../../controller/page-elements-controller";
import { PageHeroElement } from "../../elements/hero/page-hero-element";
import ElementThemeSelector from "../../theme/element-theme-selector";
import HeroThemeSelector from "../../theme/hero-theme-selector";

const ElementProperties = ({ element }) => {
  let PropertiesForm;
  PropertiesForm = PageElements[element?.type]?.PropertiesComponent;

  if (!PropertiesForm) PropertiesForm = PageHeroElement?.PropertiesComponent;

  return (
    <div className="relative flex h-full flex-col justify-between">
      <PropertiesForm elementInstance={element} />

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <ShinyButton
              className="mt-4 h-14 w-full bg-button hover:bg-card-light"
              size="lg"
            >
              <span className="s flex w-full items-center justify-between text-text">
                تغییر تم
                <ChevronLeft />
              </span>
            </ShinyButton>
          </DialogTrigger>
          <DialogContent className="flex h-screen max-h-svh w-screen max-w-full flex-grow flex-col gap-0 p-0">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
            {element?.type == "HeroElement" ? (
              <HeroThemeSelector />
            ) : (
              <ElementThemeSelector elementInstance={element} />
            )}
          </DialogContent>
        </Dialog>

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
