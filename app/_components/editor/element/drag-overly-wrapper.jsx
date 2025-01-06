import useEditor from "@/hooks/useCanvas";
import React, { useState } from "react";
import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { AdderBtnDragOverly } from "./add-element-button";
import { PageElements } from "./page-elements";

const DragOverlyWrapper = () => {
  const { elements } = useEditor();
  const [draggedItem, setDraggedItem] = useState();

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overly</div>;
  const isSidebarBtnElement = draggedItem.data?.current?.isAdderBtnElement;

  // Overlay when drag sidebar adder button to workspace
  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type;
    node = <AdderBtnDragOverly pageElement={PageElements[type]} />;
  }

  const isEditorElement = draggedItem.data?.current.isEditorElement;

  // Overlay when drag elements inside workspace
  if (isEditorElement) {
    const elementId = draggedItem.data?.current.elementId;
    const element = elements.find((el) => el.id === elementId);

    if (!element) {
      node = <div>Element not found!</div>;
    } else {
      const EditorElementComponent = PageElements[element.type].PageComponent;
      node = (
        <div className="border-rounded-xl pointer-events-none flex h-[120px] w-full bg-accent px-4 py-2 opacity-80">
          <EditorElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlyWrapper;
