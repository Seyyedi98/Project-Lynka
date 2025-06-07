"use client";

import CreateNewPage from "../../form/create-new-page";
import { WorkspaceDynamicModal } from "../../modal/workspace-dynamic-modal";

const CreatePageButton = ({ children, allPages }) => {
  return (
    <div className="relative">
      <WorkspaceDynamicModal
        mode="mobileDrawer"
        delay="400"
        modalId="createNewPage"
        trigger={children}
      >
        <CreateNewPage allPages={allPages} />
      </WorkspaceDynamicModal>
    </div>
  );
};

export default CreatePageButton;
