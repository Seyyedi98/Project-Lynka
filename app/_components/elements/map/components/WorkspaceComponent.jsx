"use client";
import { memo } from "react";
import { ElementThemeController } from "../../../controller/element-theme-controller";
import { useUserSubscription } from "@/hooks/useUserSubscription";

export const WorkspaceComponent = memo(function WorkspaceComponent({
  elementInstance,
}) {
  const element = elementInstance;
  const data = element.extraAttributes;
  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  const { isPremium } = useUserSubscription();

  return <RenderedElement isLive={false} isPremium={isPremium} {...data} />;
});
