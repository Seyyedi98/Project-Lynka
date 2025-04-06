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

  const protectedElement = isPremium ? data.isProtected : false;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return countdownRender ? (
    scheduledRender ? (
      <RenderedElement
        uri={uri}
        elementId={element.id}
        protectedElement={protectedElement}
        isPasswordsMatch
        isLive={true}
        isPremium={isPremium}
        {...data}
      />
    ) : null
  ) : null;
}

export default LivePageComponent;
