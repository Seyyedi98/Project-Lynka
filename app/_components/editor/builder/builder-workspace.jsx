import useEditor from "@/hooks/useEditor";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import React, { useState } from "react";
import EditorSidebar from "../../navbar/editor-sidebar";
import { idGenerator } from "@/lib/id-generator";
import { PageElements } from "../element/page-elements";
import WorkspaceElementWrapper from "../element/workspace-element-wrapper";
import useModal from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Former canvas
const BuilderWorkspace = () => {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useEditor();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { setIsWorkspaceMenuOpen } = useModal();

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isWorkspaceDropArea: true,
    },
  });

  useDndMonitor({
    onDragStart: () => {
      setIsWorkspaceMenuOpen(false);
    },

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
          className={cn(`w-3/4 rounded-lg bg-neutral-100 md:w-5/6`)}
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
