import { Check, TrashIcon } from "lucide-react";
import DeleteElementBtn from "../../common/button/delete-element-button";

const ElementProperties = ({ element }) => {
  return (
    <div>
      <DeleteElementBtn id={element?.id}>
        <div className="absolute left-3 top-3 flex cursor-pointer items-center justify-center rounded-full bg-red-500 p-2 duration-200 hover:bg-red-600">
          <TrashIcon className="h-4 w-4 text-white" />
        </div>
      </DeleteElementBtn>

      <div className="absolute right-3 top-3 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600">
        <Check className="h-4 w-4 text-white" />
      </div>
      <p>{element?.id}</p>
    </div>
  );
};

export default ElementProperties;
