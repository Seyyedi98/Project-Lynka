import AddElementButton from "./add-element-button";
import { PageElements } from "../../controller/page-elements";

const EditorSidebarElements = () => {
  return (
    <div className="w-full">
      <p className="mb-6 place-self-center text-sm text-muted-foreground md:place-self-start">
        فیلد ها
      </p>
      <div className="mx-2 grid max-h-[70dvh] grid-cols-1 place-items-start gap-y-4">
        <AddElementButton pageElement={PageElements.TitleField} />
        <AddElementButton pageElement={PageElements.ButtonField} />
      </div>
    </div>
  );
};

export default EditorSidebarElements;
