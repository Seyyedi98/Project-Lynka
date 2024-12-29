import DashboardNavbar from "@/app/_components/navbar/dashboard-navbar";
import DashboardSidebar from "@/app/_components/navbar/dashboard-sidebar";
import { auth } from "@/auth";
import Link from "next/link";

const page = async () => {
  const session = await auth();

  return (
    <main className="">
      <DashboardSidebar />
      <section className="flex sm:mr-20 flex-col gap-4 px-4 ">
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
      </section>
    </main>
  );
};

export default page;
