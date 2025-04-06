import { Bell, HelpCircle, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardHeadingNotificationBell = ({
  loadingNotifications,
  unreadCount,
}) => {
  const router = useRouter();
  return (
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
  );
};

export default DashboardHeadingNotificationBell;
