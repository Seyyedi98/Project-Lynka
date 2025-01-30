"use client";

import { useSelector } from "react-redux";
import { PageHeroElement } from "../elements/hero/page-hero-element";

const PreviewPageHero = () => {
  const hero = useSelector((state) => state.page.hero);
  const HeroElement = PageHeroElement.LivePageComponent;

  return (
    <>
      <HeroElement elementInstance={hero} />
    </>
  );
};

export default PreviewPageHero;
