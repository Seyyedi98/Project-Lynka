import { cn } from "@/lib/utils";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { GripHorizontal, XIcon } from "lucide-react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PageElements } from "../../controller/page-elements-controller";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const WorkspaceElementWrapper = ({ element }) => {
  const dispatch = useDispatch();
  const selectedElement = useSelector(
    (store) => store.page.selectedELement,
    shallowEqual,
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true,
    },
  });

  // Return the associated page element
  const PageElement = PageElements[element.type].WorkspaceComponent;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative flex w-full max-w-[380px] flex-col rounded-2xl text-foreground hover:cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: "page/setSelectedElement", payload: element });
        dispatch({
          type: "modal/setMenuOpen",
          payload: { modalId: "workspaceElement", isOpen: true },
        });
      }}
    >
      {/* Top droppable half */}
      {/* <div
        ref={topHalf.setNodeRef}
        className="absolute h-1/2 w-full rounded-t-md"
      /> */}

      {/* Bottom droppable half */}
      {/* <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      /> */}

      {/* Content Section */}
      <div
        className={cn(
          "pointer-events-none relative flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 opacity-100 transition-all duration-200",
        )}
      >
        {/* Edit button */}
        {/* <div className="cursor-pointer rounded-md text-primary md:block">
          {element === selectedElement ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <Pencil1Icon className="h-5 w-5" />
          )}
        </div> */}

        <PageElement elementInstance={element} />

        {/* Drag Handles */}
        {/* <div
          onClick={(e) => e.stopPropagation()}
          // className="pointer-events-auto absolute -left-14 flex"
          className="pointer-events-auto translate-y-1"
        >
          <button className="cursor-grab rounded-md text-primary">
            <GripHorizontal />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default WorkspaceElementWrapper;
