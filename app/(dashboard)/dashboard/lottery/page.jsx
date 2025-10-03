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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
  CalendarDaysIcon,
  Crown,
  LinkIcon,
  Loader2,
  MailIcon,
  PhoneIcon,
  TrophyIcon,
  UsersIcon,
  AlertTriangle,
  Loader2Icon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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

const ActiveLotteryCard = ({ lottery, loading, onEndLottery }) => {
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
      className="mb-8 overflow-hidden rounded-xl border border-muted/30 bg-card/80 shadow-sm backdrop-blur-sm sm:mx-4 sm:mr-20 xl:pr-6"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{lottery.name}</h3>
            <p className="text-muted-foreground">
              تاریخ ایجاد:{" "}
              {new Date(lottery.createdAt).toLocaleDateString("fa-IR")}
            </p>
            <p className="text-muted-foreground">
              تعداد شرکت کنندگان: {lottery._count?.submissions || 0}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-secondary px-3 py-2 text-white">
              فعال
            </div>
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" disabled={loading}>
                  پایان قرعه کشی
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    تایید پایان قرعه کشی
                  </DialogTitle>
                  <DialogDescription>
                    آیا از پایان دادن به قرعه کشی {lottery.name} مطمئن هستید؟
                    این عمل غیرقابل بازگشت است
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                  <div className="flex items-center justify-center gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">بازگشت </Button>
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
      </div>
    </motion.div>
  );
};

