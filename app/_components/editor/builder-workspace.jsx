import useModal from "@/hooks/useModal";
import { idGenerator } from "@/lib/id-generator";
import { cn } from "@/lib/utils";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PageElements } from "../controller/page-elements";
import EditorSidebar from "../layout/navbar/editor-sidebar";
import WorkspaceHeader from "../layout/navbar/workspace-header";
import WorkspaceHeroWrapper from "./element/workplace-hero-wrapper";
import WorkspaceElementWrapper from "./element/workspace-element-wrapper";
import { memo, useCallback, useMemo } from "react";

const MemoizedWorkspaceElementWrapper = memo(WorkspaceElementWrapper);

const BuilderWorkspace = () => {
  // console.log("bulider workspace render");
  const { closeMenu, isWorkspaceMenuOpen } = useModal();

  const dispatch = useDispatch();
  const { hero, theme, elements } = useSelector(
    (state) => ({
      hero: state.page.hero,
      theme: state.page.theme,
      elements: state.page.elements,
    }),
    shallowEqual,
  );

  const bgStyle = useMemo(
    () => ({
      backgroundColor:
        theme.backgroundType === "image" ? "" : theme.backgroundValue,
      background: theme.backgroundValue,
    }),
    [theme.backgroundType, theme.backgroundValue],
  );

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isWorkspaceDropArea: true,
    },
  });

  useDndMonitor({
    onDragStart: useCallback(() => closeMenu(), [closeMenu]),

    onDragEnd: useCallback(
      (event) => {
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
          const applyPageTheme = true;

          const payload = {
            index: elements.length,
            element: newElement,
            applyPageTheme,
          };

          dispatch({ type: "page/addElement", payload });
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

          const payload = {
            index: elements.length,
            element: newElement,
            applyPageTheme: true,
          };

          dispatch({ type: "page/addElement", payload });
        }

        ////////////////////////////////////////////////////////////////////////////////////
        //              3. When drag workspace elements and reposition them               //
        ////////////////////////////////////////////////////////////////////////////////////

        const repositionWorkspaceElement =
          droppingOverWorkspaceElement && isDraggingWorkspaceElement;

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
          dispatch({ type: "page/removeElement", payload: activeId });

          let indexForNewElement = overElementIndex; // For top half
          if (isDroppingOverWorkspaceElementBottomHalf) {
            indexForNewElement = indexForNewElement + 1;
          }

          const payload = {
            index: indexForNewElement,
            element: activeElement,
          };

          dispatch({ type: "page/addElement", payload });
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
          dispatch({ type: "page/removeElement", payload: activeId });

          const payload = {
            index: elements.length,
            element: activeElement,
          };

          dispatch({ type: "page/addElement", payload });
        }
      },
      [elements, dispatch],
    ),
  });

  return (
    <>
      <div
        className={cn(
          `h-full w-full bg-neutral-50 pt-14 duration-500`,
          isWorkspaceMenuOpen && "scale-95",
        )}
      >
        <WorkspaceHeader />
        <div className="flex h-full w-full gap-6 p-4">
          <EditorSidebar />
          <div
            style={bgStyle}
            className={cn(
              `relative flex h-full flex-grow flex-col items-center overflow-y-auto rounded-xl shadow-lg`,
            )}
            ref={droppable.setNodeRef}
          >
            <div className="w-full">
              <WorkspaceHeroWrapper element={hero} />
            </div>

            {!droppable.isOver && elements?.length === 0 && (
              <p className="flex items-center justify-center text-xl font-medium text-gray-500">
                Add some blocks to start!
              </p>
            )}

            {droppable.isOver && elements?.length === 0 && (
              <div className="w-full p-4">
                <div className="h-32 rounded-lg bg-blue-100">
                  اینجا رها کنید
                </div>
              </div>
            )}

            {elements?.map((element) => (
              <MemoizedWorkspaceElementWrapper
                key={element.id}
                element={element}
              />
            ))}
            <div className="mt-auto pb-24"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderWorkspace;
