import { ElementThemeController } from "../../../controller/element-theme-controller";

function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return <RenderedElement isLive={true} {...data} />;
}

export default LivePageComponent;
