import { getWorkspacePageDataByUri } from "@/actions/page/page";
import ConnectionLost from "@/app/_components/section/connection-lost";
import PageBuilder from "@/app/_components/workspace/page-builder";
import NotFound from "@/app/not-found";
import { currentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

const EditorPage = async ({ params }) => {
  const { uri } = await params;

  try {
    const [user, page] = await Promise.all([
      currentUser(),
      getWorkspacePageDataByUri(uri).catch(() => null),
    ]);

    if (!page) {
      return (
        <div className="grid h-screen w-screen place-content-center">
          <ConnectionLost />
        </div>
      );
    }

    if (page && page.owner !== user?.id) return <NotFound />;

    if (!page.theme) {
      redirect(`${uri}/theme`);
    }

    return <PageBuilder page={page} />;
  } catch (error) {
    console.error("Error in EditorPage:", error);
    return (
      <div className="p-4 text-center">
        <h2>خطایی رخ داده</h2>
        <p>لطفا مجددا سعی کنید</p>
      </div>
    );
  }
};

export default EditorPage;
