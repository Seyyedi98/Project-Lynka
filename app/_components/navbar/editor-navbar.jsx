import { Button } from "@/components/ui/button";
import React from "react";

const EditorNavbar = () => {
  return (
    <nav className="transition-translate group fixed top-0 z-10 h-[70px] w-full overflow-hidden bg-gradient-to-b from-primary-gradient_from to-primary-gradient_to px-5 duration-200">
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center justify-center gap-1">
          <Button>Save</Button>
          <Button className="hidden md:block">Preview</Button>
        </div>
        <span>uri</span>
        <div>back</div>
      </div>
    </nav>
  );
};

export default EditorNavbar;
