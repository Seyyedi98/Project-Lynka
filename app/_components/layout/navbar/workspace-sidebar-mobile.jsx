import { AppWindow, ChartLine, Droplet, Layers } from "lucide-react";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import EditorSidebarElements from "../../editor/element/editor-sidebar-elements";
import PageBackgroundSettings from "../../section/workspace/page-background-settings";

const WorkspaceSidebarMobile = () => {
  return (
    <div className="fixed bottom-0 right-0 z-20 h-16 w-full bg-primary-foreground ring-0">
      <div className="grid h-full w-full place-items-center px-8">
        <ul className="flex w-full items-center justify-between text-slate-700">
          <li className="translate-y-8 animate-fade-up opacity-0 duration-300">
            <WorkspaceDynamicModal
              mode="allDrawer"
              trigger={
                <div>
                  <Layers className="" />
                </div>
              }
              title="لیست بلوک ها"
              modalId="elements" // Unique identifier for this modal
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
              title="لیست بلوک ها"
              modalId="style" // Unique identifier for this modal
            >
              <PageBackgroundSettings />
            </WorkspaceDynamicModal>
          </li>
          <li className="translate-y-8 animate-fade-up opacity-0 delay-200 duration-300">
            <AppWindow className="" />
          </li>
          <li className="translate-y-8 animate-fade-up opacity-0 delay-300 duration-300">
            <ChartLine className="" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WorkspaceSidebarMobile;
