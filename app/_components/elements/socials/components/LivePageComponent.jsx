import { ElementThemeController } from "../../../controller/element-theme-controller";

export async function LivePageComponent({ elementInstance, uri, isPremium }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return (
    <RenderedElement
      uri={uri}
      elementId={element.id}
      isPasswordsMatch
      isLive={true}
      isPremium={isPremium}
      {...data}
    />
  );
}

export default LivePageComponent;
