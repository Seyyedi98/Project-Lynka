import ButtonFieldNature from "../theme/button/button-field-nature";
import ButtonFieldOrange from "../theme/button/button-field-orange";
import ButtonFieldSunny from "../theme/button/button-field-sunny";
import TitleFieldNature from "../theme/title/title-field-nature";
import TitleFieldSunny from "../theme/title/title-field-sunny";

export const ThemeController = {
  TitleField: {
    sunny: TitleFieldSunny,
    nature: TitleFieldNature,
  },
  ButtonField: {
    sunny: ButtonFieldSunny,
    orange: ButtonFieldOrange,
    nature: ButtonFieldNature,
  },
};
