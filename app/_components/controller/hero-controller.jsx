import AuroraHero from "../elements_theme/hero/aurora";
import BasicHero from "../elements_theme/hero/basic";
import BgCurvedHero from "../elements_theme/hero/bgcurved";
import BgFadeHero from "../elements_theme/hero/bgFade";
import BubbleHero from "../elements_theme/hero/bubbles";
import CardHero from "../elements_theme/hero/card";
import CollageHero from "../elements_theme/hero/collage";
import NormalHero from "../elements_theme/hero/normal";
import TransparentHero from "../elements_theme/hero/transparent";

export const HeroController = {
  transparent: [TransparentHero, { type: "color" }],
  curved: [BgCurvedHero, { type: "color" }],
  bgFade: [BgFadeHero, { type: "image" }],
  normal: [NormalHero, { type: "color" }],
  basic: [BasicHero, { type: "color" }],
  bubbles: [BubbleHero, { type: "color" }],
  card: [CardHero, { type: "color" }],
  aurora: [AuroraHero, { type: "color" }],
  collage: [CollageHero, { type: "color" }],
};
