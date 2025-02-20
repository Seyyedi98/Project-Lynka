import { getSubscriptionByUri } from "@/lib/auth/user-subscription";
import { ElementThemeController } from "../../../controller/element-theme-controller";

export async function LivePageComponent({ elementInstance, uri }) {
  const element = elementInstance;
  const data = element.extraAttributes;
  const date = new Date();
  const hour = date.getHours();

  const { isSilver } = await getSubscriptionByUri(uri);
  const scheduledRender = data.scheduleData.schedule
    ? isSilver &&
      hour >= data.scheduleData.scheduleStart &&
      hour < data.scheduleData.scheduleEnd
    : true;

  // console.log(data.scheduleData.scheduleStart);
  // console.log(data.scheduleData.scheduleEnd);
  // console.log(data.scheduleData.schedule);

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return scheduledRender ? (
    <RenderedElement isLive={true} {...data} isSilver={isSilver} />
  ) : null;
}

export default LivePageComponent;
