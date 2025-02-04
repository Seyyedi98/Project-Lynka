import DashboardSidebar from "@/app/_components/layout/navbar/dashboard-sidebar";

const EditorLayout = ({ children }) => {
  return (
    <div className="h-full w-full bg-white">
      <DashboardSidebar />

      {children}
    </div>
  );
};

export default EditorLayout;
