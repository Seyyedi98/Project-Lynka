import { getPageDataByUri } from "@/actions/page";
import PreviewPageElements from "@/app/_components/preview/preview-elements-rendere";
import { notFound } from "next/navigation";

const PreviewPage = async ({ params }) => {
  const { uri } = await params;

  const page = await getPageDataByUri(uri);
  if (!page) return notFound();

  const content = JSON.parse(page.content);

  return (
    <div className="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-2">
      <PreviewPageElements content={content} />
    </div>
  );
};

export default PreviewPage;
