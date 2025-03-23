import {
  CircleHelp,
  FormInputIcon,
  IdCardIcon,
  ImageIcon,
  MapIcon,
  RssIcon,
} from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";
import { MobileIcon, SliderIcon } from "@radix-ui/react-icons";

const type = "SocialsField";

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
