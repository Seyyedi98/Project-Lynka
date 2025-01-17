import useEditor from "@/hooks/useEditor";
import useModal from "@/hooks/useModal";
import { idGenerator } from "@/lib/id-generator";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { PageElements } from "../controller/page-elements";
import EditorSidebar from "../layout/navbar/editor-sidebar";
import WorkspaceHeader from "../layout/navbar/workspace-header";
import WorkspaceElementWrapper from "./element/workspace-element-wrapper";

// Former canvas
const BuilderWorkspace = () => {
  const { elements, addElement, removeElement } = useEditor();

  const { closeMenu } = useModal();

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isWorkspaceDropArea: true,
    },
  });

  useDndMonitor({
    onDragStart: () => {
      closeMenu();
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
        const newElement = PageElements[type].construct(idGenerator());

        addElement(elements.length, newElement);

        return;
      }

      ////////////////////////////////////////////////////////////////////////////////////
      //        2. When Drop new element on top or bottom half on canvas element        //
      ////////////////////////////////////////////////////////////////////////////////////
      if (isAdderBtn && droppingOverWorkspaceElement) {
        const type = active.data?.current?.type;
        const newElement = PageElements[type].construct(idGenerator());

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
    <>
      <WorkspaceHeader />
      <div className="flex h-full w-full gap-6 p-4">
        <EditorSidebar />

        <div
          className="relative flex flex-grow flex-col items-center overflow-y-auto rounded-xl bg-white pt-2 shadow-lg md:pt-10"
          ref={droppable.setNodeRef}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="flex h-full items-center justify-center text-xl font-medium text-gray-500">
              Add some blocks to start!
            </p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-32 rounded-lg bg-blue-100"></div>
            </div>
          )}

          {elements.length > 0 &&
            elements.map((element) => (
              <WorkspaceElementWrapper key={element.id} element={element} />
            ))}
          <div className="mt-auto pb-16">
            {/* <footer className="mt-4 w-full rounded-lg bg-gray-100 p-4 shadow-md">
            &copy; {new Date().getFullYear()} All rights reserved.
            </footer> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderWorkspace;
