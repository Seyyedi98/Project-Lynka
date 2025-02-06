import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import EditorSidebarElements from "../../editor/element/editor-sidebar-elements";
import ElementProperties from "../../editor/element/element-properties";
import WorkspaceBottomBar from "./workspace-bottom-bar";
import WorkspaceSidebarMobile from "./workspace-sidebar-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { fade, fadeSlideLeft } from "@/utils/animation/animation";
import ThemeSwitcher from "../../common/button/ThemeSwitcher";

const EditorSidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const selectedElement = useSelector((state) => state.page.selectedElement);

  // TODO: Replace with skeleton
  if (isDesktop === null) {
    return;
  }

  // Mobile Device
  if (!isDesktop && !selectedElement) {
    return <WorkspaceSidebarMobile />;
  }

  // Desktop
  if (isDesktop) {
    return (
      <>
        <div className="absolute right-0 top-0 z-50">
          <ThemeSwitcher />
        </div>
        <div className="group z-30 my-auto hidden h-full w-full flex-col items-center justify-between bg-secondaryBg px-3 pb-6 text-primary shadow-2xl duration-300 md:flex">
          <AnimatePresence mode="wait">
            {selectedElement ? (
              <motion.div
                key="element-properties"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeSlideLeft}
                className="w-full max-w-xs"
              >
                <ElementProperties element={selectedElement} />
              </motion.div>
            ) : (
              <motion.div
                key="editor-sidebar"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fade}
                className="w-full max-w-xs"
              >
                <EditorSidebarElements />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }

  // Mobile Edit Menu
  if (!isDesktop && selectedElement) {
    return (
      <div className="fixed bottom-0 right-0 h-[72px] w-full">
        <WorkspaceDynamicModal
          mode="allDrawer"
          title="تنظیمات"
          delay="400"
          modalId="workspaceElement"
        >
          <ElementProperties element={selectedElement} />
        </WorkspaceDynamicModal>
      </div>
    );
  }
};

export default EditorSidebar;
