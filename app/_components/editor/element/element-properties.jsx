import { Button } from "@/components/ui/button";
import useEditor from "@/hooks/useEditor";
import { TrashIcon } from "lucide-react";
import DeleteElementBtn from "../../common/button/delete-element-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../common/modal/diolog";
import { PageElements } from "../../controller/page-elements";
import useModal from "@/hooks/useModal";
import ElementThemeSelector from "../../theme/element-theme-selector";

const ElementProperties = ({ element }) => {
  const { updateElement } = useEditor();
  const { closeMenu } = useModal();
  const PropertiesForm = PageElements[element?.type]?.PropertiesComponent;

  return (
    <div className="relative">
      <DeleteElementBtn id={element?.id}>
        <div className="absolute -top-20 left-2 flex cursor-pointer items-center justify-center rounded-full bg-red-500 p-2 duration-200 hover:bg-red-600">
          <TrashIcon className="h-4 w-4 text-white" />
        </div>
      </DeleteElementBtn>

      {element && <PropertiesForm elementInstance={element} />}

      <Dialog>
        <DialogTrigger>تغییر تم</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تم مورد نظر خود را انتخاب کنید</DialogTitle>
            <DialogDescription>
              تم مورد نظر خود را انتخاب کنید
            </DialogDescription>

            <ElementThemeSelector elementInstance={element} />
            {/* <Button
              onClick={() => {
                updateElement(element.id, {
                  ...element,
                  extraAttributes: {
                    ...element.extraAttributes,
                    theme: "sunny",
                  },
                });
                closeMenu();
              }}
            >
              Sunny
            </Button>
            <Button
              onClick={() => {
                updateElement(element.id, {
                  ...element,
                  extraAttributes: {
                    ...element.extraAttributes,
                    theme: "nature",
                  },
                });
                closeMenu();
              }}
            >
              Nature
            </Button> */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ElementProperties;
