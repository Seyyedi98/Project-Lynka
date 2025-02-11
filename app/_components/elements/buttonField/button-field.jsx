import { ButtonIcon } from "@radix-ui/react-icons";
import { WorkspaceComponent } from "./components/WorkspaceComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import LivePageComponent from "./components/LivePageComponent";

const type = "ButtonField";

const extraAttributes = {
  title: "عنوان",
  theme: "",
  font: "",
  href: " ",
  textColor: "#ffffff",
  bgColor: "",
};

export const ButtonFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: ButtonIcon,
    label: "لینک",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PropertiesComponent: PropertiesComponent,
};
