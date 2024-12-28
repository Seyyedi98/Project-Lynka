import DashboardNavbar from "@/app/_components/navbar/dashboard-navbar";
import DashboardSidebar from "@/app/_components/navbar/dashboard-sidebar";
import { auth } from "@/auth";
import Link from "next/link";

const page = async () => {
  const session = await auth();

  return (
    <main className="">
      <div>
        <DashboardNavbar />
      </div>
      <DashboardSidebar />
    </main>
  );
};

export default page;
