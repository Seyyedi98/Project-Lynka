import ButtonFieldNature from "../theme/button/button-field-nature";
import ButtonFieldOrange from "../theme/button/button-field-orange";
import ButtonFieldPink from "../theme/button/button-field-pink";
import ButtonFieldSunny from "../theme/button/button-field-sunny";
import TitleFieldNature from "../theme/title/title-field-nature";
import TitleFieldSunny from "../theme/title/title-field-sunny";

export const ThemeController = {
  TitleField: {
    sunny: [TitleFieldSunny, { type: "color" }],
    orange: [TitleFieldNature, { type: "color" }],
    pink: [TitleFieldNature, { type: "color" }],
    nature: [TitleFieldNature, { type: "color" }],
  },
  ButtonField: {
    sunny: [ButtonFieldSunny, { type: "color" }],
    orange: [ButtonFieldOrange, { type: "color" }],
    pink: [ButtonFieldPink, { type: "color" }],
    nature: [ButtonFieldNature, { type: "color" }],
  },
};
