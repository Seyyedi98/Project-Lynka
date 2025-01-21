import React from "react";

const DashboardHeading = ({ children }) => {
  return (
    <div className="flex h-14 items-center justify-between bg-neutral-50 px-2 sm:mr-20 xl:mr-56">
      {children}
    </div>
  );
};

export default DashboardHeading;
