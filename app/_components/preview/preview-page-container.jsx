import React from "react";
import PreviewPageElements from "./preview-elements-renderer";
import PreviewPageHero from "./preview-hero-renderer";
import useEditor from "@/hooks/useEditor";

const PreviewPageContainer = () => {
  const { theme } = useEditor();
  const style = {
    backgroundColor: theme.backgroundValue,
    background: theme.backgroundValue,
  };

  return (
    <div
      style={style}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <PreviewPageHero />
      <section className="mt-6 flex h-full w-full max-w-[400px] flex-col items-center justify-start gap-4">
        <PreviewPageElements />
      </section>
    </div>
  );
};

export default PreviewPageContainer;
