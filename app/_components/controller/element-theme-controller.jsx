import CardFieldDefault from "../theme/card/card-field-default";
import CardFieldMinimal from "../theme/card/card-field-minimal";
import SpaceFieldDefault from "../theme/space/space-field-default";
import DeviderFieldDefault from "../theme/devider/devider-field-default";
import CountdownFieldDefault from "../theme/countdown/countdown-field-default";
import TextFieldDefault from "../theme/text/text-field-default";

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
    default: [CountdownFieldDefault, { type: "color" }, { isPremium: false }],
  },
  TextField: {
    default: [TextFieldDefault, { type: "color" }, { isPremium: false }],
  },
};
