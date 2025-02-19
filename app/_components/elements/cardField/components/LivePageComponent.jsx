import { getSubscriptionByUri } from "@/lib/auth/user-subscription";
import { ElementThemeController } from "../../../controller/element-theme-controller";

export async function LivePageComponent({ elementInstance, uri }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const { isSilver } = await getSubscriptionByUri(uri);

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return <RenderedElement isLive={true} {...data} isSilver={isSilver} />;
}

export default LivePageComponent;
