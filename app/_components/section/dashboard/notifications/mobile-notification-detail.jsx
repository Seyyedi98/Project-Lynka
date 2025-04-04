import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  mobileDetail,
  contentFade,
  staggeredFade,
} from "@/utils/animation/animation";

export default function MobileNotificationDetail({
  isOpen,
  notification,
  onClose,
}) {
  if (!isOpen || !notification) return null;

  return (
    <motion.div
      {...mobileDetail}
      className="fixed inset-0 z-50 overflow-y-auto bg-background p-4 pt-20 lg:hidden"
    >
      <div className="mb-4 flex items-center">
        <Button
          onClick={onClose}
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
          {notification.isRead ? (
            <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Circle className="h-5 w-5 fill-primary/10 text-primary" />
          )}
          <h2 className="text-xl font-bold text-foreground">
            {notification.title}
          </h2>
        </div>

        <time className="mb-4 block text-sm text-muted-foreground">
          {new Date(notification.createdAt).toLocaleString("fa-IR")}
        </time>

        <motion.div
          {...staggeredFade}
          className="prose prose-sm mb-6 max-w-none text-foreground"
        >
          <p>{notification.body}</p>
        </motion.div>

        {notification.actionUrl && (
          <motion.div {...staggeredFade} transition={{ delay: 0.3 }}>
            <Button variant="default" asChild className="w-full">
              <a
                href={notification.actionUrl}
                className="inline-flex items-center justify-center gap-2"
              >
                {notification.actionText || "مشاهده"}
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
