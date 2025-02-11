import { ThemeController } from "../../../controller/theme-controller";

function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ThemeController[element.type][data.theme][0];
  return <RenderedElement isLive={true} {...data} />;
}

export default LivePageComponent;
