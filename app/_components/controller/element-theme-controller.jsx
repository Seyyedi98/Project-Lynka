import ImageFieldDefault from "../elements_theme/Image/image-field-default";
import CardFieldAqua from "../elements_theme/card/card-field-aqua";
import CardFieldDashed from "../elements_theme/card/card-field-dashed";
import CardFieldDefault from "../elements_theme/card/card-field-default";
import CardFieldFlat from "../elements_theme/card/card-field-flat";
import CardFieldGlitch from "../elements_theme/card/card-field-glitch";
import CardFieldGlow from "../elements_theme/card/card-field-glow";
import CardFieldHexa from "../elements_theme/card/card-field-hexa";
import CardFieldLiquidGlass from "../elements_theme/card/card-field-liquidGlass";
import CardFieldNeon from "../elements_theme/card/card-field-neon";
import CardFieldSketch from "../elements_theme/card/card-field-sketch";
import CardFieldMinimal from "../elements_theme/card/card-field-toon";
import CardFieldToon2 from "../elements_theme/card/card-field-toon2";
import CardFieldTransparent from "../elements_theme/card/card-field-transparent";
import CardFieldWindows from "../elements_theme/card/card-field-windows";
import CarouselFieldDefault from "../elements_theme/carousel/carousel-field-default";
import CountdownFieldDefault from "../elements_theme/countdown/countdown-field-default";
import DeviderFieldDefault from "../elements_theme/devider/devider-field-default";
import FaqFieldDefault from "../elements_theme/faq/faq-field-default";
import FaqFieldToon from "../elements_theme/faq/faq-field-toon";
import FaqFieldWindows95 from "../elements_theme/faq/faq-field-windows95";
import FormFieldDefault from "../elements_theme/form/form-field-default";
import FormFieldTransparent from "../elements_theme/form/form-field-transparent";
import FormFieldWindows95 from "../elements_theme/form/form-field-windows95";
import GalleryFieldDefault from "../elements_theme/gallery/gallery-field-default";
import MapFieldDefault from "../elements_theme/map/map-field-default";
import MapFieldWindows95 from "../elements_theme/map/map-field-windows95";
import PostTrackerFieldDefault from "../elements_theme/postTracker/postTracker-field-default";
import ProductFieldDefault from "../elements_theme/product/default/product-field-default";
import RssFieldDefault from "../elements_theme/rss/rss-field-default";
import SocialsFieldAero from "../elements_theme/socials/socials-field-aero";
import SocialsFieldDefault from "../elements_theme/socials/socials-field-default";
import SocialsFieldGlitch from "../elements_theme/socials/socials-field-glitch";
import SocialsFieldMacOS from "../elements_theme/socials/socials-field-macos";
import SocialsFieldOnlyIcon from "../elements_theme/socials/socials-field-onlyIcon";
import SocialsFieldOnlyIconCustom from "../elements_theme/socials/socials-field-onlyIcon-custom";
import SocialsFieldRounded from "../elements_theme/socials/socials-field-rounded";
import SocialsFieldSmallCircle from "../elements_theme/socials/socials-field-smallCircle";
import SocialsFieldWindows from "../elements_theme/socials/socials-field-windows";
import SocialsFieldWindows95 from "../elements_theme/socials/socials-field-windows95";
import SpaceFieldDefault from "../elements_theme/space/space-field-default";
import TextFieldDefault from "../elements_theme/text/text-field-default";
import TextFieldLiquidGlass from "../elements_theme/text/text-field-liquidGlass";
import TextFieldWindows95 from "../elements_theme/text/text-field-windows95";
import VideoFieldDefault from "../elements_theme/video/video-field-default";

