import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AddElementButton = ({ pageElement }) => {
  // former sidebar-button-element
  const { label, icon: Icon } = pageElement.ElementAdderBtn;

  const draggable = useDraggable({
    id: `adder-btn-${pageElement.type}`,
    data: {
      type: pageElement.type,
      isAdderBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      className={cn(
        `flex w-full cursor-grab gap-2 rounded-md bg-secondary transition-all duration-300`,
        draggable.isDragging && "ring-2 ring-primary",
      )}
      variant="outline"
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="text-iconLight h-8 w-8 cursor-grab text-3xl" />
      <p className="text-textLight text-xs">{label}</p>
    </Button>
  );
};

export const AdderBtnDragOverly = ({ pageElement }) => {
  const { label, icon: Icon } = pageElement.ElementAdderBtn;

  return (
    <Button
      className="bg-secondaryBg flex w-full cursor-grab gap-2 rounded-md transition-all duration-300"
      variant="outline"
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default AddElementButton;
