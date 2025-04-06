"use client";

import { getLinkAnalytics } from "@/actions/page/analytics";
import { getUserPageData } from "@/actions/page/page";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import {
  Loader2Icon,
  Calendar,
  BarChart2,
  MousePointerClick,
} from "lucide-react";
import { useEffect, useState } from "react";

const AnalyticsPanel = () => {
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  const { isPremium } = useUserSubscription();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      const allPages = await getUserPageData();
      const allAnalytics = [];

      for (const page of allPages) {
        const data = await getLinkAnalytics(page.uri, dateRange);
        allAnalytics.push(...data);
      }

      setAnalytics(allAnalytics);
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [dateRange]);

  // const uniqueVisitors = new Set(analytics.map((item) => item.ipAddress)).size;

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between sm:mx-4 sm:mr-20 xl:pr-6">
        <div className="flex items-center space-x-3">
          <BarChart2 className="h-8 w-8 text-indigo-500" />
          <h1 className="text-2xl font-bold text-white">آمار و تحلیل‌ها</h1>
        </div>

        {/* Date Range Selector */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center pl-3">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="today">امروز</option>
            <option value="lastweek">هفته گذشته</option>
            <option value="lastmonth">ماه گذشته</option>
            <option value="last3month">۳ ماه گذشته</option>
            <option value="last6month">۶ ماه گذشته</option>
            <option value="lastyear">سال گذشته</option>
            <option value="all">همه زمان‌ها</option>
          </select>
        </div>
      </div>

      <div className="sm:mx-4 sm:mr-20 xl:pr-6">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          {/* <div className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-100">
                  بازدیدکنندگان منحصر به فرد
                </p>
                <p className="mt-1 text-3xl font-semibold text-white">
                  {uniqueVisitors}
                </p>
              </div>
              <svg
                className="h-8 w-8 text-purple-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div> */}

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

        {/* Analytics List */}
        <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-white">
            جزئیات کلیک‌ها
          </h2>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2Icon className="h-10 w-10 animate-spin text-indigo-500" />
            </div>
          ) : analytics.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-700">
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-300"
                    >
                      ساعت
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-300"
                    >
                      آی‌پی
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                  {analytics.map((click) => {
                    const clickDate = new Date(click.clickedAt);
                    const dateString = clickDate.toLocaleDateString("fa-IR");
                    const timeString = clickDate.toLocaleTimeString("fa-IR");

                    return (
                      <tr key={click.id} className="hover:bg-gray-750">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                          {click.elementName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                          {dateString}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                          {timeString}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                          {click.ipAddress}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-700">
              <p className="text-gray-400">داده‌ای برای نمایش وجود ندارد</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
