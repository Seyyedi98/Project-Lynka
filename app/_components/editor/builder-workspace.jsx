import { idGenerator } from "@/lib/id-generator";
import { cn } from "@/lib/utils";
import { selectIsAnyMenuOpen } from "@/store/modalSlice";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { Eye } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import PageUrl from "../common/button/page-url";
import SavePageBtn from "../common/button/PrimaryButton/save-page-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../common/modal/diolog";
import { PageElements } from "../controller/page-elements";
import EditorSidebar from "../layout/navbar/editor-sidebar";
import PreviewPageContainer from "../preview/preview-page-container";
import WorkspaceHeroWrapper from "./element/workplace-hero-wrapper";
import WorkspaceElementWrapper from "./element/workspace-element-wrapper";

const MemoizedWorkspaceElementWrapper = memo(WorkspaceElementWrapper);

const BuilderWorkspace = () => {
  const dispatch = useDispatch();

  const isAnyMenuOpen = useSelector(selectIsAnyMenuOpen);
  const { hero, theme, elements } = useSelector(
    (state) => ({
      hero: state.page.hero,
      theme: state.page.theme,
      elements: state.page.elements,
      modalStates: state.modal.modalStates,
    }),
    shallowEqual,
  );

  const workspaceBg = useMemo(
    () => ({
      backgroundImage: `url(${hero.extraAttributes.primaryImage.url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: hero.extraAttributes.primaryImage.url
        ? ""
        : hero.extraAttributes.heroValue,
      filter: "blur(50px) opacity(90%)",
      transform: "scale(1.4)",
    }),
    [hero.extraAttributes.primaryImage.url, hero.extraAttributes.heroValue],
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
    onDragStart: useCallback(
      () => dispatch({ type: "modal/closeMenu" }),
      [dispatch],
    ),

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
            index: indexForNewElement,
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
          `h-dvh w-full bg-background duration-500`,
          isAnyMenuOpen && "scale-95 md:scale-100",
        )}
      >
        <div className="flex h-full w-full">
          <EditorSidebar />

          <div
            className="relative h-full w-full overflow-hidden md:grid md:place-content-center"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "page/setSelectedElement", payload: null });
            }}
          >
            {/* 🌆 Blurry Background Layer */}
            <div
              style={workspaceBg}
              className="absolute left-0 top-0 hidden h-full w-full md:block"
            />

            <div className="absolute right-4 top-4 z-20 flex gap-2">
              <div className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-20 px-4 text-sm">
                <SavePageBtn>ذخیره</SavePageBtn>
              </div>
              <div className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-20 px-2 text-sm">
                <Dialog>
                  <DialogTrigger asChild>
                    <Eye />
                  </DialogTrigger>
                  <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0">
                    <DialogTitle className="hidden"></DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                    <PreviewPageContainer />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="absolute left-4 top-4 z-20">
              <PageUrl />
            </div>

            <div
              style={bgStyle}
              className={cn(
                `relative flex h-dvh w-full flex-grow flex-col items-center overflow-y-auto rounded-xl shadow-lg [scrollbar-width:none] md:h-[720px] md:w-[360px]`,
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
                <div
                  key={element.id}
                  className="flex w-full justify-center md:px-2"
                >
                  <MemoizedWorkspaceElementWrapper element={element} />
                </div>
              ))}
              <div className="mt-auto pb-24"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderWorkspace;
