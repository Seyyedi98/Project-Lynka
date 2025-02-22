import { getWorkspacePageDataByUri } from "@/actions/page";
import PageBuilder from "@/app/_components/editor/page-builder";
import NotFound from "@/app/not-found";
import { currentUser } from "@/lib/auth/get-user";
import { notFound, redirect } from "next/navigation";

const EditorPage = async ({ params }) => {
  const { uri } = await params;
  const user = await currentUser();
  const page = await getWorkspacePageDataByUri(uri);

  if (page && page.owner !== user.id) return <NotFound />;

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
