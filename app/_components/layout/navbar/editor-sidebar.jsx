import { useMediaQuery } from "@/hooks/useMediaQuery";
import { fadeSlideLeft, fadeSlideUp } from "@/utils/animation/animation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import PageAnalytics from "../../section/workspace/page-analytics";
import PageDataSettingsContainer from "../../section/workspace/page-data-settings-container";
import PageStyleSettingsContainer from "../../section/workspace/page-style-settings-container";
import EditorSidebarElements from "../../workspace/element/editor-sidebar-elements";
import ElementProperties from "../../workspace/element/element-properties";
import WorkspaceSidebatDesktop from "./workspace-sidebar-desktop";
import WorkspaceSidebarMobile from "./workspace-sidebar-mobile";

const EditorSidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();
  const selectedElement = useSelector((state) => state.page.selectedElement);
  const theme = useSelector((store) => store.page.theme);

  const [selectedMenu, setSelectedMenu] = useState("elements");

  const setPageBackground = function (velue) {
    const payload = { ...theme, backgroundColor: velue };
    dispatch({ type: "page/setTheme", payload });
  };

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
        {/* rounded menu on the right */}

        <WorkspaceSidebatDesktop
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />

        <div className="group relative z-30 my-auto hidden h-full w-full flex-col items-center overflow-y-auto bg-secondaryBg px-3 pb-6 pr-20 text-text shadow-2xl duration-700 md:flex">
          {/* Back to dashboard btn */}

          <AnimatePresence mode="wait">
            {selectedElement ? (
              <motion.div
                key="element-properties"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeSlideLeft}
                className="h-full w-full max-w-xs md:mt-10"
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
                  <PageStyleSettingsContainer
                    setPageBackground={setPageBackground}
                  />
                )}
                {selectedMenu === "browser" && <PageDataSettingsContainer />}
                {selectedMenu === "analytics" && <PageAnalytics />}
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
