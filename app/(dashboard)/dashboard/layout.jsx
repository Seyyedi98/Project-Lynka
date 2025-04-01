/* eslint-disable @next/next/no-img-element */
import DashboardHeading from "@/app/_components/layout/navbar/dashboard-heading";
import DashboardSidebar from "@/app/_components/layout/navbar/dashboard-sidebar";
const bgMaskLight = "/bg-dashboard-mask.svg";
const bgMaskDark = "/bg-dashboard-mask-dark.svg";

const EditorLayout = async ({ children }) => {
  return (
    <>
      <DashboardSidebar />
      {/* Light */}
      <img
        className="fixed mt-80 w-full translate-y-1/2 dark:hidden sm:mt-64 lg:translate-y-0"
        src={bgMaskLight}
        alt="bgmask"
      />

      {/* Dark */}
      <img
        className="fixed mt-80 hidden w-full translate-y-1/2 dark:block sm:mt-64 lg:translate-y-0"
        src={bgMaskDark}
        alt="bgmask"
      />
      <main className="relative h-svh w-full">
        {/* Background */}
        <div className="fixed left-0 top-0 z-[-1] h-[400px] w-full bg-main-gradient-2"></div>
        <DashboardHeading />
        {children}
      </main>
    </>
  );
};

export default EditorLayout;
