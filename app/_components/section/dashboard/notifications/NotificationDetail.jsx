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
              className="flex-1 rounded-lg border border-gray-200 bg-white p-6 dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-xl"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {selectedNotification.isRead ? (
                    <CheckCircle2 className="h-5 w-5 text-gray-500 dark:text-white/60" />
                  ) : (
                    <Circle className="h-5 w-5 fill-blue-100 text-blue-600 dark:fill-blue-500/20 dark:text-blue-400" />
                  )}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedNotification.title}
                  </h2>
                </div>
                <time className="text-sm text-gray-500 dark:text-white/60">
                  {new Date(selectedNotification.createdAt).toLocaleString(
                    "fa-IR",
                  )}
                </time>
              </div>

              <motion.div
                {...contentFade}
                className="prose prose-sm max-w-none text-gray-700 dark:text-white/80"
              >
                <p>{selectedNotification.body}</p>
              </motion.div>

              {selectedNotification.actionUrl && (
                <motion.div
                  {...staggeredFade}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <Button
                    variant="default"
                    asChild
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
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
              className="flex flex-1 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-xl"
            >
              <Bell className="mb-4 h-12 w-12 text-gray-400 dark:text-white/40" />
              <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                هیچ پیامی انتخاب نشده
              </h3>
              <p className="text-gray-500 dark:text-white/60">
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
            className="fixed inset-0 z-50 overflow-y-auto bg-white p-4 pt-20 dark:bg-slate-900 lg:hidden"
          >
            <div className="mb-4 flex items-center">
              <Button
                onClick={onCloseMobileDetail}
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-white/80"
              >
                <ChevronRight className="h-5 w-5" />
                بازگشت
              </Button>
            </div>

            <motion.div
              {...contentFade}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-xl"
            >
              <div className="mb-2 flex items-center gap-2">
                {selectedNotification.isRead ? (
                  <CheckCircle2 className="h-5 w-5 text-gray-500 dark:text-white/60" />
                ) : (
                  <Circle className="h-5 w-5 fill-blue-100 text-blue-600 dark:fill-blue-500/20 dark:text-blue-400" />
                )}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedNotification.title}
                </h2>
              </div>

              <time className="mb-4 block text-sm text-gray-500 dark:text-white/60">
                {new Date(selectedNotification.createdAt).toLocaleString(
                  "fa-IR",
                )}
              </time>

              <motion.div
                {...staggeredFade}
                className="prose prose-sm mb-6 max-w-none text-gray-700 dark:text-white/80"
              >
                <p>{selectedNotification.body}</p>
              </motion.div>

              {selectedNotification.actionUrl && (
                <motion.div {...staggeredFade} transition={{ delay: 0.3 }}>
                  <Button
                    variant="default"
                    asChild
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
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
