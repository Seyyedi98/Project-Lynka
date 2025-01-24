import { getPreviewPageDataByUri } from "@/actions/page";
import LivePageElements from "@/app/_components/live-page/live-page-elements-rendere";
import getPageContent from "@/lib/page/get-page-content";
import { notFound } from "next/navigation";

const LivePage = async ({ params }) => {
  const { uri } = await params;

  const page = await getPreviewPageDataByUri(uri);
  // if (!page) return <p className="bg-red-500">loading...</p>;
  if (page.error) return notFound();

  const content = getPageContent(page);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <section className="flex h-full w-3/4 max-w-[400px] flex-col items-center justify-center gap-4">
        <LivePageElements content={content} />
      </section>
    </div>
  );
};

export default LivePage;
