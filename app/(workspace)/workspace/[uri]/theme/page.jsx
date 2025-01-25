import { getUserPageDataByUri } from "@/actions/page";
import InitialThemeSelector from "@/app/_components/editor/initial-theme-selector";
import { redirect } from "next/navigation";

const SelectThemePage = async ({ params }) => {
  const { uri } = await params;
  const page = await getUserPageDataByUri(uri);
  if (page.theme) redirect(`/workspace/${uri}`);

  return (
    <div className="bg-card">
      <InitialThemeSelector uri={uri} />;
    </div>
  );
};

export default SelectThemePage;
