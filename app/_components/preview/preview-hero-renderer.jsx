"use client";

import useEditor from "@/hooks/useEditor";
import { PageElements } from "../controller/page-elements";
import { PageHeroElement } from "../elements/hero/page-hero-element";

const PreviewPageHero = () => {
  const { hero } = useEditor();
  const HeroElement = PageHeroElement.LivePageComponent;

  return (
    <>
      <HeroElement elementInstance={hero} />
    </>
  );
};

export default PreviewPageHero;
