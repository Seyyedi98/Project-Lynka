import { BoxIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";

const type = "PostTrackerField";

const extraAttributes = {
  title: "رهگیری مرسوله",
  theme: "",
  font: "",
  textColor: "#ffffff",
  bgColor: "",
  borderRadius: "",
};

export const PostTrackerFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  isPremium: true,
  ElementAdderBtn: {
    icon: BoxIcon,
    label: "رهگیری پست",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
