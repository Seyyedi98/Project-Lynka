import React from "react";
import Navbar from "../_components/navbar/Navbar";
import DashboardSidebar from "../_components/navbar/dashboard-sidebar";

const ProtectedLayout = ({ children }) => {
  return (
    // <div className="h-dvh w-full flex flex-col gap-y-10 items-center justify-center ">
    <div className="h-full w-full overflow-y-hidden">
      <DashboardSidebar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
