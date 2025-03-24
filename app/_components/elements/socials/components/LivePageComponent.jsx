import { getSubscriptionByUri } from "@/lib/auth/user-subscription";
import moment from "moment-jalaali";
import { ElementThemeController } from "../../../controller/element-theme-controller";

export async function LivePageComponent({ elementInstance, uri }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return (
    <RenderedElement
      uri={uri}
      elementId={element.id}
      protectedElement={protectedElement}
      isPasswordsMatch
      isLive={true}
      isSilver={isSilver}
      {...data}
    />
  );
}

export default LivePageComponent;
