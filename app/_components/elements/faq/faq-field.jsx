import { CircleHelp, IdCardIcon, RssIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";

const type = "FaqField";

const extraAttributes = {
  title: "سوالات متداول",
  theme: "",
  font: "",
  textColor: "#ffffff",
  bgColor: "",
  borderRadius: "",
  questions: [],
  schedule: false,
  scheduleStart: "0",
  scheduleEnd: "0",
  countdown: false,
  countdownDate: "0",
};

export const FaqFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  isPremium: true,
  ElementAdderBtn: {
    icon: CircleHelp,
    label: "سوالات متداول",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
