import { Button } from "@/components/ui/button";
import useEditor from "@/hooks/useEditor";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import EditorSidebarElements from "../../editor/element/editor-sidebar-elements";
import { cn } from "@/lib/utils";

const EditorSidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { selectedElement } = useEditor();

  // TODO: Replace with skeleton
  if (isDesktop === null) {
    return <div>Loading...</div>; // Or keep this hidden initially.
  }

  // Mobile Device
  if (!isDesktop && !selectedElement) {
    return (
      <div className="fixed bottom-0 h-16 w-full bg-gradient-to-b from-primary-gradient_from to-primary-gradient_to text-white">
        <ul className="flex h-full items-center justify-between px-5">
          <li>Settings</li>
          <WorkspaceDynamicModal
            mode="allDrawer"
            trigger={<Button variant="outline">Add</Button>}
            title="لیست بلوک ها"
          >
            <EditorSidebarElements />
          </WorkspaceDynamicModal>
          <li>Preview</li>
        </ul>
      </div>
    );
  }

  if (!isDesktop && selectedElement) {
    return (
      <div className="fixed bottom-0 h-16 w-full bg-gradient-to-b from-primary-gradient_from to-primary-gradient_to text-white">
        <ul className="flex h-full items-center justify-between px-5">
          <li>Settings</li>
          <WorkspaceDynamicModal
            mode="allDrawer"
            title="لیست بلوک ها"
            delay="400"
          >
            {selectedElement.id}
          </WorkspaceDynamicModal>
          <li>Preview</li>
        </ul>
      </div>
    );
  }

  // Desktop
  if (isDesktop) {
    return (
      <>
        <div className="flex w-64 flex-col items-center justify-between bg-gradient-to-b from-primary-gradient_from to-primary-gradient_to py-8 text-white">
          {/* Properties drawer */}
          {/* <div
            className={cn(
              `absolute right-0 top-0 z-10 flex h-full w-[206px] translate-x-full flex-col items-center justify-between bg-gradient-to-b from-primary-gradient_from to-primary-gradient_to py-8 pt-24 text-white duration-300`,
              selectedElement && "translate-x-0",
            )}
          >
            {selectedElement?.id || "XXX"}
          </div> */}
          <WorkspaceDynamicModal mode="allDrawer" title="تنظیمات" delay="400">
            {selectedElement?.id}
          </WorkspaceDynamicModal>
          <EditorSidebarElements />
          <ul className="flex items-center justify-between px-5">
            <li>Settings</li>
            <li>Add</li>
            <li>Preview</li>
          </ul>
        </div>
      </>
    );
  }
};

export default EditorSidebar;
