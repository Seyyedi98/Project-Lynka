import { WorkspaceComponent } from "./components/WorkspaceComponent";
import { LivePageComponent } from "./components/LivePageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { Heading } from "lucide-react";

const type = "TitleField";

const extraAttributes = {
  title: "عنوان",
  theme: "",
};

export const TitleFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: Heading,
    label: "عنوان",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PropertiesComponent: PropertiesComponent,
};
