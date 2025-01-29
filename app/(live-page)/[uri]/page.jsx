import { getPreviewPageDataByUri } from "@/actions/page";
import LivePageElements from "@/app/_components/live-page/live-page-elements-rendere";
import LivePageHero from "@/app/_components/live-page/live-page-hero-rendere";
import getPageContent from "@/lib/page/get-page-content";
import getPageHero from "@/lib/page/get-page-header";
import fetchWithRetry from "@/utils/fetchWithRetry";
import { notFound } from "next/navigation";

// ✅ Dynamic Metadata Fetching with Error Handling
export async function generateMetadata({ params }) {
  const { uri } = await params;

  try {
    const page = await getPreviewPageDataByUri(uri);
    if (!page) throw new Error("Page not found");

    return {
      title: page.title || "My Page",
      description: page.description || "Welcome!",
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "Error",
      description: "Unable to fetch metadata",
    };
  }
}

// ✅ Live Page Component
const LivePage = async ({ params }) => {
  const { uri } = await params;

  // Try fetching page data with retry mechanism
  const page = await fetchWithRetry(uri);

  // Handle different states
  if (!page)
    return (
      <div className="grid h-screen w-screen place-items-center">
        <p className="text-red-500">
          ⚠️ Error: Unable to fetch page data. Please try again later.
        </p>
      </div>
    );
  if (page.error) return notFound();

  // Extract data
  const hero = getPageHero(page);
  const content = getPageContent(page);

  let theme;
  try {
    theme = JSON.parse(page.theme);
  } catch (error) {
    console.error("Error parsing theme:", error);
    theme = { backgroundValue: "#fff" }; // Default fallback theme
  }

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
