import React from "react";
import EditorSidebarElements from "../editor/editor-sidebar-elements";
import { EditorDialog } from "../common/shared/editor-dialog";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const EditorSidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // TODO: Replace with skeleton
  if (isDesktop === null) {
    return <div>Loading...</div>; // Or keep this hidden initially.
  }

  // Mobile Device
  if (!isDesktop) {
    return (
      <div className="fixed bottom-0 h-16 w-full bg-neutral-100">
        <ul className="flex h-full items-center justify-between px-5">
          <li>Settings</li>
          <EditorDialog
            className=""
            trigger={<Button variant="outline">Add</Button>}
            title="لیست بلوک ها"
          >
            <EditorSidebarElements />
          </EditorDialog>
          <li>Preview</li>
        </ul>
      </div>
    );
  }

  // Desktop
  if (isDesktop) {
    return (
      <div className="flex w-64 flex-col items-center justify-between bg-neutral-100 py-8">
        <EditorSidebarElements />
        <ul className="flex items-center justify-between px-5">
          <li>Settings</li>
          <li>Add</li>
          <li>Preview</li>
        </ul>
      </div>
    );
  }
};

export default EditorSidebar;
