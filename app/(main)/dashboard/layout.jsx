import DashboardSidebar from "@/app/_components/navbar/dashboard-sidebar";
import React from "react";

const EditorLayout = ({ children }) => {
  return (
    <div>
      <div className="h-12 w-full" />
      <DashboardSidebar />
      {children}
    </div>
  );
};

export default EditorLayout;
