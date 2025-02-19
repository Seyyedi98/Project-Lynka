import { IdCardIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";

const type = "CardField";

const extraAttributes = {
  title: "عنوان",
  theme: "",
  font: "",
  href: "",
  layout: "basic",
  textColor: "#ffffff",
  bgColor: "",
  borderRadius: "",
  image: "",
};

export const CardFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: IdCardIcon,
    label: "لینک",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
