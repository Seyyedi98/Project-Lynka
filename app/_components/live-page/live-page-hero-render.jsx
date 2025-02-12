import HeroLivePageComponent from "../elements/hero/conponents/LivePageComponent";

const LivePageHero = ({ hero }) => {
  return (
    <div className="w-full">
      <HeroLivePageComponent elementInstance={hero} />
    </div>
  );
};

export default LivePageHero;
