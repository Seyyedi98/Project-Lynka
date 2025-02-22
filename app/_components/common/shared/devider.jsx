import React from "react";

const Divider = ({ className }) => {
  return (
    <div
      className={`mx-auto w-full border-b-0 border-t-[1px] border-primary/30 ${className}`}
    />
  );
};

export default Divider;
