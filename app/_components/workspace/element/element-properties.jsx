import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import DeleteElementBtn from "../../common/button/delete-element-button";
import { PageElements } from "../../controller/page-elements-controller";
import { PageHeroElement } from "../../elements/hero/page-hero-element";

const ElementProperties = ({ element }) => {
  let PropertiesForm;
  PropertiesForm = PageElements[element?.type]?.PropertiesComponent;

  if (!PropertiesForm) PropertiesForm = PageHeroElement?.PropertiesComponent;

  return (
    <div className="relative flex h-full flex-col justify-between">
      <PropertiesForm elementInstance={element} />

      <div>
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
