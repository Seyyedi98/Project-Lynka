import { IdCardIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";

const type = "CardField";

const extraAttributes = {
  title: "عنوان",
  theme: "",
  font: "",
  href: "",
  textColor: "#ffffff",
  bgColor: "",
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
  PropertiesComponent: PropertiesComponent,
};
