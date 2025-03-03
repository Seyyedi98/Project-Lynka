import { getWorkspacePageDataByUri } from "@/actions/page/page";
import InitialThemeSelector from "@/app/_components/workspace/initial-theme-selector";
import NotFound from "@/app/not-found";
import { currentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

const SelectThemePage = async ({ params }) => {
  const { uri } = await params;
  const page = await getWorkspacePageDataByUri(uri);
  const user = await currentUser();

  if (page.error === "Unauthorized access") redirect(`/dashboard`);
  if (page && page.owner !== user.id) return <NotFound />;
  if (page.theme) redirect(`/workspace/${uri}`);

  return (
    <div className="bg-card">
      <InitialThemeSelector uri={uri} />;
    </div>
  );
};

export default SelectThemePage;
