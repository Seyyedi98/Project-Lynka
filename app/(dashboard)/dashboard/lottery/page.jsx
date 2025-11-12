"use client";

import {
  createLottery,
  endLottery,
  getUserLotteries,
} from "@/actions/lottery/lottery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarDaysIcon,
  Crown,
  LinkIcon,
  Loader2,
  MailIcon,
  PhoneIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const formItemAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const ActiveLotteryCard = ({ lottery, loading, onEndLottery, isDark }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmEnd = () => {
    setConfirmOpen(false);
    onEndLottery(lottery.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-8 overflow-hidden rounded-2xl border p-6 ${
        isDark
          ? "border-white/20 bg-white/10 backdrop-blur-xl"
          : "border-gray-200 bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {lottery.name}
          </h3>
          <p className={isDark ? "text-white/60" : "text-gray-600"}>
            تاریخ ایجاد:{" "}
            {new Date(lottery.createdAt).toLocaleDateString("fa-IR")}
          </p>
          <p className={isDark ? "text-white/60" : "text-gray-600"}>
            تعداد شرکت کنندگان: {lottery._count?.submissions || 0}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`rounded-xl px-3 py-2 backdrop-blur-sm ${
              isDark
                ? "bg-green-500/20 text-green-400"
                : "bg-green-100 text-green-700"
            }`}
          >
            فعال
          </div>
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" disabled={loading}>
                پایان قرعه کشی
              </Button>
            </DialogTrigger>
            <DialogContent
              className={
                isDark
                  ? "border-white/20 bg-slate-900/90 backdrop-blur-xl"
                  : "bg-white"
              }
            >
              <DialogHeader>
                <DialogTitle
                  className={`flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  تایید پایان قرعه کشی
                </DialogTitle>
                <DialogDescription
                  className={isDark ? "text-white/60" : "text-gray-600"}
                >
                  آیا از پایان دادن به قرعه کشی {lottery.name} مطمئن هستید؟ این
                  عمل غیرقابل بازگشت است
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <div className="flex items-center justify-center gap-2">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className={isDark ? "border-white/20" : ""}
                    >
                      بازگشت
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={handleConfirmEnd}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "تایید"
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
};

const LotteryHistoryTable = ({ lotteries, onSelectLottery, isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`overflow-hidden rounded-xl ${
        isDark
          ? "border border-white/20 bg-white/10 backdrop-blur-xl"
          : "bg-transparent shadow-sm"
      }`}
    >
      <div className="w-full overflow-x-auto">
        <Table dir="rtl">
          <TableHeader
            className={`text-sm font-semibold ${
              isDark ? "bg-white/10 text-white" : "text-textLight bg-muted/50"
            }`}
          >
            <TableRow className={isDark ? "border-white/20" : ""}>
              <TableHead
                className={`min-w-[180px] text-right ${
                  isDark ? "text-white" : "text-textLight"
                }`}
              >
                نام قرعه کشی
              </TableHead>
              <TableHead
                className={`text-right ${
                  isDark ? "text-white" : "text-textLight"
                }`}
              >
                وضعیت
              </TableHead>
              <TableHead
                className={`min-w-[150px] text-right ${
                  isDark ? "text-white" : "text-textLight"
                }`}
              >
                تاریخ ایجاد
              </TableHead>
              <TableHead
                className={`text-right ${
                  isDark ? "text-white" : "text-textLight"
                }`}
              >
                عملیات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody variants={stagger} initial="initial" animate="animate">
            {lotteries.map((lottery) => (
              <motion.tr
                key={lottery.id}
                variants={formItemAnimation}
                className={`group cursor-pointer transition-colors ${
                  isDark
                    ? "border-white/20 hover:bg-white/10"
                    : "border-b border-border/40 hover:bg-accent/30"
                }`}
                onClick={() => onSelectLottery(lottery)}
              >
                <TableCell
                  className={`font-medium ${
                    isDark ? "text-white" : "text-text"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {lottery.name}
                    {lottery.isActive && (
                      <Badge
                        variant="outline"
                        className={`opacity-0 transition-opacity group-hover:opacity-100 ${
                          isDark
                            ? "border-white/20 text-white/80"
                            : "text-textLight border-border"
                        }`}
                      >
                        مشاهده
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {lottery.isActive ? (
                    <Badge
                      className={
                        isDark
                          ? "border-green-500/30 bg-green-500/20 text-green-400"
                          : "bg-green-100 text-green-700"
                      }
                    >
                      فعال
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className={
                        isDark
                          ? "border-white/20 bg-white/10 text-white/80"
                          : "text-textLight bg-muted"
                      }
                    >
                      پایان یافته
                    </Badge>
                  )}
                </TableCell>
                <TableCell
                  className={isDark ? "text-white/80" : "text-textLight"}
                >
                  {new Date(lottery.createdAt).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={
                      isDark
                        ? "text-white/80 hover:bg-white/10 hover:text-white"
                        : "text-textLight hover:bg-muted hover:text-[hsl(var(--primary))]"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLottery(lottery);
                    }}
                  >
                    جزئیات
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default function LotteryPage() {
  const [activeLottery, setActiveLottery] = useState(null);
  const [lotteries, setLotteries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    winnerCount: 1,
  });
  const { isPremium, isLoading: isPremiumLoading } = useUserSubscription();
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  const fetchLotteries = useCallback(async () => {
    if (!isPremiumLoading && !isPremium) return;
    setLoading(true);
    try {
      const data = await getUserLotteries();
      setLotteries(data);
      const active = data.find((lottery) => lottery.isActive);
      setActiveLottery(active);
    } catch (error) {
      toast.error("خطا در دریافت قرعه کشی‌ها");
    } finally {
      setLoading(false);
    }
  }, [isPremium, isPremiumLoading]);

  useEffect(() => {
    fetchLotteries();
  }, [fetchLotteries]);

  const handleCreateLottery = async () => {
    if (!formData.name) {
      toast.error("نام قرعه کشی الزامی است");
      return;
    }

    try {
      setLoading(true);
      const newLottery = await createLottery(
        formData.name,
        formData.winnerCount,
      );

      setLotteries((prev) => [newLottery, ...prev]);
      setActiveLottery(newLottery);
      setModalOpen(false);
      setFormData({ name: "", winnerCount: 1 });
      toast.success("قرعه کشی با موفقیت ایجاد شد");
    } catch (error) {
      toast.error(error.message || "خطا در ایجاد قرعه کشی");
      await fetchLotteries();
    } finally {
      setLoading(false);
    }
  };

  const handleEndLottery = async (lotteryId) => {
    try {
      setLoading(true);
      const endedLottery = await endLottery(lotteryId);

      setLotteries((prev) =>
        prev.map((lottery) =>
          lottery.id === lotteryId ? endedLottery : lottery,
        ),
      );
      setActiveLottery(null);
      toast.success("قرعه کشی پایان یافت و برندگان انتخاب شدند");
    } catch (error) {
      toast.error(error.message || "خطا در ارتباط با سرور");
      await fetchLotteries();
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLottery = (lottery) => {
    setSelectedLottery(lottery);
  };

  if (!isPremium && !isPremiumLoading) {
    return (
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl font-bold text-white md:text-4xl`}
          >
            قرعه کشی
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`mt-4 text-white/80`}
          >
            ایجاد و مدیریت قرعه کشی‌های شما
          </motion.p>
        </div>
        <div
          className={`flex flex-col items-center justify-center rounded-2xl border py-16 text-center ${
            isDark
              ? "border-white/20 bg-white/10 backdrop-blur-xl"
              : "border-gray-200 bg-white shadow-sm"
          }`}
        >
          <div
            className={`mb-4 rounded-full p-4 ${
              isDark ? "bg-white/10" : "bg-gray-100"
            }`}
          >
            <Crown
              className={`h-8 w-8 ${isDark ? "text-amber-400" : "text-amber-500"}`}
            />
          </div>
          <h3
            className={`mb-2 text-lg font-medium ${isDark ? "text-white" : "text-gray-900"}`}
          >
            نیاز به اشتراک پریمیوم
          </h3>
          <p className={isDark ? "text-white/60" : "text-gray-600"}>
            برای دسترسی به فرم‌های ارسال شده، لطفاً اشتراک پریمیوم تهیه کنید
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`text-3xl font-bold text-white md:text-4xl`}
        >
          قرعه کشی
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className={`mt-4 text-white/80`}
        >
          ایجاد و مدیریت قرعه کشی‌های شما
        </motion.p>
      </div>

      {/* Create Lottery Button */}
      <div className="mb-8 flex justify-end">
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={!!activeLottery || loading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {loading ? "در حال بارگیری..." : "ایجاد قرعه کشی جدید"}
            </Button>
          </DialogTrigger>
          <DialogContent
            className={
              isDark
                ? "border-white/20 bg-slate-900/90 backdrop-blur-xl"
                : "border-gray-200 bg-white"
            }
          >
            <DialogHeader>
              <DialogTitle className={isDark ? "text-white" : "text-gray-900"}>
                ایجاد قرعه کشی جدید
              </DialogTitle>
              <DialogDescription
                className={isDark ? "text-white/60" : "text-gray-600"}
              >
                جزئیات قرعه کشی جدید را وارد کنید
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className={isDark ? "text-white" : "text-gray-900"}
                >
                  نام قرعه کشی
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="مثال: قرعه کشی تابستانه"
                  className={
                    isDark
                      ? "border-white/20 bg-white/10 text-white placeholder:text-white/40"
                      : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-500"
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="winnerCount"
                  className={isDark ? "text-white" : "text-gray-900"}
                >
                  تعداد برندگان
                </Label>
                <Input
                  id="winnerCount"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.winnerCount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      winnerCount: parseInt(e.target.value) || 1,
                    })
                  }
                  className={
                    isDark
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }
                />
              </div>
              <Button
                onClick={handleCreateLottery}
                disabled={loading}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {loading ? "در حال ایجاد..." : "ایجاد قرعه کشی"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Lottery */}
      {activeLottery && (
        <ActiveLotteryCard
          lottery={activeLottery}
          loading={loading}
          onEndLottery={handleEndLottery}
          isDark={isDark}
        />
      )}

      {/* Loading State */}
      {loading && !activeLottery && lotteries.length === 0 && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className={`h-20 w-full rounded-2xl ${isDark ? "bg-white/10" : "bg-gray-200"}`}
            />
          ))}
        </div>
      )}

      {/* No Active Lottery */}
      {!activeLottery && !loading && lotteries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex flex-col items-center justify-center rounded-2xl border py-16 text-center ${
            isDark
              ? "border-white/20 bg-white/10 backdrop-blur-xl"
              : "border-gray-200 bg-white shadow-sm"
          }`}
        >
          <div
            className={`mb-4 rounded-full p-4 ${
              isDark ? "bg-white/10" : "bg-gray-100"
            }`}
          >
            <LinkIcon
              className={`h-8 w-8 ${isDark ? "text-amber-400" : "text-amber-500"}`}
            />
          </div>
          <h3
            className={`mb-2 text-lg font-medium ${isDark ? "text-white" : "text-gray-900"}`}
          >
            قرعه کشی یافت نشد
          </h3>
          <p className={isDark ? "text-white/60" : "text-gray-600"}>
            اولین قرعه کشی خود را ایجاد کنید
          </p>
        </motion.div>
      )}

      {/* Lottery History Table */}
      {lotteries.length > 0 && (
        <div className="mb-8">
          <LotteryHistoryTable
            lotteries={lotteries}
            onSelectLottery={handleSelectLottery}
            isDark={isDark}
          />
        </div>
      )}

      {/* Lottery Details Dialog */}
      <Dialog
        open={!!selectedLottery}
        onOpenChange={() => setSelectedLottery(null)}
      >
        <DialogContent
          className={`max-h-[70vh] max-w-2xl overflow-y-auto overflow-x-hidden ${
            isDark
              ? "border-white/20 bg-slate-900/90 backdrop-blur-xl"
              : "border-gray-200 bg-white"
          }`}
        >
          <DialogHeader className="px-1">
            <DialogTitle
              className={`flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              <span className="text-2xl font-bold">جزئیات قرعه‌کشی</span>
              {selectedLottery?.isActive ? (
                <Badge
                  className={
                    isDark
                      ? "border-green-500/30 bg-green-500/20 text-green-400"
                      : "bg-green-100 text-green-700"
                  }
                >
                  فعال
                </Badge>
              ) : (
                <Badge
                  className={
                    isDark
                      ? "border-white/20 bg-white/10 text-white/80"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  پایان یافته
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription
              className={`items-center gap-2 ${isDark ? "text-white/60" : "text-gray-600"}`}
            >
              <CalendarDaysIcon className="h-4 w-4" />
              <span>
                تاریخ ایجاد:{" "}
                {selectedLottery?.createdAt.toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {selectedLottery?.endedAt && (
                <>
                  <Separator
                    orientation="vertical"
                    className={`h-4 ${isDark ? "bg-white/20" : "bg-gray-300"}`}
                  />
                  <span>
                    تاریخ پایان:{" "}
                    {new Date(selectedLottery.endedAt).toLocaleDateString(
                      "fa-IR",
                    )}
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedLottery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 px-1 py-4"
            >
              {/* Participant Count (only when active) */}
              {selectedLottery.isActive &&
                selectedLottery._count?.submissions && (
                  <div
                    className={`rounded-xl border p-4 ${
                      isDark
                        ? "border-white/20 bg-white/10 backdrop-blur-sm"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <UsersIcon
                        className={`h-5 w-5 ${isDark ? "text-blue-400" : "text-blue-500"}`}
                      />
                      <div>
                        <h3
                          className={`text-sm font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}
                        >
                          تعداد شرکت‌ کنندگان
                        </h3>
                        <p
                          className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {selectedLottery._count.submissions}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Lottery Details */}
              <div
                className={`space-y-4 rounded-xl border p-4 ${
                  isDark
                    ? "border-white/20 bg-white/10 backdrop-blur-sm"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <h3
                  className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  اطلاعات قرعه‌کشی
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      className={isDark ? "text-white/60" : "text-gray-600"}
                    >
                      عنوان قرعه‌کشی
                    </Label>
                    <p
                      className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {selectedLottery.name}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      className={isDark ? "text-white/60" : "text-gray-600"}
                    >
                      وضعیت
                    </Label>
                    <div
                      className={`flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {selectedLottery.isActive ? (
                        <>
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>فعال</span>
                        </>
                      ) : (
                        <>
                          <div
                            className={`h-2 w-2 rounded-full ${isDark ? "bg-white/60" : "bg-gray-500"}`}
                          />
                          <span>پایان یافته</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Winners Section */}
              {selectedLottery.winners &&
                selectedLottery.winners.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        لیست برندگان
                      </h3>
                      <div
                        className={`flex items-center gap-2 text-sm ${isDark ? "text-white/60" : "text-gray-600"}`}
                      >
                        <TrophyIcon className="h-4 w-4" />
                        <span>{selectedLottery.winnerCount} برنده</span>
                      </div>
                    </div>

                    {/* Main Winners Table (position 1) */}
                    <div
                      className={`overflow-x-auto rounded-xl border ${
                        isDark ? "border-white/20" : "border-gray-200"
                      }`}
                    >
                      <Table className="w-full">
                        <TableHeader
                          className={isDark ? "bg-white/10" : "bg-gray-50"}
                        >
                          <TableRow
                            className={
                              isDark ? "border-white/20" : "border-gray-200"
                            }
                          >
                            <TableHead
                              className={`w-[100px] text-right ${isDark ? "text-white" : "text-gray-900"}`}
                            >
                              موقعیت
                            </TableHead>
                            <TableHead
                              className={`text-right ${isDark ? "text-white" : "text-gray-900"}`}
                            >
                              نام کامل
                            </TableHead>
                            <TableHead
                              className={`text-right ${isDark ? "text-white" : "text-gray-900"}`}
                            >
                              اطلاعات تماس
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedLottery.winners
                            .filter((winner) => winner.position === 1)
                            .map((winner, index) => (
                              <motion.tr
                                key={winner.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className={
                                  isDark
                                    ? "border-white/20 hover:bg-white/10"
                                    : "border-gray-200 hover:bg-gray-50"
                                }
                              >
                                <TableCell
                                  className={
                                    isDark ? "text-white" : "text-gray-900"
                                  }
                                >
                                  <span className="font-medium">
                                    {index + 1}
                                  </span>
                                </TableCell>
                                <TableCell
                                  className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                                >
                                  {winner.firstName} {winner.lastName}
                                </TableCell>
                                <TableCell
                                  className={
                                    isDark ? "text-white" : "text-gray-900"
                                  }
                                >
                                  <div className="flex items-center gap-2">
                                    {winner.contactInfo.includes("@") ? (
                                      <MailIcon
                                        className={`h-4 w-4 ${isDark ? "text-white/60" : "text-gray-500"}`}
                                      />
                                    ) : (
                                      <PhoneIcon
                                        className={`h-4 w-4 ${isDark ? "text-white/60" : "text-gray-500"}`}
                                      />
                                    )}
                                    {winner.contactInfo}
                                  </div>
                                </TableCell>
                              </motion.tr>
                            ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Alternate Winners Accordion */}
                    <Accordion type="single" collapsible>
                      <AccordionItem
                        value="alternate-winners"
                        className={
                          isDark ? "border-white/20" : "border-gray-200"
                        }
                      >
                        <AccordionTrigger
                          className={`py-2 ${isDark ? "text-white hover:text-white/80" : "text-gray-900 hover:text-gray-700"}`}
                        >
                          <span className="text-sm">
                            نمایش افراد جایگزین (
                            {
                              selectedLottery.winners.filter(
                                (w) => w.position > 1,
                              ).length
                            }
                            )
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div
                            className={`mt-2 overflow-x-auto rounded-xl border ${
                              isDark ? "border-white/20" : "border-gray-200"
                            }`}
                          >
                            <Table className="w-full">
                              <TableHeader
                                className={
                                  isDark ? "bg-white/10" : "bg-gray-50"
                                }
                              >
                                <TableRow
                                  className={
                                    isDark
                                      ? "border-white/20"
                                      : "border-gray-200"
                                  }
                                >
                                  <TableHead
                                    className={`w-[120px] text-right ${isDark ? "text-white" : "text-gray-900"}`}
                                  >
                                    ردیف
                                  </TableHead>
                                  <TableHead
                                    className={`text-right ${isDark ? "text-white" : "text-gray-900"}`}
                                  >
                                    نام
                                  </TableHead>
                                  <TableHead
                                    className={`text-right ${isDark ? "text-white" : "text-gray-900"}`}
                                  >
                                    اطلاعات تماس
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedLottery.winners
                                  .filter((winner) => winner.position > 1)
                                  .map((winner) => {
                                    const positionName =
                                      winner.position === 2
                                        ? "جایگزین اول"
                                        : winner.position === 3
                                          ? "جایگزین دوم"
                                          : `جایگزین ${winner.position - 1}`;

                                    return (
                                      <motion.tr
                                        key={winner.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className={
                                          isDark
                                            ? "border-white/20 hover:bg-white/10"
                                            : "border-gray-200 hover:bg-gray-50"
                                        }
                                      >
                                        <TableCell
                                          className={
                                            isDark
                                              ? "text-white"
                                              : "text-gray-900"
                                          }
                                        >
                                          <span className="font-medium">
                                            {positionName}
                                          </span>
                                        </TableCell>
                                        <TableCell
                                          className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                                        >
                                          {winner.firstName} {winner.lastName}
                                        </TableCell>
                                        <TableCell
                                          className={
                                            isDark
                                              ? "text-white"
                                              : "text-gray-900"
                                          }
                                        >
                                          <div className="flex items-center gap-2">
                                            {winner.contactInfo.includes(
                                              "@",
                                            ) ? (
                                              <MailIcon
                                                className={`h-4 w-4 ${isDark ? "text-white/60" : "text-gray-500"}`}
                                              />
                                            ) : (
                                              <PhoneIcon
                                                className={`h-4 w-4 ${isDark ? "text-white/60" : "text-gray-500"}`}
                                              />
                                            )}
                                            {winner.contactInfo}
                                          </div>
                                        </TableCell>
                                      </motion.tr>
                                    );
                                  })}
                              </TableBody>
                            </Table>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </motion.div>
                )}
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
