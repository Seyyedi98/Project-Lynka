import HeroLivePageComponent from "./conponents/LivePageComponent";
import PreviewPageComponent from "./conponents/PreviewPageComponent";
import PropertiesComponent from "./conponents/PropertiesComponent";
import WorkspaceComponent from "./conponents/WorkspaceComponent";

const type = "HeroElement";

const extraAttributes = {
  style: "",
  title: "عنوان",
  subtitle: "توضیحات",
  titleFont: "",
  subtitleFont: "",
  titleColor: "#ffffff",
  subtitleColor: "#ffffff",
  heroType: "",
  heroValue: "",
  primaryImage: "",
  secondaryImage: "",
};

export const PageHeroElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: HeroLivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
