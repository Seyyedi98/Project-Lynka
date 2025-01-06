import useEditor from "@/hooks/useCanvas";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import React from "react";
import EditorSidebar from "../../navbar/editor-sidebar";
import { idGenerator } from "@/lib/is-generator";
import { PageElements } from "../element/page-elements";

// Former canvas
const BuilderWorkspace = () => {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useEditor();

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isEditorDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isAdderBtn = active.data?.current?.isAdderBtnElement;
      const isDroppingOverEditorArea = over.data?.current?.isEditorDropArea;

      // const isDroppingOverEditorElementTopHalf =
      //   over.data?.current?.isTopHalfEditorElement;
      // const isDroppingOverEditorElementBottomHalf =
      //   over.data?.current?.isBottomHalfEditorElement;

      // const droppingOverEditorElement =
      //   isDroppingOverEditorElementTopHalf ||
      //   isDroppingOverEditorElementBottomHalf;

      ////////////////////////////////////////////////////////////////////////////////////
      //      1. When drop new element on canvas, It will be added as a last item       //
      ////////////////////////////////////////////////////////////////////////////////////
      if (isAdderBtn && isDroppingOverEditorArea) {
        const type = active.data?.current?.type;
        const newElement = PageElements[type].contruct(idGenerator());

        addElement(elements.length, newElement);

        return;
      }
    },
  });

  return (
    <div className="flex h-full w-full pt-3 md:pt-20">
      <EditorSidebar />
      <div className="flex w-full flex-col items-center justify-center">
        <div
          ref={droppable.setNodeRef}
          style={{ height: "calc(100dvh - 180px)" }}
          className="w-3/4 rounded-lg bg-neutral-100 md:w-5/6"
        >
          {elements.map((element) => {
            return <p key={element.id}>{element.ExtraAttributes.title}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default BuilderWorkspace;
