"use client";
import { IconNotification } from "@tabler/icons-react";
import {
  Bell,
  BellDot,
  ChevronDown,
  HelpCircle,
  UserCircleIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const DashboardHeading = ({
  children,
  subscriptionPlan,
  subscriptionDaysLeft,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <span>
            <ChevronDown className="h-5 w-5" />
          </span>
          Welcome
        </span>
        <span>
          <UserCircleIcon className="h-8 w-8" />
        </span>
      </div>
    </div>
  );
};

export default DashboardHeading;
