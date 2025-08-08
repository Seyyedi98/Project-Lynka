import { ApertureIcon } from "lucide-react";
import LivePageComponent from "./components/LivePageComponent";
import PreviewPageComponent from "./components/PreviewPageComponent";
import PropertiesComponent from "./components/PropertiesComponent";
import { WorkspaceComponent } from "./components/WorkspaceComponent";

const type = "LotteryField";

const extraAttributes = {
  title: "عنوان",
  theme: "",
  lotteryId: "",
  font: "",
  textColor: "#ffffff",
  borderColor: "#ffffff",
  bgColor: "",
  borderRadius: "",
  cardBorderRadius: "",
  schedule: false,
  scheduleStart: "0",
  scheduleEnd: "0",
  countdown: false,
  countdownDate: "0",
  protected: false,
  password: "",
};

export const LotteryFieldElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  isPremium: true,
  ElementAdderBtn: {
    icon: ApertureIcon,
    label: "قرعه کشی",
  },

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PreviewPageComponent: PreviewPageComponent,
  PropertiesComponent: PropertiesComponent,
};
