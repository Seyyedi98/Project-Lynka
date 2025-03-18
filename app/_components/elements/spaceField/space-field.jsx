import { AlignVerticalSpaceBetween } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";

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
    icon: AlignVerticalSpaceBetween,
    label: "فاصله",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
