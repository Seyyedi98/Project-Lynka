import { getUserPageDataByUri } from "@/actions/page";
import PageBuilder from "@/app/_components/editor/page-builder";

const EditorPage = async ({ params }) => {
  const { uri } = await params;
  const page = await getUserPageDataByUri(uri);

  return (
    <>
      {/* <EditorNavbar uri={uri} /> */}
      <PageBuilder page={page} />;
    </>
  );
};

export default EditorPage;
