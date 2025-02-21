import { useSelector } from "react-redux";
import PreviewPageElements from "./preview-elements-renderer";
import PreviewPageHero from "./preview-hero-renderer";
import { cn } from "@/lib/utils";

const PreviewPageContainer = () => {
  const theme = useSelector((state) => state.page.theme);

  const colorBgStyle = {
    backgroundColor: theme.backgroundColor,
    background: theme.backgroundColor,
    backgroundSize: theme.backgroundType === "gradient" ? "200% 200%" : "cover",
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
        theme.backgroundType === "color" ||
        theme.backgroundType === "gradient" ||
        theme.backgroundType === "pattern"
          ? colorBgStyle
          : imageBgStyle
      }
      className={cn(
        `flex h-svh w-full flex-col items-center justify-center overflow-y-scroll pb-20 [scrollbar-width:none]`,
        theme.isBackgroundAnimated &&
          theme.backgroundType === "gradient" &&
          "animate-bg-move",
      )}
    >
      <div className="h-full">
        <div>
          <PreviewPageHero />
        </div>
        <section className="mt-2 flex w-full max-w-[400px] flex-col items-center justify-start gap-4 px-4">
          <PreviewPageElements />
        </section>
      </div>
    </div>
  );
};

export default PreviewPageContainer;
