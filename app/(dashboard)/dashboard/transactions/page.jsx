"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { getUserTransactions } from "@/actions/transactions/transactionsList";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const data = await getUserTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Convert to shamsi date
  const toPersianDate = (date) => {
    if (!date) return "-";

    const gregorianDate = new Date(date);
    const gregorianYear = gregorianDate.getFullYear();
    const gregorianMonth = gregorianDate.getMonth() + 1;
    const gregorianDay = gregorianDate.getDate();
    const hours = gregorianDate.getHours().toString().padStart(2, "0");
    const minutes = gregorianDate.getMinutes().toString().padStart(2, "0");

    // convert logic (by deepseek)
    const gregorianToJalali = (gy, gm, gd) => {
      const gDaysInMonth = [
        0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334,
      ];
      let jalaliYear, jalaliMonth, jalaliDay;

      if (gy > 1600) {
        jalaliYear = 979;
        gy -= 1600;
      } else {
        jalaliYear = 0;
        gy -= 621;
      }

      const gy2 = gm > 2 ? gy + 1 : gy;
      let days =
        365 * gy +
        Math.floor((gy2 + 3) / 4) -
        Math.floor((gy2 + 99) / 100) +
        Math.floor((gy2 + 399) / 400) -
        80 +
        gd +
        gDaysInMonth[gm - 1];

      jalaliYear += 33 * Math.floor(days / 12053);
      days %= 12053;
      jalaliYear += 4 * Math.floor(days / 1461);
      days %= 1461;

      if (days > 365) {
        jalaliYear += Math.floor((days - 1) / 365);
        days = (days - 1) % 365;
      }

      jalaliMonth =
        days < 186
          ? 1 + Math.floor(days / 31)
          : 7 + Math.floor((days - 186) / 30);
      jalaliDay = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

      return [jalaliYear, jalaliMonth, jalaliDay];
    };

    const [shamsiYear, shamsiMonth, shamsiDay] = gregorianToJalali(
      gregorianYear,
      gregorianMonth,
      gregorianDay,
    );

    // Format with Persian digits
    const toPersianDigits = (num) => {
      const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return num.toString().replace(/\d/g, (x) => persianDigits[x]);
    };

    return `${toPersianDigits(shamsiYear)}/${toPersianDigits(shamsiMonth)}/${toPersianDigits(shamsiDay)} - ${toPersianDigits(hours)}:${toPersianDigits(minutes)}`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">تکمیل شده</Badge>;
      case "failed":
        return <Badge variant="destructive">ناموفق</Badge>;
      case "refunded":
        return <Badge variant="secondary">عودت داده شده</Badge>;
      default:
        return <Badge variant="outline">در انتظار</Badge>;
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 sm:mx-4 sm:mr-20 xl:pr-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          تاریخچه تراکنش‌ها
        </h1>
        <p className="mt-4 text-gray-600 dark:text-white/80">
          لیست تمام تراکنش‌های انجام شده
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="sm:mx-4 sm:mr-20 xl:pr-6"
      >
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-xl">
          <Table dir="rtl">
            <TableHeader className="text-sm font-semibold text-gray-900 dark:bg-white/10 dark:text-white">
              <TableRow className="dark:border-white/20">
                <TableHead className="min-w-[50px] text-center">ردیف</TableHead>
                <TableHead className="min-w-[100px] text-center">
                  مبلغ
                </TableHead>
                <TableHead className="min-w-[100px] text-center">
                  شماره سفارش
                </TableHead>
                <TableHead className="min-w-[150px] text-center">
                  تاریخ درخواست
                </TableHead>
                <TableHead className="min-w-[150px] text-center">
                  تاریخ تکمیل
                </TableHead>
                <TableHead className="min-w-[150px] text-center">
                  وضعیت
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 dark:border-white/20 dark:hover:bg-white/10"
                  >
                    <TableCell className="text-center">
                      <div className="mx-auto h-6 w-6 animate-pulse rounded bg-gray-200 dark:bg-white/20"></div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="mx-auto h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-white/20"></div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="mx-auto h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-white/20"></div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="mx-auto h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-white/20"></div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="mx-auto h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-white/20"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : transactions.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="dark:border-white/20"
                >
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-gray-500 dark:text-white/60"
                  >
                    تراکنشی یافت نشد
                  </TableCell>
                </motion.tr>
              ) : (
                transactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:border-white/20 dark:hover:bg-white/10"
                  >
                    <TableCell className="text-center text-gray-900 dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center text-gray-900 dark:text-white">
                      {transaction.amount.toLocaleString("fa-IR")} تومان
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.trackId}
                    </TableCell>
                    <TableCell className="text-center text-gray-700 dark:text-white/80">
                      {toPersianDate(transaction.requestDate)}
                    </TableCell>
                    <TableCell className="text-center text-gray-700 dark:text-white/80">
                      {transaction.paidAt
                        ? toPersianDate(transaction.paidAt)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
