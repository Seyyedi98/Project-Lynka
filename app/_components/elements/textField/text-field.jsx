import { TextIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";

const type = "TextField";

const extraAttributes = {
  title: "",
  theme: "",
  textColor: "#000000",
  font: "",
  backgroundColor: "#ffffff",
  borderColor: "#ffffff",
  lineHeight: "1",
  textAlign: "right",
};

export const TextFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: TextIcon,
    label: "متن",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
