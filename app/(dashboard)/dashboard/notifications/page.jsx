"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllRead,
  markRead,
} from "@/actions/notifications";
import NotificationCard from "@/app/_components/common/card/notification-card";
import { Button } from "@/components/ui/button";
import {
  contentFade,
  desktopDetail,
  fade,
  loadingFade,
  mobileDetail,
  notificationItem,
  staggeredFade,
} from "@/utils/animation/animation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronRight,
  Circle,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
          {/* Right Panel - Notifications List */}
          <div className="w-full lg:w-2/5 xl:w-1/3">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">اعلان‌ها</h1>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-sm font-medium text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </div>
              <Button
                onClick={handleMarkAllAsRead}
                variant="ghost"
                size="sm"
                disabled={isMarkingAll || unreadCount === 0}
                className="text-primary hover:text-primary-hover"
              >
                {isMarkingAll ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "علامت گذاری همه به عنوان خوانده شده"
                )}
              </Button>
            </div>

            <div className="overflow-hidden rounded-lg border border-muted bg-secondaryBg">
              {/* Skeleton */}
              {isLoading ? (
                <div className="space-y-3 p-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      {...loadingFade}
                      transition={{ delay: i * 0.1 }}
                      className="animate-pulse rounded-lg bg-muted p-4"
                    >
                      <div className="mb-2 h-4 w-3/4 rounded bg-accent"></div>
                      <div className="mb-2 h-3 w-full rounded bg-accent"></div>
                      <div className="h-3 w-1/2 rounded bg-accent"></div>
                    </motion.div>
                  ))}
                </div>
              ) : notifications.length === 0 ? (
                // No notifications
                <motion.div
                  {...fade}
                  className="flex flex-col items-center justify-center p-8 text-center"
                >
                  <Bell className="mb-4 h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">شما هیچ پیامی ندارید</p>
                </motion.div>
              ) : (
                // Notifications list
                <motion.div
                  layout
                  className="h-96 divide-y divide-muted overflow-y-auto"
                >
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={`${index}-${notification.id}`}
                      layout
                      {...notificationItem}
                      onClick={() => handleNotificationClick(notification)}
                      className={`cursor-pointer p-4 transition-colors hover:bg-accent/50 ${
                        !notification.isRead
                          ? "bg-primary/10"
                          : "bg-secondaryBg"
                      } ${
                        selectedNotification?.id === notification.id
                          ? "bg-accent"
                          : ""
                      }`}
                    >
                      <NotificationCard notification={notification} />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Load more button */}
              {nextCursor && (
                <motion.div {...fade} className="border-t border-muted p-4">
                  <Button
                    onClick={loadMoreNotifications}
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    بارگیری بیشتر
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Left Panel - Notification Content (Desktop) */}
          <div className="hidden lg:flex lg:flex-1">
            <AnimatePresence mode="wait">
              {selectedNotification ? (
                <motion.div
                  key={selectedNotification.id}
                  {...desktopDetail}
                  className="flex-1 rounded-lg border border-muted bg-secondaryBg p-6"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {selectedNotification.isRead ? (
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Circle className="h-5 w-5 fill-primary/10 text-primary" />
                      )}
                      <h2 className="text-xl font-bold text-foreground">
                        {selectedNotification.title}
                      </h2>
                    </div>
                    <time className="text-sm text-muted-foreground">
                      {new Date(selectedNotification.createdAt).toLocaleString(
                        "fa-IR",
                      )}
                    </time>
                  </div>

                  <motion.div
                    {...contentFade}
                    className="prose prose-sm max-w-none text-foreground"
                  >
                    <p>{selectedNotification.body}</p>
                  </motion.div>

                  {selectedNotification.actionUrl && (
                    <motion.div
                      {...staggeredFade}
                      transition={{ delay: 0.3 }}
                      className="mt-8"
                    >
                      <Button variant="default" asChild>
                        <a
                          href={selectedNotification.actionUrl}
                          className="inline-flex items-center gap-2"
                        >
                          {selectedNotification.actionText || "مشاهده"}
                          <ArrowLeft className="h-4 w-4" />
                        </a>
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  {...fade}
                  className="flex flex-1 flex-col items-center justify-center rounded-lg border border-muted bg-secondaryBg p-8 text-center"
                >
                  <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-1 text-lg font-medium text-foreground">
                    هیچ پیامی انتخاب نشده
                  </h3>
                  <p className="text-muted-foreground">
                    برای مشاهده جزئیات، پیامی را از لیست انتخاب کنید
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Notification Detail View */}
      <AnimatePresence>
        {isMobileDetailOpen && selectedNotification && (
          <motion.div
            {...mobileDetail}
            className="fixed inset-0 z-50 overflow-y-auto bg-background p-4 pt-20 lg:hidden"
          >
            <div className="mb-4 flex items-center">
              <Button
                onClick={handleCloseMobileDetail}
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary-hover"
              >
                <ChevronRight className="h-5 w-5" />
                بازگشت
              </Button>
            </div>

            <motion.div
              {...contentFade}
              className="rounded-xl border border-muted bg-card p-6 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                {selectedNotification.isRead ? (
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Circle className="h-5 w-5 fill-primary/10 text-primary" />
                )}
                <h2 className="text-xl font-bold text-foreground">
                  {selectedNotification.title}
                </h2>
              </div>

              <time className="mb-4 block text-sm text-muted-foreground">
                {new Date(selectedNotification.createdAt).toLocaleString(
                  "fa-IR",
                )}
              </time>

              <motion.div
                {...staggeredFade}
                className="prose prose-sm mb-6 max-w-none text-foreground"
              >
                <p>{selectedNotification.body}</p>
              </motion.div>

              {selectedNotification.actionUrl && (
                <motion.div {...staggeredFade} transition={{ delay: 0.3 }}>
                  <Button variant="default" asChild className="w-full">
                    <a
                      href={selectedNotification.actionUrl}
                      className="inline-flex items-center justify-center gap-2"
                    >
                      {selectedNotification.actionText || "مشاهده"}
                      <ArrowLeft className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
