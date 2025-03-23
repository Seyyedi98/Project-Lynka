import { MapIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";

const type = "MapField";

const extraAttributes = {
  title: "نقشه",
  location: "",
  theme: "",
  font: "",
  textColor: "#ffffff",
  schedule: false,
  scheduleStart: "0",
  scheduleEnd: "0",
  countdown: false,
  countdownDate: "0",
};

export const MapFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  isPremium: true,
  ElementAdderBtn: {
    icon: MapIcon,
    label: "نقشه",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
