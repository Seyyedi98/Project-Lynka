"use client";
import { getNotifications } from "@/actions/notifications";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardHeadingDropdown from "./dashboard-heading-dropdown";
import DashboardHeadingNotificationBell from "./dashboard-heading-norification-bell";

const DashboardHeading = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const user = useCurrentUser();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
      className={`fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between px-2 text-white transition-all duration-150 sm:pr-4 ${
        isScrolled
          ? "bg-gradient-to-r from-[hsl(207,90%,54%)] to-[hsl(172,100%,37%)] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mr-16 flex items-center justify-center text-sm">
        <DashboardHeadingNotificationBell
          loadingNotifications={loadingNotifications}
          unreadCount={unreadCount}
        />
        <button className="rounded-full p-2 transition-colors hover:bg-white/10">
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>

      <DashboardHeadingDropdown user={user} />
    </div>
  );
};

export default DashboardHeading;
