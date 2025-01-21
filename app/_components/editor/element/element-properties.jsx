import { TrashIcon } from "lucide-react";
import DeleteElementBtn from "../../common/button/delete-element-button";
import { PageElements } from "../../controller/page-elements";
import useEditor from "@/hooks/useEditor";

const ElementProperties = ({ element }) => {
  const { selectedElement } = useEditor();
  const PropertiesForm =
    PageElements[selectedElement?.type]?.PropertiesComponent;

  return (
    <div className="relative">
      <DeleteElementBtn id={element?.id}>
        <div className="absolute -top-20 left-2 flex cursor-pointer items-center justify-center rounded-full bg-red-500 p-2 duration-200 hover:bg-red-600">
          <TrashIcon className="h-4 w-4 text-white" />
        </div>
      </DeleteElementBtn>

      {selectedElement && <PropertiesForm elementInstance={selectedElement} />}
    </div>
  );
};

export default ElementProperties;
