import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import EditorSidebarElements from "../../editor/element/editor-sidebar-elements";
import ElementProperties from "../../editor/element/element-properties";
import WorkspaceBottomBar from "./workspace-bottom-bar";
import WorkspaceSidebarMobile from "./workspace-sidebar-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { fade, fadeSlideLeft, fadeSlideUp } from "@/utils/animation/animation";
import ThemeSwitcher from "../../common/button/ThemeSwitcher";
import WorkspaceSidebatDesktop from "./workspace-sidebar-desktop";
import { useState } from "react";
import PageBackgroundSettings from "../../section/workspace/page-background-settings";
import PageDataSettings from "../../section/workspace/page-data-settings";
import PageLoadingSettings from "../../section/workspace/page-loading-settings";

const EditorSidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();
  const selectedElement = useSelector((state) => state.page.selectedElement);
  const theme = useSelector((store) => store.page.theme);

  const [selectedMenu, setSelectedMenu] = useState("elements");

  const setPageBackground = function (velue) {
    const payload = { ...theme, backgroundValue: velue };
    dispatch({ type: "page/setTheme", payload });
  };

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
        <WorkspaceSidebatDesktop
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <div className="group z-30 my-auto hidden h-full w-full flex-col items-center bg-secondaryBg px-3 pb-6 pr-20 text-primary shadow-2xl duration-700 md:flex">
          <AnimatePresence mode="wait">
            {selectedElement ? (
              <motion.div
                key="element-properties"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeSlideLeft}
                className="h-full w-full max-w-xs"
              >
                <ElementProperties element={selectedElement} />
              </motion.div>
            ) : (
              <motion.div
                key={`menu-${selectedMenu}`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeSlideUp}
                className="w-full max-w-xs md:mt-10"
              >
                {selectedMenu === "elements" && <EditorSidebarElements />}
                {selectedMenu === "theme" && (
                  <PageBackgroundSettings
                    setPageBackground={setPageBackground}
                  />
                )}
                {selectedMenu === "browser" && (
                  <>
                    <PageLoadingSettings />
                    <PageDataSettings />
                  </>
                )}
                {selectedMenu === "analytics" && <p>analytics</p>}
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
