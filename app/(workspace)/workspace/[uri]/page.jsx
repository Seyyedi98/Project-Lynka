import { getUserPageDataByUri } from "@/actions/page";
import PageBuilder from "@/app/_components/editor/page-builder";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const EditorPage = async ({ params }) => {
  const { uri } = await params;
  const page = await getUserPageDataByUri(uri);

  if (page.theme) {
    return (
      <>
        <PageBuilder page={page} />
      </>
    );
  }

  if (!page.theme) {
    redirect(`${uri}/theme`);
  }
};
export default EditorPage;
