import { Separator } from "@/components/ui/separator";
import React from "react";
import ElementAdderButton from "./element-adder-button";
import { PageElements } from "./page-elements";

const EditorSidebarElements = () => {
  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 place-items-center gap-y-4">
        <p className="my-2 mt-4 place-self-start text-sm text-muted-foreground">
          فیلد ها
        </p>
        <ElementAdderButton pageElement={PageElements.TitleField} />
      </div>
    </div>
  );
};

export default EditorSidebarElements;
