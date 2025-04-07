"use client";

import { getLinkAnalytics } from "@/actions/page/analytics";
import { getUserPageData } from "@/actions/page/page";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import {
  Loader2Icon,
  Calendar,
  BarChart2,
  MousePointerClick,
  Link as LinkIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardDataCard from "@/app/_components/common/card/dashboard-data-card";

const AnalyticsPanel = () => {
  const [analytics, setAnalytics] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  const { isPremium } = useUserSubscription();

  useEffect(() => {
    const fetchPages = async () => {
      const allPages = await getUserPageData();
      setPages(allPages);
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!selectedPage) {
        setAnalytics([]);
        return;
      }

      setIsLoading(true);
      let allAnalytics = [];

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
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [dateRange, selectedPage, pages]);

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between sm:mx-4 sm:mr-20 xl:pr-6">
        <div className="flex items-center space-x-3">
          <BarChart2 className="h-8 w-8 text-indigo-500" />
          <h1 className="text-2xl font-bold text-text">آمار و تحلیل‌ها</h1>
        </div>

        {/* Filters */}
        <div className="flex gap-2 space-x-3">
          {/* Page Selector */}
          <div className="relative w-40">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-3 text-text focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <SelectValue placeholder="انتخاب صفحه" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-border bg-card text-text">
                <SelectItem value="all">همه صفحات</SelectItem>
                {pages.map((page) => (
                  <SelectItem key={page.uri} value={page.uri}>
                    {page.title || page.uri}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Selector - Disabled when no page is selected */}
          <div className="relative w-40">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <Select
              value={dateRange}
              onValueChange={setDateRange}
              disabled={!selectedPage}
            >
              <SelectTrigger className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-3 text-text focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <SelectValue placeholder="انتخاب بازه زمانی" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-border bg-card text-text">
                <SelectItem value="today">امروز</SelectItem>
                <SelectItem value="lastweek">هفته گذشته</SelectItem>
                <SelectItem value="lastmonth">ماه گذشته</SelectItem>
                <SelectItem value="last3month">۳ ماه گذشته</SelectItem>
                <SelectItem value="last6month">۶ ماه گذشته</SelectItem>
                <SelectItem value="lastyear">سال گذشته</SelectItem>
                <SelectItem value="all">همه زمان‌ها</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="sm:mx-4 sm:mr-20 xl:pr-6">
        {/* Stats Cards - Only shown when a page is selected */}
        {selectedPage ? (
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 shadow-lg">
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
            </div>

            <div className="rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 p-6 shadow-lg">
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
            </div>
          </div>
        ) : (
          <div className="mb-8 rounded-xl bg-card p-6 text-center shadow-lg">
            <p className="text-gray-400">لطفاً یک صفحه را انتخاب کنید</p>
          </div>
        )}

        {/* Analytics List */}
        <div className="rounded-xl bg-card p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-text">
            {selectedPage ? (
              <>
                جزئیات کلیک‌ها{" "}
                {selectedPage !== "all"
                  ? `برای ${pages.find((p) => p.uri === selectedPage)?.title || selectedPage}`
                  : ""}
              </>
            ) : (
              "برای مشاهده، لطفا صفحه را انتخاب کنید"
            )}
          </h2>

          {!selectedPage ? (
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border">
              <p className="text-gray-400">
                برای مشاهده، لطفا صفحه را انتخاب کنید
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2Icon className="h-10 w-10 animate-spin text-indigo-500" />
            </div>
          ) : analytics.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-300"
                    >
                      المان
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-300"
                    >
                      تاریخ
                    </th>
                    {selectedPage === "all" && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-300"
                      >
                        صفحه
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-card">
                  {analytics.map((click) => {
                    const clickDate = new Date(click.clickedAt);
                    const dateString = clickDate.toLocaleDateString("fa-IR");

                    return (
                      <tr key={click.id} className="hover:bg-gray-750">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-text">
                          {click.elementName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                          {dateString}
                        </td>
                        {selectedPage === "all" && (
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                            {pages.find((p) => p.uri === click.pageUri)
                              ?.title || click.pageUri}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border">
              <p className="text-gray-400">داده‌ای برای نمایش وجود ندارد</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
