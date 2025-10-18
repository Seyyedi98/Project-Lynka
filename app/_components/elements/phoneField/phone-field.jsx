import { PhoneIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";

const type = "PhoneField";

const extraAttributes = {
  phone: "",
  theme: "",
  textColor: "#000000",
  font: "",
  backgroundColor: "",
  borderColor: "",
  borderRadius: "",
  schedule: false,
  scheduleStart: "0",
  scheduleEnd: "0",
  countdown: false,
  countdownDate: "0",
};

export const PhoneFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: PhoneIcon,
    label: "شماره تماس",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
