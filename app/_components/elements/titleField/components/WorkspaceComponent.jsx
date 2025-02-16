"use client";
import { memo } from "react";
import { ElementThemeController } from "../../../controller/element-theme-controller";

export const WorkspaceComponent = memo(function WorkspaceComponent({
  elementInstance,
}) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];

  return <RenderedElement {...data} />;
});
