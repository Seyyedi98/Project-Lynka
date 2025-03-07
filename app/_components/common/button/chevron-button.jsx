import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const ChevronButton = ({ direction }) => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full">
      {direction === "right" && (
        <ChevronRight className="h-8 w-8 cursor-pointer text-white" />
      )}
      {direction === "left" && (
        <ChevronLeft className="h-8 w-8 cursor-pointer text-white" />
      )}
    </div>
  );
};

export default ChevronButton;
