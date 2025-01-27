import BasicHero from "../theme/hero/basic";
import NormalHero from "../theme/hero/normal";
import TransparentHero from "../theme/hero/transparent";

export const HeroController = {
  transparent: [TransparentHero, { type: "color" }],
  normal: [NormalHero, { type: "color" }],
  basic: [BasicHero, { type: "color" }],
};
