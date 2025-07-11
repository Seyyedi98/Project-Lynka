import { Button } from "@/components/ui/button";
import {
  contentFade,
  desktopDetail,
  fade,
  mobileDetail,
  staggeredFade,
} from "@/utils/animation/animation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronRight,
  Circle,
} from "lucide-react";

export default function NotificationDetail({
  selectedNotification,
  isMobileDetailOpen,
  onCloseMobileDetail,
}) {
  return (
    <>
      {/* Desktop View */}
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

      {/* Mobile View */}
      <AnimatePresence>
        {isMobileDetailOpen && selectedNotification && (
          <motion.div
            {...mobileDetail}
            className="fixed inset-0 z-50 overflow-y-auto bg-background p-4 pt-20 lg:hidden"
          >
            <div className="mb-4 flex items-center">
              <Button
                onClick={onCloseMobileDetail}
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
                      target="_blank"
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
    </>
  );
}
