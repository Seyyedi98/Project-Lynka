"use client";

import { PageHeroElement } from "../elements/hero/page-hero-element";

const LivePageHero = ({ hero }) => {
  const HeroElement = PageHeroElement?.LivePageComponent;

  return (
    <>
      <HeroElement elementInstance={hero} />
    </>
  );
};

export default LivePageHero;
