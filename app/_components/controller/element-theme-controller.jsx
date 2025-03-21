import CardFieldDefault from "../theme/card/card-field-default";
import CardFieldMinimal from "../theme/card/card-field-minimal";
import SpaceFieldDefault from "../theme/space/space-field-default";
import DeviderFieldDefault from "../theme/devider/devider-field-default";
import CountdownFieldDefault from "../theme/countdown/countdown-field-default";
import TextFieldDefault from "../theme/text/text-field-default";
import VideoFieldDefault from "../theme/video/video-field-default";
import RssFieldDefault from "../theme/rss/rss-field-default";

export const ElementThemeController = {
  CardField: {
    default: [CardFieldDefault, { type: "color" }, { isPremium: false }],
    minimal: [CardFieldMinimal, { type: "color" }, { isPremium: true }],
  },
  SpaceField: {
    default: [SpaceFieldDefault, { type: "color" }, { isPremium: false }],
  },
  DeviderField: {
    default: [DeviderFieldDefault, { type: "color" }, { isPremium: false }],
  },
  CountdownField: {
    default: [CountdownFieldDefault, { type: "color" }, { isPremium: true }],
  },
  TextField: {
    default: [TextFieldDefault, { type: "color" }, { isPremium: false }],
  },
  VideoField: {
    default: [VideoFieldDefault, { type: "color" }, { isPremium: true }],
  },
  RssField: {
    default: [RssFieldDefault, { type: "color" }, { isPremium: true }],
  },
};