const LotteryHistoryTable = ({ lotteries, onSelectLottery }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-xl border border-muted/30 bg-card/80 shadow-sm backdrop-blur-sm sm:mx-4 sm:mr-20 xl:pr-6"
    >
      <div className="overflow-x-auto">
        <Table className="w-full text-sm">
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead className="min-w-[180px] text-right">
                نام قرعه کشی
              </TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="min-w-[150px] text-right">
                تاریخ ایجاد
              </TableHead>
              <TableHead className="text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody variants={stagger} initial="initial" animate="animate">
            {lotteries.map((lottery) => (
              <motion.tr
                key={lottery.id}
                variants={formItemAnimation}
                className="group cursor-pointer border-t border-muted/20 transition-colors hover:bg-muted/10"
                onClick={() => onSelectLottery(lottery)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {lottery.name}
                    {lottery.isActive && (
                      <Badge
                        variant="outline"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        مشاهده
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {lottery.isActive ? (
                    <Badge variant="success">فعال</Badge>
                  ) : (
                    <Badge variant="secondary">پایان یافته</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(lottery.createdAt).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
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
  const [submissionCount, setSubmissionCount] = useState(0);

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
        <div className="mb-8 sm:mx-4 sm:mr-20 xl:pr-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white md:text-4xl"
          >
            قرعه کشی
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white"
          >
            ایجاد و مدیریت قرعه کشی‌های شما
          </motion.p>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-muted/20 p-4">
            <Crown className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">نیاز به اشتراک پریمیوم</h3>
          <p className="text-muted-foreground">
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
      <div className="mb-8 sm:mx-4 sm:mr-20 xl:pr-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-white md:text-4xl"
        >
          قرعه کشی
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="mt-4 text-white"
        >
          ایجاد و مدیریت قرعه کشی‌های شما
        </motion.p>
      </div>

      {/* Create Lottery Button */}
      <div className="mb-8 flex justify-end sm:mx-4 sm:mr-20 xl:pr-6">
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button disabled={!!activeLottery || loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {loading ? "در حال بارگیری..." : "ایجاد قرعه کشی جدید"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ایجاد قرعه کشی جدید</DialogTitle>
              <DialogDescription>
                جزئیات قرعه کشی جدید را وارد کنید
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">نام قرعه کشی</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="مثال: قرعه کشی تابستانه"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="winnerCount">تعداد برندگان</Label>
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
                />
              </div>
              <Button onClick={handleCreateLottery} disabled={loading}>
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
        />
      )}

      {/* Loading State */}
      {loading && !activeLottery && lotteries.length === 0 && (
        <div className="space-y-4 sm:mx-4 sm:mr-20 xl:pr-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* No Active Lottery */}
      {!activeLottery && !loading && lotteries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-16 text-center sm:mx-4 sm:mr-20 xl:pr-6"
        >
          <div className="mb-4 rounded-full bg-muted/20 p-4">
            <LinkIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">قرعه کشی یافت نشد</h3>
          <p className="text-muted-foreground">
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
          />
        </div>
      )}

      {/* Lottery Details Dialog */}
      <Dialog
        open={!!selectedLottery}
        onOpenChange={() => setSelectedLottery(null)}
      >
        <DialogContent className="max-h-[70vh] max-w-2xl overflow-y-auto overflow-x-hidden">
          <DialogHeader className="px-1">
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl font-bold">جزئیات قرعه‌کشی</span>
              {selectedLottery?.isActive ? (
                <Badge variant="success" className="px-3 py-1 text-sm">
                  فعال
                </Badge>
              ) : (
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  پایان یافته
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription className="items-center gap-2">
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
                  <Separator orientation="vertical" className="h-4" />
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
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <UsersIcon className="h-5 w-5 text-blue-500" />
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          تعداد شرکت‌ کنندگان
                        </h3>
                        <p className="text-2xl font-bold">
                          {selectedLottery._count.submissions}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Lottery Details */}
              <div className="space-y-4 rounded-lg border bg-card p-4">
                <h3 className="text-lg font-semibold">اطلاعات قرعه‌کشی</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">
                      عنوان قرعه‌کشی
                    </Label>
                    <p className="font-medium">{selectedLottery.name}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">وضعیت</Label>
                    <div className="flex items-center gap-2">
                      {selectedLottery.isActive ? (
                        <>
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>فعال</span>
                        </>
                      ) : (
                        <>
                          <div className="h-2 w-2 rounded-full bg-gray-500" />
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
                      <h3 className="text-lg font-semibold">لیست برندگان</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrophyIcon className="h-4 w-4" />
                        <span>{selectedLottery.winnerCount} برنده</span>
                      </div>
                    </div>

                    {/* Main Winners Table (position 1) */}
                    <div className="overflow-x-auto rounded-lg border">
                      <Table className="w-full">
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead className="w-[100px] text-right">
                              موقعیت
                            </TableHead>
                            <TableHead className="text-right">
                              نام کامل
                            </TableHead>
                            <TableHead className="text-right">
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
                                className="hover:bg-muted/50"
                              >
                                <TableCell>
                                  <span className="font-medium">
                                    {index + 1}
                                  </span>
                                </TableCell>
                                <TableCell className="font-medium">
                                  {winner.firstName} {winner.lastName}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    {winner.contactInfo.includes("@") ? (
                                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <PhoneIcon className="h-4 w-4 text-muted-foreground" />
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
                      <AccordionItem value="alternate-winners">
                        <AccordionTrigger className="py-2">
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
                          <div className="mt-2 overflow-x-auto rounded-lg border">
                            <Table className="w-full">
                              <TableHeader className="bg-muted/50">
                                <TableRow>
                                  <TableHead className="w-[120px] text-right">
                                    ردیف
                                  </TableHead>
                                  <TableHead className="text-right">
                                    نام
                                  </TableHead>
                                  <TableHead className="text-right">
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
                                        className="hover:bg-muted/50"
                                      >
                                        <TableCell>
                                          <span className="font-medium">
                                            {positionName}
                                          </span>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                          {winner.firstName} {winner.lastName}
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex items-center gap-2">
                                            {winner.contactInfo.includes(
                                              "@",
                                            ) ? (
                                              <MailIcon className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                              <PhoneIcon className="h-4 w-4 text-muted-foreground" />
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
