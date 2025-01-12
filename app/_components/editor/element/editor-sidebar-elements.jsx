import AddElementButton from "./add-element-button";
import { PageElements } from "./page-elements";

const EditorSidebarElements = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 place-items-center gap-y-4">
        <p className="my-2 mt-4 place-self-start text-sm text-white">فیلد ها</p>

        <AddElementButton pageElement={PageElements.TitleField} />
      </div>
    </div>
  );
};

export default EditorSidebarElements;
