import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import DeleteElementBtn from "@/app/_components/common/button/delete-element-button";

import { PageElements } from "../../controller/page-elements-controller";
import { PageHeroElement } from "../../elements/hero/page-hero-element";

const ElementProperties = ({ element }) => {
  let PropertiesForm;
  PropertiesForm = PageElements[element?.type]?.PropertiesComponent;

  if (!PropertiesForm) PropertiesForm = PageHeroElement?.PropertiesComponent;

  return (
    <div className="relative flex h-full flex-col justify-between">
      <PropertiesForm elementInstance={element} />
    </div>
  );
};

export default ElementProperties;
