import { getSubscriptionByUri } from "@/lib/auth/user-subscription";
import moment from "moment-jalaali";
import { ElementThemeController } from "../../../controller/element-theme-controller";

export async function LivePageComponent({ elementInstance, uri, isSilver }) {
  const element = elementInstance;
  const data = element.extraAttributes;
  const countdownDate = await data.countdownDate;

  const date = new Date();
  const hour = date.getHours();
  const currentShamsiDate = moment().format("jYYYY-jMM-jDDTHH:mm:ss.SSSZ");

  const scheduledRender = isSilver
    ? data.schedule
      ? hour >= data.scheduleStart && hour < data.scheduleEnd
      : true
    : false;

  const countdownRender = isSilver
    ? data.countdown
      ? currentShamsiDate > countdownDate
      : true
    : false;

  const protectedElement = isSilver ? data.isProtected : false;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return isSilver ? (
    countdownRender ? (
      scheduledRender ? (
        <RenderedElement
          uri={uri}
          elementId={element.id}
          protectedElement={protectedElement}
          isPasswordsMatch
          isLive={true}
          isSilver={isSilver}
          {...data}
        />
      ) : null
    ) : null
  ) : null;
}

export default LivePageComponent;
