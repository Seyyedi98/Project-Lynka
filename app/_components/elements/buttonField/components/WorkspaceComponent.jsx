"use client";
import { memo } from "react";
import { ThemeController } from "../../../controller/theme-controller";

export const WorkspaceComponent = memo(function WorkspaceComponent({
  elementInstance,
}) {
  const element = elementInstance;
  const data = element.extraAttributes;
  const RenderedElement = ThemeController[element.type][data.theme][0];

  return <RenderedElement {...data} />;
});
