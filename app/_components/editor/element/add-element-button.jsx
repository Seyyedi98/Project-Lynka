import { Button } from "@/components/ui/button";
import { idGenerator } from "@/lib/id-generator";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { PageElements } from "../../controller/page-elements";

const AddElementButton = ({ pageElement }) => {
  // former sidebar-button-element
  const { label, icon: Icon } = pageElement.ElementAdderBtn;

  const dispatch = useDispatch();
  const elements = useSelector((state) => state.page.elements);

  const draggable = useDraggable({
    id: `adder-btn-${pageElement.type}`,
    data: {
      type: pageElement.type,
      isAdderBtn: true,
    },
  });

  return (
    <button
      onClick={() => {
        dispatch({ type: "modal/closeMenu" });
        const type = pageElement.type;
        const newElement = PageElements[type].construct(idGenerator());
        const applyPageTheme = true;

        const payload = {
          index: elements.length,
          element: newElement,
          applyPageTheme,
        };
        dispatch({ type: "page/addElement", payload });
      }}
      ref={draggable.setNodeRef}
      className={cn(
        `relative flex h-14 w-full max-w-xs cursor-grab items-center justify-between gap-2 overflow-hidden rounded-lg bg-button px-4 text-foreground shadow-md transition-all duration-300 hover:scale-105`,
        draggable.isDragging && "ring-2 ring-primary",
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div className="flex items-center justify-center gap-2">
        <Icon className="h-5 w-5 cursor-grab text-3xl text-iconLight duration-200" />
        <p className="text-xs duration-200">{label}</p>
      </div>
      <span>
        <PlusIcon className="" />
      </span>
    </button>
  );
};

export const AdderBtnDragOverly = ({ pageElement }) => {
  const { label, icon: Icon } = pageElement.ElementAdderBtn;

  return (
    <Button
      className="flex h-14 w-4/5 cursor-grab gap-2 rounded-md border border-dashed border-black bg-secondaryBg transition-all duration-300"
      variant="outline"
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default AddElementButton;
