/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import getPageContent from "@/lib/page/get-page-content";
import getPageHero from "@/lib/page/get-page-hero";
import fetchWithRetry from "@/utils/fetchWithRetry";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Loader2Icon } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

const BuilderWorkspace = dynamic(() => import("./builder-workspace"));
const DragOverlyWrapper = dynamic(
  () => import("./element/drag-overly-wrapper"),
);

const PageBuilder = ({ page }) => {
  const dispatch = useDispatch();
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
    const fetchData = async () => {
      if (!page.content) return notFound();

      // Fetch page data with retry logic
      const pageData = await fetchWithRetry(page.uri);
      if (!pageData) {
        return notFound(); // Handle failure after retries
      }

      // Load page elements from database
      const elements = getPageContent(pageData);
      const hero = getPageHero(pageData);

      // Set loaded data to state
      const newState = {
        elements: elements,
        hero: hero,
        theme: pageTheme,
        selectedElement: null,
        metadata: {
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          metaImage: page.metaImage,
          favicon: page.favicon,
        },
        messages: {
          tutorialCompleted: page.tutorialCompleted,
          showedPublishMessage: page.showedPublishMessage,
        },
      };

      dispatch({ type: "page/setInitialState", payload: newState });

      setIsReady(true);
    };

    fetchData();
  }, [page]);

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
