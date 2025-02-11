"use client";
import { ThemeController } from "../../../controller/theme-controller";

export function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const { title, theme } = element.extraAttributes;

  const RenderedElement = ThemeController[element.type][theme][0];

  return <RenderedElement title={title} />;
}
