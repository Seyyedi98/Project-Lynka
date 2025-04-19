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
  Settings,
  Sun,
  UserCircleIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import ToggleDarkmode from "../../common/button/PrimaryButton/toggle-darkmode";
import { LogoutButton } from "../../auth/logout-button";
import Link from "next/link";

const DashboardHeadingDropdown = ({ user }) => {
  const { theme } = useTheme();
  const w = useRouter();

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

          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <DropdownMenuItem className="w-full cursor-pointer rounded-lg px-2 py-2 text-sm focus:bg-gray-100 dark:focus:bg-gray-700">
              <UserCircleIcon className="mr-2 mt-1 h-4 w-4" />
              <span>پروفایل</span>
            </DropdownMenuItem>
          </Link>

          <Link
            href="/dashboard/notifications"
            className="flex items-center gap-2"
          >
            <DropdownMenuItem className="w-full cursor-pointer rounded-lg px-2 py-2 text-sm focus:bg-gray-100 dark:focus:bg-gray-700">
              <MailIcon className="mr-2 mt-1 h-4 w-4" />
              <span>پیام ها</span>
            </DropdownMenuItem>
          </Link>

          <Link
            href="/dashboard/contact-us"
            className="flex items-center gap-2"
          >
            <DropdownMenuItem className="w-full cursor-pointer rounded-lg px-2 py-2 text-sm focus:bg-gray-100 dark:focus:bg-gray-700">
              <HeadsetIcon className="mr-2 mt-1 h-4 w-4" />
              <span>پشتیبانی</span>
            </DropdownMenuItem>
          </Link>

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
