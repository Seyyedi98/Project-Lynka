import { ElementThemeController } from "@/app/_components/controller/element-theme-controller";

export function PreviewPageComponent({ elementInstance, isPremium }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return <RenderedElement isLive={true} {...data} />;
}

export default PreviewPageComponent;
