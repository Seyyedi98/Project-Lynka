"use client";

import useEditor from "@/hooks/useEditor";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import DragOverlyWrapper from "../element/drag-overly-wrapper";
import BuilderWorkspace from "./builder-workspace";

// Former editor-canvas
const PageBuilder = ({ page }) => {
  const { setElements, setSelectedElement } = useEditor();
  const [isReady, setIsReady] = useState(false);

  // const shareUrl = `${window.location.origin}/${page.shareUrl}`

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 12 pixels before activating
    activationConstraint: {
      distance: 12,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // Get page elements, then empty elements list (if there is a data from other pages) and set current form elements
  useEffect(() => {
    const elements = JSON.parse(page.content);
    setSelectedElement(null);
    setElements(elements);
    setIsReady(true);
  }, [page, setElements, setSelectedElement]);

  return (
    <DndContext sensors={sensors}>
      <BuilderWorkspace />
      <DragOverlyWrapper />
    </DndContext>
  );
};

export default PageBuilder;
