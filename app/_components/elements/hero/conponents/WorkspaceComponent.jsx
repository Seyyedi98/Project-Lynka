"use client";
import { memo } from "react";
import { HeroController } from "../../../controller/hero-controller";

const WorkspaceComponent = memo(function WorkspaceComponent({
  elementInstance,
}) {
  const element = elementInstance;
  // Ensure element is defined and has a valid 'extraAttributes' property before checking length
  if (
    !element ||
    !element.extraAttributes ||
    Object.keys(element.extraAttributes).length === 0
  )
    return;

  const data = element?.extraAttributes;
  const RenderedElement = HeroController[data.style][0];

  return <RenderedElement {...data} />;
});

export default WorkspaceComponent;
