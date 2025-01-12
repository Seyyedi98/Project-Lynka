import useEditor from "@/hooks/useEditor";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useModal from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { GripVertical, XIcon } from "lucide-react";
import { useState } from "react";
import { PageElements } from "./page-elements";

const WorkspaceElementWrapper = ({ element }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { selectedElement, setSelectedElement } = useEditor();
  const { isWorkspaceMenuOpen, setIsWorkspaceMenuOpen } = useModal();

  const isDesktop = useMediaQuery("(min-width: 768px)");

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
      className="bg-secondaryBg relative flex flex-col rounded-2xl text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
        setIsWorkspaceMenuOpen(true);
      }}
    >
      {/* Edit button */}
      <div
        onClick={(e) => {
          e.stopPropagation();

          if (element === selectedElement) {
            setSelectedElement(null);
          } else {
            setIsWorkspaceMenuOpen(true);
            setSelectedElement(element);
          }
        }}
        className="absolute -right-10 top-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-gray-200 px-2 py-2"
      >
        {element === selectedElement ? (
          <XIcon className="h-4 w-4" />
        ) : (
          <Pencil1Icon className="h-4 w-4" />
        )}
      </div>

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
        <div className="absolute top-0 h-[7px] w-full rounded-md rounded-b-none bg-primary" />
      )}

      {/* Content Section */}
      <div
        className={cn(
          "pointer-events-none relative flex w-full items-center rounded-md bg-accent/40 px-4 py-2 opacity-100 transition-all duration-200",
          mouseIsOver && "opacity-90",
        )}
      >
        <PageElement elementInstance={element} />

        {/* Drag Handles */}
        <div
          onClick={(e) => e.stopPropagation()}
          ref={draggable.setNodeRef}
          className="pointer-events-auto absolute -left-12 flex"
        >
          <button
            {...draggable.listeners}
            {...draggable.attributes}
            className="mr-2 cursor-grab rounded-md bg-gray-200 px-2 py-1 text-gray-800"
          >
            <GripVertical />
          </button>
        </div>
      </div>

      {bottomHalf.isOver && (
        <div className="absolute bottom-0 h-[7px] w-full rounded-md rounded-t-none bg-primary" />
      )}
    </div>
  );
};

export default WorkspaceElementWrapper;

{
  /* Remove element btn */
}
{
  /* <div className="absolute left-0 h-full">
      <Button
        className="h-full justify-center rounded-md rounded-r-none border bg-red-500"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          removeElement(element.id);
        }}
      >
        <TrashIcon className="h-6 w-6" />
      </Button>
    </div> */
}
{
  /* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
      <p className="text-sm text-muted-foreground">کلیک کنید یا بکشید</p>
    </div> */
}
