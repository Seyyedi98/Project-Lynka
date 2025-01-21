import { getUserPageDataByUri } from "@/actions/page";
import ThemeSelector from "@/app/_components/editor/theme-selector";
import { redirect } from "next/navigation";

const SelectThemePage = async ({ params }) => {
  const { uri } = await params;
  const page = await getUserPageDataByUri(uri);
  if (page.theme) redirect(`/workspace/${uri}`);

  return (
    <div className="bg-card">
      <ThemeSelector uri={uri} />;
    </div>
  );
};

export default SelectThemePage;
