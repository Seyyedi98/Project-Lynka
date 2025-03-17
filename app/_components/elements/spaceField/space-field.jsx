import { IdCardIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";

const type = "SpaceField";

const extraAttributes = {
  title: "عنوان",
  height: 0,
};

export const SpaceFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: IdCardIcon,
    label: "فاصله",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
