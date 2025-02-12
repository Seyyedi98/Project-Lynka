import { useSelector } from "react-redux";
import PreviewPageElements from "./preview-elements-renderer";
import PreviewPageHero from "./preview-hero-renderer";

const PreviewPageContainer = () => {
  const theme = useSelector((state) => state.page.theme);

  const colorBgStyle = {
    backgroundColor: theme.backgroundColor,
    background: theme.backgroundColor,
  };
  const imageBgStyle = {
    backgroundImage:
      theme.backgroundType === "image" &&
      `url(${JSON.parse(theme.backgroundImage).url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      style={
        theme.backgroundType === "color" || theme.backgroundType === "gradient"
          ? colorBgStyle
          : imageBgStyle
      }
      className="flex h-svh w-full flex-col items-center justify-center"
    >
      <div>
        <PreviewPageHero />
      </div>
      <section className="mt-2 flex h-full w-full max-w-[400px] flex-col items-center justify-start gap-4">
        <PreviewPageElements />
      </section>
    </div>
  );
};

export default PreviewPageContainer;
