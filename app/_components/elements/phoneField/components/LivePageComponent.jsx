import moment from "moment-jalaali";
import { ElementThemeController } from "../../../controller/element-theme-controller";

export async function LivePageComponent({ elementInstance, uri, isPremium }) {
  const element = elementInstance;
  const data = element.extraAttributes;
  const countdownDate = await data.countdownDate;

  const date = new Date();
  const hour = date.getHours();
  const currentShamsiDate = moment().format("jYYYY-jMM-jDDTHH:mm:ss.SSSZ");

  const scheduledRender = isPremium
    ? data.schedule
      ? hour >= data.scheduleStart && hour < data.scheduleEnd
      : true
    : true;

  const countdownRender = isPremium
    ? data.countdown
      ? currentShamsiDate > countdownDate
      : true
    : true;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return countdownRender ? (
    scheduledRender ? (
      <RenderedElement elementId={element.id} {...data} isLive={true} />
    ) : null
  ) : null;
}

export default LivePageComponent;
