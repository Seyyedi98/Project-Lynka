import { PageHeroElement } from "../elements/hero/page-hero-element";

const LivePageHero = ({ hero }) => {
  const HeroElement = PageHeroElement?.LivePageComponent;

  return (
    <div className="w-full">
      <HeroElement elementInstance={hero} />
    </div>
  );
};

export default LivePageHero;
