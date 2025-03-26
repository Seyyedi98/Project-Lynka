import CardFieldDefault from "../theme/card/card-field-default";
import CardFieldMinimal from "../theme/card/card-field-minimal";
import SpaceFieldDefault from "../theme/space/space-field-default";
import DeviderFieldDefault from "../theme/devider/devider-field-default";
import CountdownFieldDefault from "../theme/countdown/countdown-field-default";
import TextFieldDefault from "../theme/text/text-field-default";
import VideoFieldDefault from "../theme/video/video-field-default";
import RssFieldDefault from "../theme/rss/rss-field-default";
import FaqFieldDefault from "../theme/faq/faq-field-default";
import SocialsFieldDefault from "../theme/socials/socials-field-default";
import MapFieldDefault from "../theme/map/map-field-default";
import ImageFieldDefault from "../theme/Image/image-field-default";
import CarouselFieldDefault from "../theme/carousel/carousel-field-default";
import PostTrackerFieldDefault from "../theme/postTracker/postTracker-field-default";
import FormFieldDefault from "../theme/form/form-field-default";
import GalleryFieldDefault from "../theme/gallery/gallery-field-default";

export const ElementThemeController = {
  SocialsField: {
    default: [SocialsFieldDefault, { type: "color" }, { isPremium: false }],
  },
  CardField: {
    default: [CardFieldDefault, { type: "color" }, { isPremium: false }],
    minimal: [CardFieldMinimal, { type: "color" }, { isPremium: true }],
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
