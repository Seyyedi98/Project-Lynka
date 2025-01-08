import useEditor from "@/hooks/useEditor";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { PageElements } from "./page-elements";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const WorkspaceElementWrapper = ({ element }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement, selectedElement, setSelectedElement } = useEditor();

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isWorkspaceElement: true,
    },
  });

  // return adder element component associated with page element
  const PageElement = PageElements[element.type].WorkspaceComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfWorkspaceElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "--bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfWorkspaceElement: true,
    },
  });

  // Hide currently draggind item in workspace
  if (draggable.isDragging) {
    return null;
  }

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="bg-secondaryBg relative flex flex-col rounded-2xl text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
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

      {mouseIsOver && (
        <>
          {/* Remove element btn */}
          <div className="absolute left-0 h-full">
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
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-sm text-muted-foreground">کلیک کنید یا بکشید</p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 h-[7px] w-full rounded-md rounded-b-none bg-primary" />
      )}

      <div
        className={cn(
          "pointer-events-none flex w-full items-center rounded-md bg-accent/40 px-4 py-2 opacity-100 transition-all duration-200",
          mouseIsOver && "opacity-30",
        )}
      >
        <PageElement elementInstance={element} />
      </div>

      {bottomHalf.isOver && (
        <div className="absolute bottom-0 h-[7px] w-full rounded-md rounded-t-none bg-primary" />
      )}
    </div>
  );
};

export default WorkspaceElementWrapper;
