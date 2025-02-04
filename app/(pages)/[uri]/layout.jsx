import { getPageMetadata } from "@/actions/page";

// export async function generateMetadata({ params }) {
//   const { uri } = await params;
//   // let favicon;

//   try {
//     const metadata = await getPageMetadata(uri);
//     if (!metadata) throw new Error("metadata not found");
//     const favicon = JSON.parse(metadata?.favicon)?.url;

//     return {
//       title: metadata.metaTitle || "My Page",
//       description: metadata.metaDescription || "Welcome!",
//       icons: [{ rel: "icon", url: favicon }],

//       openGraph: {
//         title: metadata.metaTitle || "My Page",
//         description: metadata.metaDescription || "Welcome!",
//         // url: `https://example.com/${uri}`, // Dynamically construct URL
//         siteName: "My Site",
//         images: [{ url: metadata.metaImage }], // Open Graph Image
//         type: "website",
//       },

//       robots: {
//         index: true,
//         follow: true,
//         nocache: false,
//         googleBot: {
//           index: true,
//           follow: true,
//         },
//       },

//       // themeColor: "#ffffff", // set to page bg color
//     };
//   } catch (error) {
//     console.error("Metadata fetch failed:", error);
//     return {
//       title: "Error",
//       description: "Unable to fetch metadata",
//     };
//   }
// }

const PreviewLayout = ({ children }) => {
  return <div className="h-dvh w-full bg-neutral-50">{children}</div>;
};

export default PreviewLayout;
