import BasicHero from "../elements_theme/hero/basic";
import BgCurvedHero from "../elements_theme/hero/bgcurved";
import BgFadeHero from "../elements_theme/hero/bgFade";
import NormalHero from "../elements_theme/hero/normal";
import TransparentHero from "../elements_theme/hero/transparent";

export const HeroController = {
  transparent: [TransparentHero, { type: "color" }],
  curved: [BgCurvedHero, { type: "color" }],
  bgFade: [BgFadeHero, { type: "image" }],
  normal: [NormalHero, { type: "color" }],
  basic: [BasicHero, { type: "color" }],
};
