import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AppWindow,
  ChartLine,
  Palette,
  PlusIcon,
  Settings,
} from "lucide-react";

import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import PageAnalytics from "../../section/workspace/page-analytics";
import PageDataSettingsContainer from "../../section/workspace/page-data-settings-container";
import PageStyleSettingsContainer from "../../section/workspace/page-style-settings-container";
import EditorSidebarElements from "../../workspace/element/editor-sidebar-elements";
import PageSettings from "../../workspace/page-settings";

const WorkspaceSidebarMobile = ({ isPremium }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-lg">
      <ul className="flex items-center justify-between px-6 py-3">
        {/* Style Settings */}
        <li className="translate-y-4 animate-fade-up opacity-0 delay-100 duration-300">
          <WorkspaceDynamicModal
            mode="allDrawer"
            modalId="style"
            trigger={
              <button className="rounded-full p-2 transition hover:bg-muted">
                <Palette className="h-6 w-6 text-foreground" />
              </button>
            }
          >
            <PageStyleSettingsContainer />
          </WorkspaceDynamicModal>
        </li>

        {/* Browser & Social Media */}
        <li className="translate-y-4 animate-fade-up opacity-0 delay-200 duration-300">
          <WorkspaceDynamicModal
            mode="allDrawer"
            modalId="browser"
            title="مشخصات صفحه"
            trigger={
              <button className="rounded-full p-2 transition hover:bg-muted">
                <AppWindow className="h-6 w-6 text-foreground" />
              </button>
            }
          >
            <PageDataSettingsContainer />
          </WorkspaceDynamicModal>
        </li>

        {/* Add Element */}
        <li className="translate-y-4 animate-fade-up opacity-0 delay-300 duration-300">
          <WorkspaceDynamicModal
            mode="allDrawer"
            modalId="elements"
            title="لیست بلوک ها"
            trigger={
              <button className="rounded-full border border-border bg-muted p-2 text-foreground transition hover:bg-muted/80">
                <PlusIcon className="h-6 w-6" />
              </button>
            }
          >
            <EditorSidebarElements isPremium={isPremium} />
          </WorkspaceDynamicModal>
        </li>

        {/* Analytics */}
        <li className="delay-400 translate-y-4 animate-fade-up opacity-0 duration-300">
          <WorkspaceDynamicModal
            mode="allDrawer"
            modalId="analytics"
            title="آمار"
            trigger={
              <button className="rounded-full p-2 transition hover:bg-muted">
                <ChartLine className="h-6 w-6 text-foreground" />
              </button>
            }
          >
            <PageAnalytics />
          </WorkspaceDynamicModal>
        </li>

        {/* Settings Dialog */}
        <li className="translate-y-4 animate-fade-up opacity-0 delay-500 duration-300">
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-full p-2 transition hover:bg-muted">
                <Settings className="h-6 w-6 text-foreground" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="hidden" />
              <DialogDescription className="hidden" />
              <PageSettings />
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </div>
  );
};

export default WorkspaceSidebarMobile;
