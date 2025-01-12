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
      const isDraggingWorkspaceElement =
        active.data?.current?.isWorkspaceElement;

      const isDroppingOverWorkspaceElementTopHalf =
        over.data?.current?.isTopHalfWorkspaceElement;
      const isDroppingOverWorkspaceElementBottomHalf =
        over.data?.current?.isBottomHalfWorkspaceElement;

      const droppingOverWorkspaceElement =
        isDroppingOverWorkspaceElementTopHalf ||
        isDroppingOverWorkspaceElementBottomHalf;

      ////////////////////////////////////////////////////////////////////////////////////
      //     1. When drop new element on workspace, It will be added as a last item     //
      ////////////////////////////////////////////////////////////////////////////////////
      if (isAdderBtn && isDroppingOverWorkspaceArea) {
        const type = active.data?.current?.type;
        const newElement = PageElements[type].contruct(idGenerator());

        addElement(elements.length, newElement);

        return;
      }

      ////////////////////////////////////////////////////////////////////////////////////
      //        2. When Drop new element on top or bottom half on canvas element        //
      ////////////////////////////////////////////////////////////////////////////////////
      if (isAdderBtn && droppingOverWorkspaceElement) {
        const type = active.data?.current?.type;
        const newElement = PageElements[type].contruct(idGenerator());

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) throw new Error("Element not found");

        let indexForNewElement = overElementIndex; // For drop on top half
        if (isDroppingOverWorkspaceElementBottomHalf) {
          indexForNewElement = indexForNewElement + 1;
        }

        addElement(indexForNewElement, newElement);
      }

      ////////////////////////////////////////////////////////////////////////////////////
      //              3. When drag workspace elements and reposition them               //
      ////////////////////////////////////////////////////////////////////////////////////

      const repositionWorkspaceElement =
        droppingOverWorkspaceElement && isDraggingWorkspaceElement;

      // Find index of active element and move it after or before of over element
      if (repositionWorkspaceElement) {
        const activeId = active.data?.current.elementId;
        const overId = over.data?.current.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId,
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("Element not found");
        }

        const activeElement = { ...elements[activeElementIndex] }; // Copy active element
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // For top half
        if (isDroppingOverWorkspaceElementBottomHalf) {
          indexForNewElement = indexForNewElement + 1;
        }

        addElement(indexForNewElement, activeElement);
      }

      ////////////////////////////////////////////////////////////////////////////////////
      //         4. When drag workspace elements and drop on the workspace area         //
      ////////////////////////////////////////////////////////////////////////////////////
      if (isDraggingWorkspaceElement && isDroppingOverWorkspaceArea) {
        const activeId = active.data?.current.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId,
        );

        if (activeElementIndex === -1) {
          throw new Error("Element not found");
        }

        const activeElement = { ...elements[activeElementIndex] }; // Copy active element
        removeElement(activeId);

        addElement(elements.length, activeElement);
      }
    },
  });

  return (
    <div className="flex h-full w-full gap-12 pt-3 md:pt-[70px]">
      <EditorSidebar />
      <div className="mx-2 mb-20 mt-12 flex w-full flex-col items-center justify-center overflow-y-scroll [scrollbar-width:none] sm:mx-0">
        <div
          ref={droppable.setNodeRef}
          // style={{ maxHeight: "calc(100dvh - 250px)" }}
          className="h-full w-3/4 max-w-[400px] overflow-x-visible rounded-lg md:w-3/6 lg:w-5/6"
        >
          {/* Empty workspace */}
          {!droppable.isOver && elements.length === 0 && (
            <p className="flex h-full flex-grow items-center justify-center text-3xl font-bold text-muted-foreground">
              چند بلاک اضافه کن
            </p>
          )}

          {/* Display drop area  */}
          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/30"></div>
            </div>
          )}

          {/* Show dropped elemets */}
          {elements.length > 0 &&
            elements.map((element) => {
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
