import { useUserSubscription } from "@/hooks/useUserSubscription";
import { PageElements } from "../../controller/page-elements-controller";
import { PageHeroElement } from "../../elements/hero/page-hero-element";

const ElementProperties = ({ element }) => {
  const { isSilver } = useUserSubscription();

  let PropertiesForm;
  PropertiesForm = PageElements[element?.type]?.PropertiesComponent;

  if (!PropertiesForm) PropertiesForm = PageHeroElement?.PropertiesComponent;

  return (
    <div className="relative flex h-full flex-col justify-between">
      <PropertiesForm elementInstance={element} isSilver={isSilver} />
    </div>
  );
};

export default ElementProperties;
