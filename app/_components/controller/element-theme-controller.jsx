import CardFieldDefault from "../elements_theme/card/card-field-default";
import CardFieldMinimal from "../elements_theme/card/card-field-toon";
import SpaceFieldDefault from "../elements_theme/space/space-field-default";
import DeviderFieldDefault from "../elements_theme/devider/devider-field-default";
import CountdownFieldDefault from "../elements_theme/countdown/countdown-field-default";
import TextFieldDefault from "../elements_theme/text/text-field-default";
import VideoFieldDefault from "../elements_theme/video/video-field-default";
import RssFieldDefault from "../elements_theme/rss/rss-field-default";
import FaqFieldDefault from "../elements_theme/faq/faq-field-default";
import SocialsFieldDefault from "../elements_theme/socials/socials-field-default";
import MapFieldDefault from "../elements_theme/map/map-field-default";
import ImageFieldDefault from "../elements_theme/Image/image-field-default";
import CarouselFieldDefault from "../elements_theme/carousel/carousel-field-default";
import PostTrackerFieldDefault from "../elements_theme/postTracker/postTracker-field-default";
import FormFieldDefault from "../elements_theme/form/form-field-default";
import GalleryFieldDefault from "../elements_theme/gallery/gallery-field-default";
import CardFieldGlow from "../elements_theme/card/card-field-glow";

export const ElementThemeController = {
  SocialsField: {
    default: [SocialsFieldDefault, { type: "color" }, { isPremium: false }],
  },
  CardField: {
    default: [CardFieldDefault, { type: "color" }, { isPremium: false }],
    cartoon: [CardFieldMinimal, { type: "color" }, { isPremium: true }],
    glow: [CardFieldGlow, { type: "color" }, { isPremium: true }],
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
  },
  VideoField: {
    default: [VideoFieldDefault, { type: "color" }, { isPremium: true }],
  },
  RssField: {
    default: [RssFieldDefault, { type: "color" }, { isPremium: true }],
  },
  FaqField: {
    default: [FaqFieldDefault, { type: "color" }, { isPremium: true }],
  },
  MapField: {
    default: [MapFieldDefault, { type: "color" }, { isPremium: true }],
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
  },
};
