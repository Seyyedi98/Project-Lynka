import { Loader2 } from "lucide-react";
import React from "react";

const NormalSpinner = () => {
  return (
    <div className="animate-spin text-white">
      <Loader2 />
    </div>
  );
};

export default NormalSpinner;
