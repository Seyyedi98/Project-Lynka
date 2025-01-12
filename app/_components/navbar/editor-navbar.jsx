import { Button } from "@/components/ui/button";
import SavePageBtn from "../common/button/PrimaryButton/save-page-button";

const EditorNavbar = ({ uri }) => {
  return (
    <nav className="transition-translate group fixed top-0 z-10 h-[70px] w-full overflow-hidden bg-white px-5 shadow-md duration-200">
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center justify-center gap-1">
          <SavePageBtn uri={uri} />
          <Button className="hidden md:block">Preview</Button>
        </div>
        <span>{uri}</span>
        <div>back</div>
      </div>
    </nav>
  );
};

export default EditorNavbar;
