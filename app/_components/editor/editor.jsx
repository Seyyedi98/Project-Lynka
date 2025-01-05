import useEditor from "@/hooks/useCanvas";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import React from "react";
import EditorSidebar from "../navbar/editor-sidebar";

const Editor = () => {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useEditor();

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isEditorDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;
    },
  });

  return (
    <div className="flex h-full w-full pt-3 md:pt-20">
      <EditorSidebar />
      <div className="flex w-full flex-col items-center justify-center">
        <div
          ref={droppable.setNodeRef}
          style={{ height: "calc(100dvh - 180px)" }}
          className="w-3/4 rounded-lg bg-neutral-100 md:w-5/6"
        >
          x
        </div>
      </div>
    </div>
  );
};

export default Editor;
