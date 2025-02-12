import dynamic from "next/dynamic";

const TitleFieldFormElement = dynamic(
  () => import("../elements/titleField/title-field"),
);
const ButtonFieldFormElement = dynamic(
  () => import("../elements/buttonField/button-field"),
);

export const PageElements = {
  TitleField: TitleFieldFormElement,
  ButtonField: ButtonFieldFormElement,
};
