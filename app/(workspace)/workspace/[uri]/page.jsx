import { getUserPageDataByUri } from "@/actions/page";
import PageBuilder from "@/app/_components/editor/page-builder";
import ThemeSelector from "@/app/_components/editor/theme-selector";
import { redirect } from "next/navigation";

const EditorPage = async ({ params }) => {
  const { uri } = await params;
  const page = await getUserPageDataByUri(uri);

  if (page.theme) {
    return (
      <>
        {/* <EditorNavbar uri={uri} /> */}
        <PageBuilder page={page} />;
      </>
    );
  }

  if (!page.theme) {
    redirect(`${uri}/theme`);
  }
};
export default EditorPage;
