import { ElementThemeController } from "../../../controller/element-theme-controller";

export async function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return <RenderedElement elementId={element.id} {...data} isLive={true} />;
}

export default LivePageComponent;
