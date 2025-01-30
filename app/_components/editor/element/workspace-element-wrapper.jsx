import useModal from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { GripHorizontal, XIcon } from "lucide-react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PageElements } from "../../controller/page-elements";

const WorkspaceElementWrapper = ({ element }) => {
  const dispatch = useDispatch();
  const selectedElement = useSelector(
    (store) => store.page.selectedELement,
    shallowEqual,
  );
  const { openMenu } = useModal();

  // Draggable setup
  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isWorkspaceElement: true,
    },
  });

  // Droppable setup
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfWorkspaceElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfWorkspaceElement: true,
    },
  });

  // Return the associated page element
  const PageElement = PageElements[element.type].WorkspaceComponent;

  // Hide the element when dragging
  if (draggable.isDragging) {
    return null;
  }

  return (
    <div
      ref={draggable.setNodeRef}
      // {...draggable.listeners}
      // {...draggable.attributes}
      className="relative flex w-full max-w-[380px] flex-col rounded-2xl text-foreground hover:cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: "page/setSelectedElement", payload: element });
        openMenu();
      }}
    >
      {/* Top droppable half */}
      <div
        ref={topHalf.setNodeRef}
        className="absolute h-1/2 w-full rounded-t-md"
      />

      {/* Bottom droppable half */}
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      />

      {topHalf.isOver && (
        <div className="absolute top-0 h-[3px] w-full rounded-md rounded-b-none bg-primary-600" />
      )}

      {/* Content Section */}
      <div
        className={cn(
          "pointer-events-none relative flex w-full items-center justify-center gap-2 rounded-md py-2 opacity-100 transition-all duration-200",
        )}
      >
        {/* Edit button */}
        <div
          onClick={(e) => {
            e.stopPropagation();

            if (element === selectedElement) {
              dispatch({ type: "page/setSelectedElement", payload: null });
            } else {
              openMenu();
              dispatch({ type: "page/setSelectedElement", payload: element });
            }
          }}
          // className="absolute -right-12 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-md bg-gray-200 px-2 py-2 md:block"
          className="cursor-pointer rounded-md md:block"
        >
          {element === selectedElement ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <Pencil1Icon className="h-5 w-5" />
          )}
        </div>

        <PageElement elementInstance={element} />

        {/* Drag Handles */}
        <div
          onClick={(e) => e.stopPropagation()}
          ref={draggable.setNodeRef}
          // className="pointer-events-auto absolute -left-14 flex"
          className="pointer-events-auto translate-y-1"
        >
          <button
            {...draggable.listeners}
            {...draggable.attributes}
            className="cursor-grab rounded-md text-gray-800"
          >
            <GripHorizontal />
          </button>
        </div>
      </div>

      {bottomHalf.isOver && (
        <div className="absolute bottom-0 h-[2px] w-full rounded-t-none bg-primary-600" />
      )}
    </div>
  );
};

export default WorkspaceElementWrapper;
