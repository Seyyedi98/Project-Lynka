import LivePageComponent from "./conponents/LivePageComponent";
import PropertiesComponent from "./conponents/PropertiesComponent";
import WorkspaceComponent from "./conponents/WorkspaceComponent";

const type = "HeroElement";

const extraAttributes = {
  style: "",
  title: "عنوان",
  subtitle: "زیر عنوان",
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
  LivePageComponent: LivePageComponent,
  PropertiesComponent: PropertiesComponent,
};
