import { motion } from "framer-motion";
import { Bell, CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  desktopDetail,
  contentFade,
  staggeredFade,
  fade,
} from "@/utils/animation/animation";

export default function NotificationDetail({ notification }) {
  return (
    <div className="hidden lg:flex lg:flex-1">
      <motion.div
        {...(notification ? desktopDetail : fade)}
        className={`flex-1 rounded-lg border border-muted bg-secondaryBg p-6 ${
          notification
            ? ""
            : "flex flex-col items-center justify-center text-center"
        }`}
      >
        {notification ? (
          <>
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-2">
                {notification.isRead ? (
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Circle className="h-5 w-5 fill-primary/10 text-primary" />
                )}
                <h2 className="text-xl font-bold text-foreground">
                  {notification.title}
                </h2>
              </div>
              <time className="text-sm text-muted-foreground">
                {new Date(notification.createdAt).toLocaleString("fa-IR")}
              </time>
            </div>

            <motion.div
              {...contentFade}
              className="prose prose-sm max-w-none text-foreground"
            >
              <p>{notification.body}</p>
            </motion.div>

            {notification.actionUrl && (
              <motion.div
                {...staggeredFade}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Button variant="default" asChild>
                  <a
                    href={notification.actionUrl}
                    className="inline-flex items-center gap-2"
                  >
                    {notification.actionText || "مشاهده"}
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-medium text-foreground">
              هیچ پیامی انتخاب نشده
            </h3>
            <p className="text-muted-foreground">
              برای مشاهده جزئیات، پیامی را از لیست انتخاب کنید
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
