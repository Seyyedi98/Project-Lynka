import { getPageDataByUri } from "@/actions/page";
import InitialThemeSelector from "@/app/_components/editor/initial-theme-selector";
import { redirect } from "next/navigation";

const SelectThemePage = async ({ params }) => {
  const { uri } = await params;
  const page = await getPageDataByUri(uri);
  if (page.theme) redirect(`/workspace/${uri}`);

  return (
    <div className="bg-card">
      <InitialThemeSelector uri={uri} />;
    </div>
  );
};

export default SelectThemePage;
