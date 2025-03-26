import { MobileIcon } from "@radix-ui/react-icons";
import LivePageComponent from "./components/LivePageComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";

const type = "SocialsField";

const extraAttributes = {
  theme: "",
  textColor: "#ffffff",
  bgColor: "",
  borderRadius: "",
  socials: [],
  schedule: false,
  scheduleStart: "0",
  scheduleEnd: "0",
  countdown: false,
  countdownDate: "0",
};

export const SocialsFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: MobileIcon,
    label: "شبکه های اجتماعی",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
