import { currentUser } from "@/lib/auth/get-user";
import { notFound } from "next/navigation";
import {
  FaBlog,
  FaChartLine,
  FaCog,
  FaEnvelope,
  FaSearch,
  FaSpaceShuttle,
  FaUsers,
} from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";

const ControlCenter = async () => {
  const user = await currentUser();

  if (!user || user.id !== process.env.ADMIN_ID || user.role !== "ADMIN") {
    return notFound();
  }

  return (
    <div className="font-yekan min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 flex w-64 flex-col border-l border-primary/20 bg-secondaryBg p-4">
        <div className="mb-10 flex items-center space-x-3 space-x-reverse rounded-lg bg-gradient-to-l from-primary to-secondary p-2">
          <IoMdRocket className="text-2xl" />
          <h1 className="text-xl font-bold">پنل مدیریت</h1>
        </div>

        <nav className="flex-1 space-y-2 space-y-reverse">
          <NavItem icon={<FaSpaceShuttle />} active>
            داشبورد
          </NavItem>
          <NavItem icon={<FaEnvelope />}>ارسال ایمیل</NavItem>
          <NavItem icon={<FaUsers />}>مدیریت کاربران</NavItem>
          <NavItem icon={<FaSearch />}>جستجو</NavItem>
          <NavItem icon={<FaBlog />}>مدیریت وبلاگ</NavItem>
          <NavItem icon={<FaChartLine />}>آمار و تحلیل</NavItem>
          <NavItem icon={<FaCog />}>تنظیمات</NavItem>
        </nav>

        <div className="mt-auto flex items-center space-x-3 space-x-reverse rounded-lg bg-accent/10 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">مدیر سیستم</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 pl-8 pr-64">
        <header className="mb-8 text-right">
          <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent">
            پنل مدیریت پیشرفته
          </h1>
          <p className="text-muted-foreground">خوش آمدید، مدیر محترم</p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Email Section */}
          <DashboardCard
            title="ارسال پیام"
            icon={<FaEnvelope className="text-primary" />}
            className="border-t-4 border-primary"
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="عنوان پیام"
                className="w-full rounded border border-border bg-card px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="متن پیام..."
                rows={4}
                className="w-full rounded border border-border bg-card px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <button className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-all duration-300 hover:bg-primary-hover">
                ارسال پیام
              </button>
            </div>
          </DashboardCard>

          {/* User Management */}
          <DashboardCard
            title="لیست کاربران"
            icon={<FaUsers className="text-secondary" />}
            className="border-t-4 border-secondary"
          >
            <div className="h-64 space-y-3 overflow-y-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-accent/10 p-2"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20">
                      <span className="text-xs">U{i}</span>
                    </div>
                    <span>کاربر شماره {i}</span>
                  </div>
                  <button className="rounded bg-accent px-2 py-1 text-xs hover:bg-accent/50">
                    مدیریت
                  </button>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Blog Management */}
          <DashboardCard
            title="مدیریت وبلاگ"
            icon={<FaBlog className="text-accent" />}
            className="border-t-4 border-accent"
          >
            <div className="space-y-4">
              <div className="flex space-x-2 space-x-reverse">
                <button className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary-hover">
                  مقاله جدید
                </button>
                <button className="flex-1 rounded-lg bg-card px-3 py-2 text-sm hover:bg-accent/10">
                  مدیریت مقالات
                </button>
              </div>
              <div className="rounded-lg bg-card p-3">
                <h3 className="mb-2 text-right font-medium">آخرین مقالات</h3>
                <ul className="space-y-2 text-right text-sm">
                  <li className="flex items-center justify-between">
                    <span>عنوان مقاله ۱</span>
                    <span className="text-muted-foreground">۲ روز پیش</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>عنوان مقاله ۲</span>
                    <span className="text-muted-foreground">۵ روز پیش</span>
                  </li>
                </ul>
              </div>
            </div>
          </DashboardCard>

          {/* Analytics */}
          <DashboardCard
            title="آمار و تحلیل"
            icon={<FaChartLine className="text-green-500" />}
            className="border-t-4 border-green-500"
          >
            <div className="flex h-64 items-center justify-center rounded-lg bg-card">
              <div className="text-center">
                <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
                  ۸۴.۲٪
                </div>
                <p className="text-muted-foreground">نرخ تعامل</p>
              </div>
            </div>
          </DashboardCard>

          {/* Search */}
          <DashboardCard
            title="جستجوی پیشرفته"
            icon={<FaSearch className="text-yellow-500" />}
            className="border-t-4 border-yellow-500"
          >
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="w-full rounded-lg border border-border bg-card px-4 py-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <FaSearch className="absolute left-3 top-3.5 text-muted-foreground" />
              </div>
              <div className="rounded-lg bg-card p-3">
                <h3 className="mb-2 text-right font-medium">فیلترهای جستجو</h3>
                <div className="grid grid-cols-2 gap-2 text-right text-sm">
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="accent-primary" />
                    <span>کاربران</span>
                  </label>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="accent-primary" />
                    <span>مقالات</span>
                  </label>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="accent-primary" />
                    <span>نظرات</span>
                  </label>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="accent-primary" />
                    <span>فعالیت‌ها</span>
                  </label>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

// Component for sidebar navigation items
const NavItem = ({ children, icon, active = false }) => (
  <button
    className={`flex w-full items-center space-x-3 space-x-reverse rounded-lg p-3 transition-all ${active ? "bg-primary/20 text-primary" : "hover:bg-accent/10"}`}
  >
    <span className="text-lg">{icon}</span>
    <span>{children}</span>
  </button>
);

// Component for dashboard cards
const DashboardCard = ({ children, title, icon, className = "" }) => (
  <div className={`rounded-lg bg-card p-5 shadow-lg ${className}`}>
    <div className="mb-4 flex items-center justify-between">
      <h2 className="flex items-center space-x-2 space-x-reverse text-xl font-medium">
        {icon}
        <span>{title}</span>
      </h2>
      <button className="rounded bg-accent px-2 py-1 text-xs hover:bg-accent/50">
        بیشتر
      </button>
    </div>
    {children}
  </div>
);

export default ControlCenter;
