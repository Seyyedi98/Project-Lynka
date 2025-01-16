import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useModal from "@/hooks/useModal";
import { PageElements } from "../../controller/page-elements";
import { idGenerator } from "@/lib/id-generator";
import useEditor from "@/hooks/useEditor";

const AddElementButton = ({ pageElement }) => {
  // former sidebar-button-element
  const { label, icon: Icon } = pageElement.ElementAdderBtn;
  const { closeMenu } = useModal();
  const { addElement, elements } = useEditor();

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
        closeMenu();
        const type = pageElement.type;
        const newElement = PageElements[type].construct(idGenerator());
        addElement(elements.length, newElement);
      }}
      ref={draggable.setNodeRef}
      className={cn(
        `relative flex h-14 w-full cursor-grab items-center justify-center gap-2 overflow-hidden rounded-md border border-black bg-white pr-[18px] text-black transition-all duration-300 group-hover:w-full md:w-14 md:justify-start md:border-none lg:h-10 lg:w-full`,
        draggable.isDragging && "ring-2 ring-primary",
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="text-iconLight h-5 w-5 cursor-grab text-3xl duration-200 group-hover:mr-12 lg:mr-12" />
      <p className="text-xs duration-200 group-hover:block md:absolute md:right-24 md:hidden md:group-hover:animate-fade-right lg:block lg:group-hover:animate-none">
        {label}
      </p>
    </button>
  );
};

export const AdderBtnDragOverly = ({ pageElement }) => {
  const { label, icon: Icon } = pageElement.ElementAdderBtn;

  return (
    <Button
      className="bg-secondaryBg flex h-14 w-4/5 cursor-grab gap-2 rounded-md border border-dashed border-black transition-all duration-300 md:w-full"
      variant="outline"
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default AddElementButton;
