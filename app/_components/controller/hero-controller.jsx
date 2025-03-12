import BasicHero from "../theme/hero/basic";
import BgCurvedHero from "../theme/hero/bgcurved";
import BgFadeHero from "../theme/hero/bgFade";
import NormalHero from "../theme/hero/normal";
import TransparentHero from "../theme/hero/transparent";

export const HeroController = {
  transparent: [TransparentHero, { type: "color" }],
  curved: [BgCurvedHero, { type: "color" }],
  bgFade: [BgFadeHero, { type: "image" }],
  normal: [NormalHero, { type: "color" }],
  basic: [BasicHero, { type: "color" }],
};
