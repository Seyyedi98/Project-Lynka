import PageBuilder from "@/app/_components/editor/builder/page-builder";
import EditorNavbar from "@/app/_components/navbar/editor-navbar";
import { getPageDataByUri } from "@/lib/page/page";

const EditorPage = async ({ params }) => {
  const { uri } = await params;
  const page = await getPageDataByUri(uri);

  return (
    <>
      <EditorNavbar uri={uri} />
      <PageBuilder page={page} />;
    </>
  );
};

export default EditorPage;
