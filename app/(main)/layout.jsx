import DashboardSidebar from "../_components/navbar/dashboard-sidebar";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="h-dvh w-full bg-neutral-50">
      <DashboardSidebar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
