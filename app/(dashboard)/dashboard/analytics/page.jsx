"use client";

import { getLinkAnalytics } from "@/actions/page/analytics";
import { getUserPageData } from "@/actions/page/page";
import PageAnalyticsChart from "@/app/_components/charts/page-analytics-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { motion } from "framer-motion";
import {
  Calendar,
  Link as LinkIcon,
  Loader2,
  MousePointerClick,
} from "lucide-react";
import { useEffect, useState } from "react";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

const AnalyticsPanel = () => {
  const [analytics, setAnalytics] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [dateRange, setDateRange] = useState("lastmonth");
  const { isPremium, isLoading: isPremiumLoading } = useUserSubscription();

  useEffect(() => {
    if (!isPremiumLoading && !isPremium) return;

    const fetchPages = async () => {
      try {
        setIsInitialLoading(true);
        const allPages = await getUserPageData();
        setPages(allPages);
      } catch (err) {
        console.error(err);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchPages();
  }, [isPremium, isPremiumLoading]);

  useEffect(() => {
    if (!isPremiumLoading && !isPremium) return;

    const fetchAnalytics = async () => {
      if (!selectedPage) {
        setAnalytics([]);
        return;
      }

      setIsLoading(true);
      let allAnalytics = [];

      try {
        if (selectedPage === "all") {
          const allPages = await getUserPageData();
          for (const page of allPages) {
            const data = await getLinkAnalytics(page.uri, dateRange);
            allAnalytics.push(...data);
          }
        } else {
          const page = pages.find((p) => p.uri === selectedPage);
          if (page) {
            const data = await getLinkAnalytics(page.uri, dateRange);
            allAnalytics = data;
          }
        }

        setAnalytics(allAnalytics);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange, selectedPage, pages, isPremium, isPremiumLoading]);

  if (isPremiumLoading) {
    return (
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-muted/20 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-muted-foreground"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium">نیاز به اشتراک پریمیوم</h3>
          <p className="text-muted-foreground">
            برای دسترسی به آمار و تحلیل‌ها، لطفاً اشتراک پریمیوم تهیه کنید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 sm:mx-4 sm:mr-20 xl:pr-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white md:text-4xl"
        >
          آمار و تحلیل‌ها
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-white"
        >
          مشاهده و تحلیل آمار کلیک‌های صفحات
        </motion.p>
      </div>

      {/* Filters Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Card className="border-0 bg-background/80 backdrop-blur-sm sm:mx-4 sm:mr-20 xl:pr-6">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1"></div>

              <div className="flex items-center gap-3">
                <Select
                  value={dateRange}
                  onValueChange={setDateRange}
                  disabled={!selectedPage}
                >
                  <SelectTrigger className="w-48">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="انتخاب بازه زمانی" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">امروز</SelectItem>
                    <SelectItem value="lastweek">هفته گذشته</SelectItem>
                    <SelectItem value="lastmonth">ماه گذشته</SelectItem>
                    <SelectItem value="last3month">سه ماه گذشته</SelectItem>
                    <SelectItem value="last6month">شش ماه گذشته</SelectItem>
                    <SelectItem value="lastyear">سال گذشته</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="w-48">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="انتخاب صفحه" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {isInitialLoading ? (
                      <div className="p-2 text-center text-sm text-muted-foreground">
                        در حال بارگذاری صفحات ...
                      </div>
                    ) : (
                      pages.map((page) => (
                        <SelectItem key={page.uri} value={page.uri}>
                          {page.title || page.uri}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content */}
      {isInitialLoading ? (
        <div className="space-y-4 sm:mx-4 sm:mr-20 xl:pr-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {/* Stats Cards - Only shown when a page is selected */}
          {selectedPage ? (
            <motion.div
              {...fade}
              className="mb-6 grid grid-cols-1 gap-6 sm:mx-4 sm:mr-20 sm:grid-cols-2 xl:pr-6"
            >
              <Card className="border-0 bg-gradient-to-r from-primary to-indigo-600">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-indigo-100">
                        تعداد کلیک‌ها
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-white">
                        {analytics.length}
                      </p>
                    </div>
                    <MousePointerClick className="h-8 w-8 text-indigo-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-r from-pink-500 to-pink-600">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-pink-100">
                        میانگین کلیک در روز
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-white">
                        {dateRange === "today"
                          ? analytics.length
                          : Math.round(
                              analytics.length /
                                (dateRange === "lastweek"
                                  ? 7
                                  : dateRange === "lastmonth"
                                    ? 30
                                    : dateRange === "last3month"
                                      ? 90
                                      : dateRange === "last6month"
                                        ? 180
                                        : dateRange === "lastyear"
                                          ? 365
                                          : 1),
                            )}
                      </p>
                    </div>
                    <svg
                      className="h-8 w-8 text-pink-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              {...fade}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="mb-4 rounded-full bg-muted/20 p-4">
                <LinkIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium">
                صفحه‌ای انتخاب نشده است
              </h3>
              <p className="text-muted-foreground">
                لطفاً یک صفحه را از لیست انتخاب کنید تا آمار آن نمایش داده شود
              </p>
            </motion.div>
          )}

          {/* Analytics Chart */}
          {selectedPage && (
            <motion.div
              {...fade}
              className="overflow-hidden rounded-xl border border-muted/30 bg-card/80 shadow-sm backdrop-blur-sm sm:mx-4 sm:mr-20 xl:pr-6"
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedPage !== "all"
                    ? `جزئیات کلیک‌ها برای ${
                        pages.find((p) => p.uri === selectedPage)?.title ||
                        selectedPage
                      }`
                    : "جزئیات کلیک‌ها برای همه صفحات"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  </div>
                ) : analytics.length > 0 ? (
                  <PageAnalyticsChart data={analytics} dateRange={dateRange} />
                ) : (
                  <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border">
                    <p className="text-muted-foreground">
                      داده‌ای برای نمایش وجود ندارد
                    </p>
                  </div>
                )}
              </CardContent>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default AnalyticsPanel;
