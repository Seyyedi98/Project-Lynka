"use client";
import {
  BellDot,
  ChevronDown,
  HelpCircle,
  LoaderIcon,
  UserCircleIcon,
  Settings,
  LogOut,
  Moon,
  Sun,
  Bell,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import ToggleDarkmode from "../../common/button/PrimaryButton/toggle-darkmode";
import { getNotifications } from "@/actions/notifications";

const DashboardHeading = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const user = useCurrentUser();
  const { theme } = useTheme();
  const router = useRouter();

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Fetch notifications using server action
  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const { notifications: fetchedNotifications } = await getNotifications(
        user?.id,
      );
      setNotifications(fetchedNotifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();

      // Set up interval for periodic updates
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    }
  }, [user?.id]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between px-2 text-white transition-all duration-150 sm:pr-8 ${
        isScrolled ? "bg-main-gradient-2 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mr-16 flex items-center justify-center text-sm">
        <button
          onClick={() => router.push("/dashboard/notifications")}
          className="relative rounded-full p-2 transition-colors hover:bg-white/10"
          disabled={loadingNotifications}
        >
          {loadingNotifications ? (
            <LoaderIcon className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </button>
        <button className="rounded-full p-2 transition-colors hover:bg-white/10">
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>

      <div className="ml-2 flex items-center justify-center gap-4 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-white/10">
              <div className="flex items-center">
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                <span className="text-sm font-medium">
                  {user ? (
                    user.name
                  ) : (
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                  )}
                </span>
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <UserCircleIcon className="h-5 w-5" />
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[220px] rounded-xl bg-white/95 p-2 backdrop-blur-lg dark:bg-gray-800/95 dark:text-white"
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
              حساب کاربری
            </DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2 text-sm focus:bg-gray-100 dark:focus:bg-gray-700">
              <UserCircleIcon className="mr-2 h-4 w-4" />
              <span>پروفایل</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2 text-sm focus:bg-gray-100 dark:focus:bg-gray-700">
              <Settings className="mr-2 h-4 w-4" />
              <span>تنظیمات</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="mx-2 my-1 bg-gray-200 dark:bg-gray-700" />

            <div className="px-2 py-1.5">
              <div className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  {theme === "dark" ? (
                    <Moon className="mr-2 h-4 w-4" />
                  ) : (
                    <Sun className="mr-2 h-4 w-4" />
                  )}
                  <span>حالت تاریک</span>
                </div>
                <ToggleDarkmode />
              </div>
            </div>

            <DropdownMenuSeparator className="mx-2 my-1 bg-gray-200 dark:bg-gray-700" />

            <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2 text-sm text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:bg-red-900/30">
              <LogOut className="mr-2 h-4 w-4" />
              <span>خروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeading;
