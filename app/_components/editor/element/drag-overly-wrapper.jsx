import useEditor from "@/hooks/useEditor";
import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { AdderBtnDragOverly } from "./add-element-button";
import { PageElements } from "./page-elements";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

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
  const isSidebarBtnElement = draggedItem.data?.current?.isAdderBtn;

  // Overlay when drag sidebar adder button to workspace
  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type;
    node = <AdderBtnDragOverly pageElement={PageElements[type]} />;
  }

  const isWorkspaceElement = draggedItem.data?.current.isWorkspaceElement;

  // Overlay when drag elements inside workspace
  if (isWorkspaceElement) {
    const elementId = draggedItem.data?.current.elementId;
    const element = elements.find((el) => el.id === elementId);

    if (!element) {
      node = <div>Element not found!</div>;
    } else {
      const WorkspaceElementComponent =
        PageElements[element.type].WorkspaceComponent;
      node = (
        <div className="border-rounded-xl pointer-events-none flex w-full bg-accent px-4 py-2 opacity-80">
          <WorkspaceElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  // Dynamically determine modifiers based on the group
  const modifiers = isSidebarBtnElement ? [] : [restrictToVerticalAxis];

  return <DragOverlay modifiers={modifiers}>{node}</DragOverlay>;
};

export default DragOverlyWrapper;
