import NotificationCard from "@/app/_components/common/card/notification-card";
import { Button } from "@/components/ui/button";
import {
  fade,
  loadingFade,
  notificationItem,
} from "@/utils/animation/animation";
import { motion } from "framer-motion";
import { Bell, Loader2 } from "lucide-react";

export default function NotificationList({
  notifications,
  unreadCount,
  isLoading,
  nextCursor,
  isMarkingAll,
  onMarkAllAsRead,
  onLoadMore,
  onNotificationClick,
}) {
  return (
    <div className="w-full lg:w-2/5 xl:w-1/3">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            اعلان‌ها
          </h1>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-sm font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        <Button
          onClick={onMarkAllAsRead}
          variant="ghost"
          size="sm"
          disabled={isMarkingAll || unreadCount === 0}
          className="text-primary hover:text-primary-hover dark:text-white dark:hover:text-white/80"
        >
          {isMarkingAll ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "علامت گذاری همه به عنوان خوانده شده"
          )}
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-white/20 dark:bg-white/10">
        {isLoading ? (
          <div className="space-y-3 p-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                {...loadingFade}
                transition={{ delay: i * 0.1 }}
                className="animate-pulse rounded-lg bg-gray-100 p-4 dark:bg-white/10"
              >
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-white/20"></div>
                <div className="mb-2 h-3 w-full rounded bg-gray-200 dark:bg-white/20"></div>
                <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-white/20"></div>
              </motion.div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <motion.div
            {...fade}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <Bell className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />
            <p className="text-gray-500 dark:text-white/60">
              شما هیچ پیامی ندارید
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="h-96 divide-y divide-gray-200 overflow-y-auto dark:divide-white/20"
          >
            {notifications.map((notification, index) => (
              <motion.div
                key={`${index}-${notification.id}`}
                layout
                {...notificationItem}
                onClick={() => onNotificationClick(notification)}
                className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/10 ${
                  !notification.isRead
                    ? "bg-blue-50 dark:bg-blue-500/10"
                    : "bg-white dark:bg-transparent"
                }`}
              >
                <NotificationCard notification={notification} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {nextCursor && (
          <motion.div
            {...fade}
            className="border-t border-gray-200 p-4 dark:border-white/20"
          >
            <Button
              onClick={onLoadMore}
              variant="outline"
              className="w-full border-gray-300 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
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
  );
}
