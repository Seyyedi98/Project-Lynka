"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllRead,
  markRead,
} from "@/actions/notifications";
import NotificationList from "../../../_components/section/dashboard/notifications/NotificationList";
import NotificationDetail from "../../../_components/section/dashboard/notifications/NotificationDetail";

export default function NotificationsPage() {
  const { data: session } = useSession();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        const { notifications: loadedNotifications, nextCursor: newCursor } =
          await getNotifications(session.user.id);
        setNotifications(loadedNotifications);
        setNextCursor(newCursor);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, [session]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markRead(notificationId);
      setNotifications(
        notifications.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n,
        ),
      );
      if (selectedNotification?.id === notificationId) {
        setSelectedNotification({ ...selectedNotification, isRead: true });
      }
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (isMarkingAll) return;
    setIsMarkingAll(true);
    try {
      await markAllRead(session.user.id);
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
      if (selectedNotification) {
        setSelectedNotification({ ...selectedNotification, isRead: true });
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    } finally {
      setIsMarkingAll(false);
    }
  };

  const loadMoreNotifications = async () => {
    if (!nextCursor || isLoading) return;

    setIsLoading(true);
    try {
      const { notifications: newNotifications, nextCursor: newCursor } =
        await getNotifications(session.user.id, { cursor: nextCursor });
      setNotifications([...notifications, ...newNotifications]);
      setNextCursor(newCursor);
    } catch (error) {
      console.error("Failed to load more notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    if (window.innerWidth < 1024) {
      setIsMobileDetailOpen(true);
    }
  };

  const handleCloseMobileDetail = () => {
    setIsMobileDetailOpen(false);
  };

  return (
    <div className="pt-72 sm:mr-16">
      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        <div className="flex flex-col gap-6 rounded-xl border border-muted bg-card p-6 shadow-sm lg:flex-row">
          <NotificationList
            notifications={notifications}
            unreadCount={notifications.filter((n) => !n.isRead).length}
            isLoading={isLoading}
            nextCursor={nextCursor}
            isMarkingAll={isMarkingAll}
            onMarkAllAsRead={handleMarkAllAsRead}
            onLoadMore={loadMoreNotifications}
            onNotificationClick={handleNotificationClick}
          />
          <NotificationDetail
            selectedNotification={selectedNotification}
            isMobileDetailOpen={isMobileDetailOpen}
            onCloseMobileDetail={handleCloseMobileDetail}
          />
        </div>
      </div>
    </div>
  );
}
