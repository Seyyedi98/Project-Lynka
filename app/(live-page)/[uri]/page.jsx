import { getPageMetadata, increasePageView } from "@/actions/page/page";
import LoadingSpinner from "@/app/_components/common/shared/loadingSpinner";
import LivePageBackground from "@/app/_components/live-page/live-page-background";
import LivePageElements from "@/app/_components/live-page/live-page-elements-render";
import LivePageHero from "@/app/_components/live-page/live-page-hero-render";
import { getSubscriptionByUri } from "@/lib/auth/user-subscription";
import getPageContent from "@/lib/page/get-page-content";
import getPageHero from "@/lib/page/get-page-hero";
import { cn } from "@/lib/utils";
import fetchWithRetry from "@/utils/fetchWithRetry";
import getImageAddress from "@/utils/get-image-address";
import parseJson from "@/utils/parseJSON";
import { notFound } from "next/navigation";

// ✅ Dynamic Metadata Fetching with Error Handling
export async function generateMetadata({ params }) {
  const { uri } = await params;

  const subscription = await getSubscriptionByUri(uri);
  if (!subscription) return;
  const { isSilver } = subscription;

  // TODO: run in background
  await increasePageView(uri);

  try {
    const metadata = await getPageMetadata(uri);
    if (!metadata) throw new Error("Metadata not found");

    const favicon = metadata?.favicon
      ? getImageAddress(parseJson(metadata?.favicon)?.key)
      : null;
    const metaImage =
      isSilver && metadata?.metaImage
        ? getImageAddress(parseJson(metadata?.metaImage)?.key)
        : null;

    return {
      title: metadata.metaTitle || "Miralink",
      description: isSilver ? metadata.metaDescription || "Welcome!" : "",
      favicon: "null",
      icons: [
        {
          rel: "icon",
          url:
            favicon ||
            "https://arklight.storage.c2.liara.space/files/arcane.ico",
        },
      ],
      openGraph: {
        title: isSilver ? metadata.metaTitle || "My Page" : "",
        description: isSilver ? metadata.metaDescription || "Welcome!" : "",
        siteName: metadata.metaTitle,
        url: "https://link.liara.run",
        images: [
          { url: metaImage, width: 720, height: 480, alt: "Share image" },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metadata.metaTitle,
        description: isSilver ? metadata.metaDescription : "",
        images: [metaImage],
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: { index: true, follow: true },
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return { title: "Error", description: "Unable to fetch metadata" };
  }
}

// ✅ Live Page Component
const LivePage = async ({ params }) => {
  const { uri } = await params;
  const isDesktop = true;

  const page = await fetchWithRetry(uri);

  if (!page) {
    return (
      <div className="grid h-screen w-screen place-items-center">
        <p className="text-red-500">
          ⚠️ Error: Unable to fetch page data. Please try again later.
        </p>
      </div>
    );
  }

  if (page.error) {
    return notFound();
  }

  const hero = getPageHero(page);
  const content = getPageContent(page);

  let theme;
  try {
    theme = JSON.parse(page.theme);
  } catch (error) {
    console.error("Error parsing theme:", error);
    theme = { backgroundColor: "#fff" };
  }

  return (
    <>
      <LivePageBackground theme={theme}>
        {page.loadingIcon && (
          <div
            className={cn(
              `absolute z-[50] grid h-svh w-dvw animate-fade-in place-items-center bg-background opacity-100 transition-opacity`,
              page && "pointer-events-none opacity-0",
            )}
          >
            <LoadingSpinner elementInstances={page.loadingIcon} />
          </div>
        )}

        <main className="flex w-full flex-col items-center overflow-y-auto pb-20 [scrollbar-width:none]">
          {/* Hero Section */}
          <LivePageHero hero={hero} />

          {/* Content Section */}
          <section className="mt-2 flex w-[90%] max-w-[400px] flex-col items-center justify-start gap-4">
            <LivePageElements uri={uri} content={content} />
          </section>
        </main>
      </LivePageBackground>
    </>
  );
};

export default LivePage;
