import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
  snapCenterToCursor,
} from "@dnd-kit/modifiers";
import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { PageElements } from "../../controller/page-elements-controller";
import { AdderBtnDragOverly } from "./add-element-button";

const DragOverlyWrapper = () => {
  const elements = useSelector((state) => state.page.elements, shallowEqual);
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

  let node = null;
  const isSidebarBtnElement = draggedItem.data?.current?.isAdderBtn;

  // Overlay when drag sidebar adder button to workspace
  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type;
    node = <AdderBtnDragOverly pageElement={PageElements[type]} />;
  }

  const isWorkspaceElement = draggedItem.data?.current?.sortable;

  // Overlay when drag elements inside workspace
  if (isWorkspaceElement) {
    const elementId = draggedItem.data?.current.elementId;
    const element = elements.find((el) => el.id === elementId);

    if (!element) {
      node = (
        <div className="h-16 w-full rounded-md bg-background/40 px-4"></div>
      );
    } else {
      const WorkspaceElementComponent =
        PageElements[element.type].WorkspaceComponent;
      node = (
        <div className="border-rounded-xl pointer-events-none flex max-h-32 w-full bg-transparent px-4 py-2 opacity-80">
          <WorkspaceElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  // Dynamically determine modifiers based on the group
  const modifiers = isSidebarBtnElement
    ? [snapCenterToCursor]
    : [restrictToVerticalAxis, restrictToFirstScrollableAncestor];

  return <DragOverlay modifiers={modifiers}>{node}</DragOverlay>;
};

export default DragOverlyWrapper;
