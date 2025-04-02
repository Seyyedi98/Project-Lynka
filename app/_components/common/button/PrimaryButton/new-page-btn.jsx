"use client";

import CreateNewPage from "../../form/create-new-page";
import { WorkspaceDynamicModal } from "../../modal/workspace-dynamic-modal";

const CreatePageButton = ({ children }) => {
  return (
    <div className="relative">
      <WorkspaceDynamicModal
        mode="mobileDrawer"
        delay="400"
        modalId="createNewPage"
        trigger={children}
      >
        <CreateNewPage />
      </WorkspaceDynamicModal>
    </div>
  );
};

export default CreatePageButton;
