import DashboardSidebar from "@/app/_components/navbar/dashboard-sidebar";
import React from "react";

const EditorLayout = ({ children }) => {
  return (
    <div>
      <div />
      <DashboardSidebar />
      {children}
    </div>
  );
};

export default EditorLayout;
