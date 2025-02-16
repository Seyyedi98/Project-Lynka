import { ElementThemeController } from "../../../controller/element-theme-controller";

function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ElementThemeController[element.type][data.theme][0];
  return <RenderedElement isLive={true} {...data} />;
}

export default LivePageComponent;

// <iframe
//         style={{ borderRadius: "12px" }}
//         src="https://open.spotify.com/embed/track/2yLE4fvbroJS8JNa3YA6ZB?utm_source=generator"
//         width="100%"
//         height="80"
//         frameBorder="0"
//         allowFullScreen
//         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//         loading="lazy"
//         className=""
//       ></iframe>
