import AddElementButton from "./add-element-button";
import { PageElements } from "../../controller/page-elements";
import { motion } from "motion/react";
import { fadeSlideLeft } from "@/utils/animation/animation";

const EditorSidebarElements = () => {
  return (
    <div
      className="w-full" // Ensure this is the root element
    >
      <p className="mb-6 place-self-center text-sm text-muted-foreground md:place-self-start md:p-4 md:text-white">
        فیلد ها
      </p>
      <div className="mx-2 grid max-h-[70dvh] grid-cols-1 place-items-center gap-y-4">
        <AddElementButton pageElement={PageElements.TitleField} />
        <AddElementButton pageElement={PageElements.ButtonField} />
      </div>
    </div>
  );
};

export default EditorSidebarElements;
