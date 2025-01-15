import { getPreviewPageDataByUri } from "@/actions/page";
import PreviewPageElements from "@/app/_components/preview/preview-elements-rendere";
import { notFound } from "next/navigation";

const PreviewPage = async ({ params }) => {
  const { uri } = await params;

  const page = await getPreviewPageDataByUri(uri);
  if (page.error) return notFound();

  const content = JSON.parse(page.content);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <section className="flex h-full w-3/4 max-w-[400px] flex-col items-center justify-center gap-4">
        <PreviewPageElements content={content} />
      </section>
    </div>
  );
};

export default PreviewPage;
