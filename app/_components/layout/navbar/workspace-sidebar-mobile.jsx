import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GearIcon } from "@radix-ui/react-icons";
import { AppWindow, Palette, PlusIcon } from "lucide-react";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import PageDataSettingsContainer from "../../section/workspace/page-data-settings-container";
import PageStyleSettingsContainer from "../../section/workspace/page-style-settings-container";
import EditorSidebarElements from "../../workspace/element/editor-sidebar-elements";
import PageSettings from "../../workspace/page-settings";

const WorkspaceSidebarMobile = () => {
  return (
    <div className="fixed bottom-0 right-0 z-50 h-16 w-full bg-button ring-0">
      <div className="grid h-full w-full place-items-center px-8">
        <ul className="flex w-full items-center justify-between text-foreground">
          <li className="translate-y-8 animate-fade-up opacity-0 delay-100 duration-300">
            <WorkspaceDynamicModal
              mode="allDrawer"
              trigger={
                <div>
                  <Palette className="" />
                </div>
              }
              // title="پس زمینه"
              modalId="style"
            >
              <PageStyleSettingsContainer />
            </WorkspaceDynamicModal>
          </li>
          <li className="translate-y-8 animate-fade-up opacity-0 delay-200 duration-300">
            <WorkspaceDynamicModal
              mode="allDrawer"
              trigger={
                <div>
                  <AppWindow className="" />
                </div>
              }
              title="مرورگر و سوشیال مدیا"
              modalId="browser"
            >
              <PageDataSettingsContainer />
            </WorkspaceDynamicModal>
          </li>

          <li className="translate-y-8 animate-fade-up rounded-md border-2 border-text px-4 py-1 opacity-0 duration-300">
            <WorkspaceDynamicModal
              mode="allDrawer"
              trigger={
                <div>
                  <PlusIcon className="" />
                </div>
              }
              title="لیست بلوک ها"
              modalId="elements"
            >
              <EditorSidebarElements />
            </WorkspaceDynamicModal>
          </li>

          <li className="translate-y-8 animate-fade-up opacity-0 delay-200 duration-300">
            <WorkspaceDynamicModal
              mode="allDrawer"
              trigger={
                <div>
                  <AppWindow className="" />
                </div>
              }
              title="آمار"
              modalId="browser"
            >
              <PageDataSettingsContainer />
            </WorkspaceDynamicModal>
          </li>

          <li className="translate-y-8 animate-fade-up opacity-0 delay-300 duration-300">
            <Dialog>
              <DialogTrigger asChild>
                <GearIcon className="h-7 w-7 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                <PageSettings />
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WorkspaceSidebarMobile;
