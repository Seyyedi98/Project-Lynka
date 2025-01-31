import { getPageMetadata } from "@/actions/page";

// export async function generateMetadata({ params }) {
//   const { uri } = await params;

//   try {
//     const metadata = await getPageMetadata(uri);

//     console.log(metadata);
//     if (!metadata) throw new Error("metadata not found");
//     const favicon = await JSON.parse(metadata[0].favicon).url;
//     return {
//       title: metadata[0].metaTitle || "My Page",
//       description: metadata[0].metaDescription || "Welcome!",
//       icons: [{ rel: "icon", url: favicon }],
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
