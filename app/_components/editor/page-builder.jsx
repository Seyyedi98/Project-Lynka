/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useEditor from "@/hooks/useEditor";
import getPageContent from "@/lib/page/get-page-content";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import BuilderWorkspace from "./builder-workspace";
import DragOverlyWrapper from "./element/drag-overly-wrapper";
import getPageHero from "@/lib/page/get-page-header";
import { Loader2Icon } from "lucide-react";

// Former editor-canvas
const PageBuilder = ({ page }) => {
  const { setElements, setSelectedElement, setTheme, setHero } = useEditor();
  const [isReady, setIsReady] = useState(false);
  const pageTheme = JSON.parse(page.theme);

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
    if (!page.content) return notFound();
    const elements = getPageContent(page);
    const hero = getPageHero(page);
    setTheme(pageTheme);
    setSelectedElement(null);
    setElements(elements);
    setHero(hero);
    setIsReady(true);
  }, [page, setElements, setSelectedElement, setHero, setTheme]);

  // workspace loading
  if (!isReady)
    return (
      <div className="grid h-full w-full place-content-center bg-primary-foreground">
        <Loader2Icon className="animate-spin" />
      </div>
    );

  return (
    <DndContext sensors={sensors}>
      <BuilderWorkspace />
      <DragOverlyWrapper />
    </DndContext>
  );
};

export default PageBuilder;
