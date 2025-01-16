"use client";

import PreviewPageElements from "@/app/_components/preview/preview-elements-rendere";

const PreviewPage = () => {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <section className="flex h-full w-3/4 max-w-[400px] flex-col items-center justify-center gap-4">
          <PreviewPageElements />
        </section>
      </div>
    </>
  );
};

export default PreviewPage;
