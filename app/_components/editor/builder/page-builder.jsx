"use client";

import React, { useState } from "react";
import BuilderWorkspace from "./builder-workspace";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useEditor from "@/hooks/useCanvas";
import DragOverlyWrapper from "../element/drag-overly-wrapper";

// Former editor-canvas
const PageBuilder = () => {
  const { setElements, setSelectedElements } = useEditor();
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

  return (
    <DndContext sensors={sensors}>
      <BuilderWorkspace />
      <DragOverlyWrapper />
    </DndContext>
  );
};

export default PageBuilder;
