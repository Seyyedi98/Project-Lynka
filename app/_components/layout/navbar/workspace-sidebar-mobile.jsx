import { AppWindow, ChartLine, Droplet, Layers } from "lucide-react";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import EditorSidebarElements from "../../editor/element/editor-sidebar-elements";
import PageBackgroundSettings from "../../section/workspace/page-background-settings";
import PageMetaSettings from "../../section/workspace/page-meta-settings";
import PageStyleSettingsContainer from "../../section/workspace/page-style-settings-container";
import PageDataSettingsContainer from "../../section/workspace/page-data-settings-container";

const WorkspaceSidebarMobile = () => {
  return (
    <div className="fixed bottom-0 right-0 z-50 h-16 w-full bg-button ring-0">
      <div className="grid h-full w-full place-items-center px-8">
        <ul className="flex w-full items-center justify-between text-foreground">
          <li className="translate-y-8 animate-fade-up opacity-0 duration-300">
            <WorkspaceDynamicModal
              mode="allDrawer"
              trigger={
                <div>
                  <Layers className="" />
                </div>
              }
              title="لیست بلوک ها"
              modalId="elements"
            >
              <EditorSidebarElements />
            </WorkspaceDynamicModal>
          </li>
          <li className="translate-y-8 animate-fade-up opacity-0 delay-100 duration-300">
            <WorkspaceDynamicModal
              mode="allDrawer"
              trigger={
                <div>
                  <Droplet className="" />
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
          <li className="translate-y-8 animate-fade-up opacity-0 delay-300 duration-300">
            <WorkspaceDynamicModal
              mode="allDrawer"
              trigger={
                <div>
                  <ChartLine className="" />
                </div>
              }
              title="آمار"
              modalId="analytics"
            >
              <PageBackgroundSettings />
            </WorkspaceDynamicModal>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WorkspaceSidebarMobile;
