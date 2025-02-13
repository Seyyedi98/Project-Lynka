"use client";
import { ElementThemeController } from "../../../controller/element-theme-controller";

export function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ElementThemeController[element.type][theme][0];

  return <RenderedElement {...data} />;
}
