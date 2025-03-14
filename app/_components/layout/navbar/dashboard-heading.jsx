"use client";
import {
  BellDot,
  HelpCircle,
  KeyIcon,
  LoaderIcon,
  UserCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogoutButton } from "../../auth/logout-button";

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
      className={`fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between px-2 text-white transition-shadow duration-150 ${
        isScrolled ? "bg-main-gradient-2" : "bg-transparent"
      }`}
    >
      <div className="mr-16 flex items-center justify-center gap-4 text-sm xl:mr-60">
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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-white">
                  {user ? user.name : <LoaderIcon className="animate-spin" />}
                </NavigationMenuTrigger>
                <NavigationMenuContent dir="rtl">
                  <NavigationMenuLink className="flex items-center gap-1 px-2 hover:text-primary">
                    <UserCircleIcon className="h-5 w-5" />
                    <div className="w-40 p-2">پروفایل</div>
                  </NavigationMenuLink>
                  <LogoutButton className="">
                    <NavigationMenuLink className="flex items-center px-2 hover:text-primary">
                      <KeyIcon className="h-5 w-5" />
                      <div className="w-40 p-2">خروج</div>
                    </NavigationMenuLink>
                  </LogoutButton>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </span>
      </div>
    </div>
  );
};

export default DashboardHeading;
