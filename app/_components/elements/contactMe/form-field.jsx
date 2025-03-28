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
import { SliderIcon } from "@radix-ui/react-icons";

const type = "FormField";

const extraAttributes = {
  title: "فرم",
  successMessage: "",
  theme: "",
  font: "",
  textColor: "#ffffff",
  bgColor: "",
  borderRadius: "",
  fields: [],
  schedule: false,
  scheduleStart: "0",
  scheduleEnd: "0",
  countdown: false,
  countdownDate: "0",
};

export const FormFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  isPremium: true,
  ElementAdderBtn: {
    icon: FormInputIcon,
    label: "فرم",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
