import NavItem from "@/app/_components/admin/adminNavItem";
import { currentUser } from "@/lib/auth/get-user";
import { ReplyIcon } from "lucide-react";
import {
  FaBlog,
  FaChartLine,
  FaEnvelope,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";
import { MdDashboard, MdSettings } from "react-icons/md";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#008080] font-sans text-gray-800">
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 z-20 w-[60px] flex-col border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000] md:flex md:w-64">
        {/* <div className="fixed inset-y-0 right-0 z-20 hidden w-64 flex-col border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000] md:flex"> */}
        <div className="flex h-16 items-center justify-center border-b-2 border-[#808080] bg-[#000080]">
          <div className="flex items-center space-x-2 space-x-reverse">
            <IoMdRocket className="text-2xl text-white" />
            <h1 className="hidden text-xl font-bold text-white md:block">
              پنل مدیریت
            </h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <nav className="space-y-1">
            <NavItem target="controll-center" icon={<MdDashboard />} active>
              Dashboard
            </NavItem>
            <NavItem target="manageUsers" icon={<FaUsers />}>
              Users
            </NavItem>
            <NavItem target="adminMessage" icon={<FaEnvelope />}>
              Messages
            </NavItem>
            <NavItem target="reports" icon={<ReplyIcon />}>
              Reports
            </NavItem>
            <NavItem target="blogManagement" icon={<FaBlog />}>
              Blog
            </NavItem>
            <NavItem target="adminAnalytics" icon={<FaChartLine />}>
              آمارها
            </NavItem>
            <NavItem target="adminSettings" icon={<MdSettings />}>
              تنظیمات
            </NavItem>
          </nav>
        </div>

        <div className="border-t-2 border-[#808080] bg-[#c0c0c0] p-3">
          <div className="flex flex-col items-center space-x-3 space-x-reverse md:flex-row">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#000080] text-white">
              M
            </div>
            <div>
              {/* <p className="font-medium">{user.name}</p> */}
              <p className="hidden text-xs text-gray-600 md:block">
                مدیر سیستم
              </p>
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default layout;
