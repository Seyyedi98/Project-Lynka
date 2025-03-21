import { IdCardIcon, VideoIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";

const type = "VideoField";

const extraAttributes = {
  theme: "",
  href: "",
  layout: "basic",
  schedule: false,
  scheduleStart: "0",
  scheduleEnd: "0",
  countdown: false,
  countdownDate: "0",
};

export const VideoFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  isPremium: true,
  ElementAdderBtn: {
    icon: VideoIcon,
    label: "فیلم",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
