import useEditor from "@/hooks/useEditor";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { WorkspaceDynamicModal } from "../common/shared/workspace-dynamic-modal";
import EditorSidebarElements from "../editor/element/editor-sidebar-elements";
import WorkspaceBottomBar from "./workspace-bottom-bar";

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
        <div className="fixed top-1/2 my-auto mr-4 flex h-fit w-24 -translate-y-1/2 flex-col items-center justify-between rounded-2xl bg-gradient-to-b from-primary-gradient_from to-primary-gradient_to px-3 pb-6 text-white duration-300 hover:w-56 xl:mr-12 xl:w-56">
          <WorkspaceDynamicModal mode="allDrawer" title="تنظیمات" delay="400">
            {selectedElement?.id}
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
        <div className="mx-4 flex h-full items-center justify-center gap-3 rounded-t-3xl bg-white px-8 shadow-lg">
          <WorkspaceDynamicModal
            mode="allDrawer"
            title="لیست بلوک ها"
            delay="400"
          >
            {selectedElement.id}
          </WorkspaceDynamicModal>
        </div>
      </div>
    );
  }
};

export default EditorSidebar;
