import PageBuilder from "@/app/_components/editor/builder/page-builder";
import EditorNavbar from "@/app/_components/navbar/editor-navbar";
import { UpdatePageContent } from "@/lib/page/page-data";

const EditorPage = async ({ params }) => {
  const { uri } = await params;

  return (
    <>
      <EditorNavbar uri={uri} />
      <PageBuilder />;
    </>
  );
};

export default EditorPage;
