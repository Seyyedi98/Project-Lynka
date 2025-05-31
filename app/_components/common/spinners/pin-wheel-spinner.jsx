import { LoaderPinwheel } from "lucide-react";
import React from "react";

const PinWheelSpinner = () => {
  return (
    <div className="animate-spin text-white">
      <LoaderPinwheel />
    </div>
  );
};

export default PinWheelSpinner;
