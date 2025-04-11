import HeroLivePageComponent from "../elements/hero/conponents/LivePageComponent";

const LivePageHero = ({ hero }) => {
  console.log(hero);
  return (
    <div className="w-full">
      <HeroLivePageComponent elementInstance={hero} />
    </div>
  );
};

export default LivePageHero;
