"use client";
import {
  BellDot,
  ChevronDown,
  HelpCircle,
  KeyIcon,
  LoaderIcon,
  UserCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToggleDarkmode from "../../common/button/toggle-darkmode";

const DashboardHeading = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between px-2 text-white transition-shadow duration-150 sm:pr-8 ${
        isScrolled ? "bg-main-gradient-2" : "bg-transparent"
      }`}
    >
      <div className="mr-16 flex items-center justify-center gap-4 text-sm">
        <span>
          <BellDot className="mt-2 h-7 w-7" />
          {/* <Bell className="mt-1 h-7 w-7" /> */}
        </span>
        <span>
          <HelpCircle className="mt-2 h-7 w-7" />
        </span>
      </div>

      <div className="ml-2 flex items-center justify-center gap-4 text-sm">
        <span className="flex cursor-pointer items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center justify-center gap-2">
                <ChevronDown className="flex h-6 w-6" />
                {user ? user.name : <LoaderIcon className="animate-spin" />}
                <UserCircleIcon className="flex h-6 w-6" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="flex items-center justify-center">
                <div className="">پروفایل</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircleIcon className="mt-1 h-5 w-5" />
                <div className="w-40 p-2">پروفایل</div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCircleIcon className="mt-1 h-5 w-5" />
                <div className="w-40 p-2">حالت تاریک</div>
                <ToggleDarkmode />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <KeyIcon className="mt-1 h-5 w-5" />
                <div className="w-40 p-2">خروج</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
    </div>
  );
};

export default DashboardHeading;
