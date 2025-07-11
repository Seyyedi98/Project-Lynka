import QuickAction from "@/app/_components/admin/adminQuickAction";
import StatCard from "@/app/_components/admin/adminStatCard";
import { currentUser } from "@/lib/auth/get-user";
import { notFound } from "next/navigation";
import {
  FaBlog,
  FaChartLine,
  FaEnvelope,
  FaMoneyBill,
  FaUsers,
} from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";

const ControlCenter = async () => {
  const user = await currentUser();

  if (!user || user.id !== process.env.ADMIN_ID || user.role !== "ADMIN") {
    return notFound();
  }

  return (
    <div className="pb-10 pr-16 md:pr-64">
      {/* Window Title Bar */}
      <header className="sticky top-0 z-10 flex h-8 items-center justify-between bg-[#000080] px-2 text-white md:hidden">
        <div className="flex items-center">
          <IoMdRocket className="mr-2" />
          <span>پنل مدیریت</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="flex h-6 w-6 items-center justify-center border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] hover:bg-[#a0a0a0]">
            <span className="text-xs text-black">_</span>
          </button>
          <button className="flex h-6 w-6 items-center justify-center border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] hover:bg-[#a0a0a0]">
            <span className="text-xs text-black">□</span>
          </button>
          <button className="flex h-6 w-6 items-center justify-center border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] hover:bg-[#a0a0a0]">
            <span className="text-xs text-black">×</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="m-2">
        {/* Window Container */}
        <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
          {/* Window Title */}
          <div className="flex h-6 items-center bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
            <span className="text-sm">مدیریت سیستم</span>
          </div>

          {/* Window Content */}
          <div className="p-4">
            <div className="mb-6">
              <h1 className="text-xl font-bold">سلام، {user.name} 👋</h1>
              <p className="text-gray-600">خلاصه فعالیت‌های سیستم</p>
            </div>

            {/* Stats Overview */}
            <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Users"
                value="1,248"
                change="+12%"
                icon={<FaUsers className="text-blue-600" />}
              />
              <StatCard
                title="Messages"
                value="356"
                change="+24%"
                icon={<FaEnvelope className="text-red-600" />}
              />
              <StatCard
                title="Premium Users"
                value="48"
                change="+5%"
                icon={<FaMoneyBill className="text-green-600" />}
              />
              <StatCard
                title="بازدیدها"
                value="12.4K"
                change="+32%"
                icon={<FaChartLine className="text-yellow-600" />}
              />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-white p-4">
                  <h2 className="mb-3 border-b-2 border-[#808080] pb-2 text-lg font-semibold">
                    اقدامات سریع
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    <QuickAction
                      icon={<FaEnvelope className="text-blue-600" />}
                      target="adminMessage"
                      title="Send Message"
                      color="blue"
                    />
                    <QuickAction
                      icon={<FaUsers className="text-red-600" />}
                      target="manageUsers"
                      title="Manage Users"
                      color="red"
                    />
                    <QuickAction
                      icon={<FaBlog className="text-green-600" />}
                      target="blogManagement"
                      title="New Post"
                      color="green"
                    />
                    <QuickAction
                      icon={<FaChartLine className="text-yellow-600" />}
                      target="reports"
                      title="Reports"
                      color="yellow"
                    />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-white p-4 lg:col-span-2">
                <div className="mb-3 flex items-center justify-between border-b-2 border-[#808080] pb-2">
                  <h2 className="text-lg font-semibold">فعالیت‌های اخیر</h2>
                  <button className="text-sm text-blue-600 hover:underline">
                    مشاهده همه
                  </button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex items-start space-x-3 space-x-reverse border-b border-[#808080] pb-2 last:border-0"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-blue-100">
                        <FaUsers className="text-sm text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">کاربر جدید ثبت نام کرد</p>
                        <p className="text-xs text-gray-600">
                          {item} ساعت پیش • کاربر شماره {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Components

const StatusItem = ({ title, status, description }) => (
  <div className="flex items-start space-x-3 space-x-reverse">
    <div
      className={`mt-1 h-3 w-3 rounded-full border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] ${
        status === "active"
          ? "bg-green-500"
          : status === "warning"
            ? "bg-yellow-500"
            : "bg-red-500"
      }`}
    ></div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </div>
);

export default ControlCenter;
