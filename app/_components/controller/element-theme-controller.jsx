import ButtonFieldBasicColor from "../theme/button/button-field-basicColor";
import CardFieldBasicColor from "../theme/card/card-field-basicColor";
import CardFieldMinimal from "../theme/card/card-field-minimal";
import TitleFieldBasicColor from "../theme/title/title-field-basicColor";

export const ElementThemeController = {
  TitleField: {
    basicColor: [TitleFieldBasicColor, { type: "color" }],
  },
  ButtonField: {
    basicColor: [ButtonFieldBasicColor, { type: "color" }],
  },
  CardField: {
    basicColor: [CardFieldBasicColor, { type: "color" }, { isPremium: false }],
    minimal: [CardFieldMinimal, { type: "color" }, { isPremium: true }],
  },
};
