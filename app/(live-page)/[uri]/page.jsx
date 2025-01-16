import { getPreviewPageDataByUri } from "@/actions/page";
import PreviewPageElements from "@/app/_components/live-page/preview-elements-rendere";
import getPageContent from "@/lib/page/get-page-content";
import { notFound } from "next/navigation";

const PreviewPage = async ({ params }) => {
  const { uri } = await params;

  const page = await getPreviewPageDataByUri(uri);
  if (page.error) return notFound();

  const content = getPageContent(page);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <section className="flex h-full w-3/4 max-w-[400px] flex-col items-center justify-center gap-4">
        <PreviewPageElements content={content} />
      </section>
    </div>
  );
};

export default PreviewPage;
