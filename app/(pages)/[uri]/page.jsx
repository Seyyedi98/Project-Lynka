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

  // Handle excluded URIs
  if (
    uri === "dashboard" ||
    uri.startsWith("workspace") ||
    uri === "favicon.ico"
  ) {
    return null;
  }

  try {
    // Fetch the page metadata
    const metadata = await getPageMetadata(uri);
    if (!metadata) throw new Error("Metadata not found");

    // Parse metadata for favicon and meta image
    const favicon = metadata?.favicon
      ? JSON.parse(metadata?.favicon)?.url
      : null;

    const metaImage = metadata?.metaImage
      ? JSON.parse(metadata.metaImage).url
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
        siteName: metadata.metaTitle,
        url: "https://link.liara.run",
        images: [
          { url: metaImage, width: 720, height: 480, alt: "Share image" },
        ], // Open Graph Image
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        images: [metaImage],
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

  // Handle excluded URIs
  if (
    uri === "dashboard" ||
    uri.startsWith("workspace") ||
    uri === "favicon.ico"
  ) {
    return null;
  }

  // Try fetching page data with retry mechanism
  const page = await fetchWithRetry(uri);

  // Handle different states
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
    return notFound(); // Return 404 if there is an error
  }

  // Extract data from the page
  const hero = getPageHero(page);
  const content = getPageContent(page);

  // Handle theme parsing with fallback
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
    <>
      {/* Loading Spinner */}
      {page.loadingIcon && (
        <div
          className={cn(
            `absolute z-[50] grid h-svh w-dvw place-items-center bg-background opacity-100 transition-opacity duration-300 animate-out`,
            page && "pointer-events-none opacity-0",
          )}
        >
          <LoadingSpinner elementInstances={page.loadingIcon} />
        </div>
      )}
      <div
        style={style}
        className="relative flex h-full w-full flex-col items-center justify-start gap-4"
      >
        {/* Hero Section */}
        <LivePageHero hero={hero} />

        {/* Content Section */}
        <section className="flex h-full w-[90%] max-w-[400px] flex-col items-center justify-start gap-4">
          <LivePageElements content={content} />
        </section>
      </div>
    </>
  );
};

export default LivePage;
