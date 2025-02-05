import { getPageMetadata } from "@/actions/page";
import LoadingSpinner from "@/app/_components/common/shared/loadingSpinner";
import LivePageElements from "@/app/_components/live-page/live-page-elements-rendere";
import LivePageHero from "@/app/_components/live-page/live-page-hero-rendere";
import getPageContent from "@/lib/page/get-page-content";
import getPageHero from "@/lib/page/get-page-header";
import { cn } from "@/lib/utils";
import fetchWithRetry from "@/utils/fetchWithRetry";
import { notFound } from "next/navigation";

// ✅ Dynamic Metadata Fetching with Error Handling
export async function generateMetadata({ params }) {
  const { uri } = await params;
  if (["dashboard", "workspace"].includes(uri)) {
    return;
  }

  try {
    const metadata = await getPageMetadata(uri);
    if (!metadata) throw new Error("metadata not found");
    const favicon = metadata?.favicon
      ? JSON.parse(metadata?.favicon)?.url
      : null;

    return {
      title: metadata.metaTitle || "My Page",
      description: metadata.metaDescription || "Welcome!",
      icons: [
        {
          rel: "icon",
          url:
            favicon ||
            "https://arklight.storage.c2.liara.space/files/arcane.ico",
        },
      ],

      openGraph: {
        title: metadata.metaTitle || "My Page",
        description: metadata.metaDescription || "Welcome!",
        // url: `https://example.com/${uri}`, // Dynamically construct URL
        siteName: "My Site",
        images: [{ url: metadata.metaImage }], // Open Graph Image
        type: "website",
      },

      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
        },
      },

      // themeColor: "#ffffff", // set to page bg color
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
  if (["dashboard", "workspace"].includes(uri)) {
    return;
  }

  console.log("live server render!!!");

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
      className="relative flex h-full w-full flex-col items-center justify-start gap-4"
    >
      {page.loadingIcon && (
        <div
          className={cn(
            `absolute z-50 grid h-dvh w-dvw place-items-center bg-white opacity-100 transition-opacity duration-300 animate-out`,
            page && "pointer-events-none opacity-0",
          )}
        >
          <LoadingSpinner elementInstances={page.loadingIcon} />
        </div>
      )}
      <LivePageHero hero={hero} />
      <section className="flex h-full w-[90%] max-w-[400px] flex-col items-center justify-start gap-4">
        <LivePageElements content={content} />
      </section>
    </div>
  );
};

export default LivePage;