export const ElementThemeController = {
  SocialsField: {
    default: [SocialsFieldDefault, { type: "color" }, { isPremium: false }],
    small: [SocialsFieldSmallCircle, { type: "color" }, { isPremium: false }],
    simple: [SocialsFieldOnlyIcon, { type: "color" }, { isPremium: false }],
    simpleCustom: [
      SocialsFieldOnlyIconCustom,
      { type: "color" },
      { isPremium: false },
    ],
    rounded: [SocialsFieldRounded, { type: "color" }, { isPremium: false }],
    windows: [SocialsFieldWindows, { type: "color" }, { isPremium: true }],
    windows95: [SocialsFieldWindows95, { type: "color" }, { isPremium: true }],
    macos: [SocialsFieldMacOS, { type: "color" }, { isPremium: true }],
    aero: [SocialsFieldAero, { type: "color" }, { isPremium: true }],
    glitch: [SocialsFieldGlitch, { type: "color" }, { isPremium: true }],
  },
  CardField: {
    default: [CardFieldDefault, { type: "color" }, { isPremium: false }],
    transparent: [
      CardFieldTransparent,
      { type: "color" },
      { isPremium: false },
    ],
    cartoon: [CardFieldMinimal, { type: "color" }, { isPremium: true }],
    glow: [CardFieldGlow, { type: "color" }, { isPremium: true }],
    sketch: [CardFieldSketch, { type: "color" }, { isPremium: true }],
    windows95: [CardFieldWindows, { type: "color" }, { isPremium: true }],
    neon: [CardFieldNeon, { type: "color" }, { isPremium: true }],
    glitch: [CardFieldGlitch, { type: "color" }, { isPremium: true }],
    hexa: [CardFieldHexa, { type: "color" }, { isPremium: true }],
    dashed: [CardFieldDashed, { type: "color" }, { isPremium: true }],
    toon2: [CardFieldToon2, { type: "color" }, { isPremium: true }],
    aqua: [CardFieldAqua, { type: "color" }, { isPremium: true }],
    flat: [CardFieldFlat, { type: "color" }, { isPremium: true }],
    liquidGlass: [CardFieldLiquidGlass, { type: "color" }, { isPremium: true }],
  },
  ProductField: {
    default: [ProductFieldDefault, { type: "color" }, { isPremium: true }],
  },
  SpaceField: {
    default: [SpaceFieldDefault, { type: "color" }, { isPremium: false }],
  },
  DeviderField: {
    default: [DeviderFieldDefault, { type: "color" }, { isPremium: false }],
  },
  CountdownField: {
    default: [CountdownFieldDefault, { type: "color" }, { isPremium: true }],
  },
  TextField: {
    default: [TextFieldDefault, { type: "color" }, { isPremium: false }],
    liquidGlass: [
      TextFieldLiquidGlass,
      { type: "color" },
      { isPremium: false },
    ],
    windows95: [TextFieldWindows95, { type: "color" }, { isPremium: false }],
  },
  VideoField: {
    default: [VideoFieldDefault, { type: "color" }, { isPremium: true }],
  },
  RssField: {
    default: [RssFieldDefault, { type: "color" }, { isPremium: true }],
  },
  FaqField: {
    default: [FaqFieldDefault, { type: "color" }, { isPremium: true }],
    windows95: [FaqFieldWindows95, { type: "color" }, { isPremium: true }],
    toon: [FaqFieldToon, { type: "color" }, { isPremium: true }],
  },
  MapField: {
    default: [MapFieldDefault, { type: "color" }, { isPremium: true }],
    windows95: [MapFieldWindows95, { type: "color" }, { isPremium: true }],
  },
  ImageField: {
    default: [ImageFieldDefault, { type: "color" }, { isPremium: true }],
  },
  GalleryField: {
    default: [GalleryFieldDefault, { type: "color" }, { isPremium: true }],
  },
  CarouselField: {
    default: [CarouselFieldDefault, { type: "color" }, { isPremium: true }],
  },
  PostTrackerField: {
    default: [PostTrackerFieldDefault, { type: "color" }, { isPremium: true }],
  },
  FormField: {
    default: [FormFieldDefault, { type: "color" }, { isPremium: true }],
    transparent: [FormFieldTransparent, { type: "color" }, { isPremium: true }],
    windows95: [FormFieldWindows95, { type: "color" }, { isPremium: true }],
  },
};
