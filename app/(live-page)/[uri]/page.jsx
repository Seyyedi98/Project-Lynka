import { getPreviewPageDataByUri } from "@/actions/page";
import LivePageElements from "@/app/_components/live-page/live-page-elements-rendere";
import LivePageHero from "@/app/_components/live-page/live-page-hero-rendere";
import getPageContent from "@/lib/page/get-page-content";
import getPageHero from "@/lib/page/get-page-header";
import { notFound } from "next/navigation";

const LivePage = async ({ params }) => {
  const { uri } = await params;

  const page = await getPreviewPageDataByUri(uri);
  // if (!page) return <p className="bg-red-500">loading...</p>;
  if (page.error) return notFound();

  const hero = getPageHero(page);
  const content = getPageContent(page);

  const theme = await JSON.parse(page.theme);

  const style = {
    backgroundColor: theme.backgroundValue,
    background: theme.backgroundValue,
  };

  return (
    <div
      style={style}
      className="flex h-full w-full flex-col items-center justify-start gap-4"
    >
      <LivePageHero hero={hero} />

      <section className="flex h-full w-3/4 max-w-[400px] flex-col items-center justify-start gap-4">
        <LivePageElements content={content} />
      </section>
    </div>
  );
};

export default LivePage;
