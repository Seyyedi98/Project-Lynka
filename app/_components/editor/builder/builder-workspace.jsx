import useEditor from "@/hooks/useEditor";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import React from "react";
import EditorSidebar from "../../navbar/editor-sidebar";
import { idGenerator } from "@/lib/is-generator";
import { PageElements } from "../element/page-elements";
import WorkspaceElementWrapper from "../element/workspace-element-wrapper";

// Former canvas
const BuilderWorkspace = () => {
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
      isWorkspaceDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isAdderBtn = active.data?.current?.isAdderBtn;
      const isDroppingOverWorkspaceArea =
        over.data?.current?.isWorkspaceDropArea;

      // const isDroppingOverWorkspaceElementTopHalf =
      //   over.data?.current?.isTopHalfWorkspaceElement;
      // const isDroppingOverWorkspaceElementBottomHalf =
      //   over.data?.current?.isBottomHalfWorkspaceElement;

      // const droppingOverWorkspaceElement =
      //   isDroppingOverWorkspaceElementTopHalf ||
      //   isDroppingOverWorkspaceElementBottomHalf;

      ////////////////////////////////////////////////////////////////////////////////////
      //     1. When drop new element on workspace, It will be added as a last item     //
      ////////////////////////////////////////////////////////////////////////////////////
      if (isAdderBtn && isDroppingOverWorkspaceArea) {
        const type = active.data?.current?.type;
        const newElement = PageElements[type].contruct(idGenerator());

        addElement(elements.length, newElement);

        return;
      }
    },
  });

  return (
    <div className="flex h-full w-full pt-3 md:pt-[70px]">
      <EditorSidebar />
      <div className="flex w-full flex-col items-center justify-center">
        <div
          ref={droppable.setNodeRef}
          style={{ height: "calc(100dvh - 180px)" }}
          className="w-3/4 rounded-lg bg-neutral-100 md:w-5/6"
        >
          {elements.map((element) => {
            return (
              <WorkspaceElementWrapper key={element.id} element={element} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuilderWorkspace;
