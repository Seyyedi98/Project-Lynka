import { motion } from "framer-motion";
import { Bell, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationCard from "@/app/_components/common/card/notification-card";
import {
  fade,
  loadingFade,
  notificationItem,
} from "@/utils/animation/animation";

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
          <h1 className="text-2xl font-bold text-foreground">اعلان‌ها</h1>
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
          <motion.div
            {...fade}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <Bell className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">شما هیچ پیامی ندارید</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="h-96 divide-y divide-muted overflow-y-auto"
          >
            {notifications.map((notification, index) => (
              <motion.div
                key={`${index}-${notification.id}`}
                layout
                {...notificationItem}
                onClick={() => onNotificationClick(notification)}
                className={`cursor-pointer p-4 transition-colors hover:bg-accent/50 ${
                  !notification.isRead ? "bg-primary/10" : "bg-secondaryBg"
                }`}
              >
                <NotificationCard notification={notification} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {nextCursor && (
          <motion.div {...fade} className="border-t border-muted p-4">
            <Button
              onClick={onLoadMore}
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
  );
}
