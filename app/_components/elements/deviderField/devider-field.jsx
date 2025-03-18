import { GitCommitHorizontal } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";

const type = "DeviderField";

const extraAttributes = {
  title: "عنوان",
  theme: "",
  textColor: "#ffffff",
  font: "",
  deviderColor: "#ffffff",
};

export const DeviderFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: GitCommitHorizontal,
    label: "جدا کننده",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
