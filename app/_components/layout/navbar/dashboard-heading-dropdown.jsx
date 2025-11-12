import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  HeadsetIcon,
  LoaderIcon,
  LogOut,
  MailIcon,
  Moon,
  Sun,
  UserCircleIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { LogoutButton } from "../../auth/logout-button";
import ToggleDarkmode from "../../common/button/PrimaryButton/toggle-darkmode";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { IconMoneybag } from "@tabler/icons-react";

const DashboardHeadingDropdown = () => {
  const user = useCurrentUser();
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
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
              <div
                className={`mr-2 flex h-8 w-8 items-center justify-center rounded-full ${
                  isDark ? "bg-white/20" : "bg-white/20"
                }`}
              >
                <UserCircleIcon className="h-5 w-5" />
              </div>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={`ml-2 min-w-[220px] rounded-xl border p-2 backdrop-blur-xl ${
            isDark
              ? "border-white/20 bg-slate-900/90 text-white"
              : "bg-white/95 text-gray-800"
          }`}
        >
          <DropdownMenuLabel
            className={`px-2 py-1.5 text-xs font-medium ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            حساب کاربری
          </DropdownMenuLabel>

          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <DropdownMenuItem
              className={`w-full cursor-pointer rounded-lg px-2 py-2 text-sm ${
                isDark
                  ? "hover:bg-white/10 focus:bg-white/10"
                  : "hover:bg-gray-100 focus:bg-gray-100"
              }`}
            >
              <UserCircleIcon className="mr-2 mt-1 h-4 w-4" />
              <span>پروفایل</span>
            </DropdownMenuItem>
          </Link>

          <Link
            href="/dashboard/transactions"
            className="flex items-center gap-2"
          >
            <DropdownMenuItem
              className={`w-full cursor-pointer rounded-lg px-2 py-2 text-sm ${
                isDark
                  ? "hover:bg-white/10 focus:bg-white/10"
                  : "hover:bg-gray-100 focus:bg-gray-100"
              }`}
            >
              <IconMoneybag className="mr-2 mt-1 h-4 w-4" />
              <span>تراکنش ها</span>
            </DropdownMenuItem>
          </Link>

          <Link
            href="/dashboard/notifications"
            className="flex items-center gap-2"
          >
            <DropdownMenuItem
              className={`w-full cursor-pointer rounded-lg px-2 py-2 text-sm ${
                isDark
                  ? "hover:bg-white/10 focus:bg-white/10"
                  : "hover:bg-gray-100 focus:bg-gray-100"
              }`}
            >
              <MailIcon className="mr-2 mt-1 h-4 w-4" />
              <span>پیام ها</span>
            </DropdownMenuItem>
          </Link>

          <Link
            href="/dashboard/contact-us"
            className="flex items-center gap-2"
          >
            <DropdownMenuItem
              className={`w-full cursor-pointer rounded-lg px-2 py-2 text-sm ${
                isDark
                  ? "hover:bg-white/10 focus:bg-white/10"
                  : "hover:bg-gray-100 focus:bg-gray-100"
              }`}
            >
              <HeadsetIcon className="mr-2 mt-1 h-4 w-4" />
              <span>پشتیبانی</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator
            className={`mx-2 my-1 ${isDark ? "bg-white/20" : "bg-gray-200"}`}
          />

          <div className="px-2 py-1.5">
            <div
              className={`flex items-center justify-between rounded-lg px-2 py-2 text-sm ${
                isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                {isDark ? (
                  <Moon className="mr-2 h-4 w-4" />
                ) : (
                  <Sun className="mr-2 h-4 w-4" />
                )}
                <span>حالت تاریک</span>
              </div>
              <ToggleDarkmode />
            </div>
          </div>

          <DropdownMenuSeparator
            className={`mx-2 my-1 ${isDark ? "bg-white/20" : "bg-gray-200"}`}
          />

          <DropdownMenuItem
            className={`cursor-pointer rounded-lg px-2 py-2 text-sm ${
              isDark
                ? "text-red-400 hover:bg-red-500/20 focus:bg-red-500/20"
                : "text-red-600 hover:bg-red-50 focus:bg-red-50"
            }`}
          >
            <LogoutButton asChild>
              <div className="flex items-center">
                <LogOut className="mr-2 mt-1 h-4 w-4" />
                <span>خروج</span>
              </div>
            </LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardHeadingDropdown;
