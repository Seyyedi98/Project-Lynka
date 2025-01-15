import useEditor from "@/hooks/useEditor";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import EditorSidebarElements from "../../editor/element/editor-sidebar-elements";
import WorkspaceBottomBar from "./workspace-bottom-bar";
import ElementProperties from "../../editor/element/element-properties";

const EditorSidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { selectedElement } = useEditor();

  // TODO: Replace with skeleton
  if (isDesktop === null) {
    return <div>Loading...</div>; // Or keep this hidden initially.
  }

  // Mobile Device
  if (!isDesktop && !selectedElement) {
    return <WorkspaceBottomBar isDesktop={isDesktop} />;
  }

  // Desktop
  if (isDesktop) {
    return (
      <>
        {/* Sidebar */}
        <div className="group fixed right-5 top-1/2 z-30 my-auto flex h-fit w-24 -translate-y-1/2 flex-col items-center justify-between rounded-2xl bg-gradient-to-b from-primary-gradient_from to-primary-gradient_to px-3 pb-6 text-white duration-300 hover:w-56 lg:w-56">
          <WorkspaceDynamicModal mode="allDrawer" title="تنظیمات" delay="400">
            <ElementProperties element={selectedElement} />
          </WorkspaceDynamicModal>
          <EditorSidebarElements />
        </div>

        {/* Bottom Bar */}
        <WorkspaceBottomBar isDesktop={isDesktop} />
      </>
    );
  }

  // Mobile Edit Menu
  if (!isDesktop && selectedElement) {
    return (
      <div className="fixed bottom-0 right-0 h-[72px] w-full">
        <WorkspaceDynamicModal mode="allDrawer" title="تنظیمات" delay="400">
          <ElementProperties element={selectedElement} />
        </WorkspaceDynamicModal>
      </div>
    );
  }
};

export default EditorSidebar;
