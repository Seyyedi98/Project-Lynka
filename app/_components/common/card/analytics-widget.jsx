"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

const AnalyticsWidget = ({ pages, elementsAnalytics }) => {
  let pagesList = [];
  pages.map((page) => {
    pagesList.push(page.uri);
  });

  const [selectedPage, setSelectedPage] = useState(pagesList[0] || "");

  const flattenedData = elementsAnalytics.flat();
  const filteredElements = flattenedData.filter(
    (element) => element.pageUri === selectedPage,
  );

  return (
    <div className="h-full w-full py-2">
      <div className="flex items-center justify-center gap-2">
        {selectedPage
          ? pagesList.map((page, index) => {
              return (
                <p
                  key={index}
                  onClick={() => setSelectedPage(page)}
                  className={cn(
                    `cursor-pointer rounded-md bg-primary/70 p-1 px-2 font-thin text-white transition-colors duration-200 first:mt-2 hover:bg-primary-hover hover:shadow-md`,
                    page === selectedPage && "bg-primary-hover",
                  )}
                >
                  {page}
                </p>
              );
            })
          : null}
      </div>

      {selectedPage ? (
        <div className="mt-1 h-full p-3">
          {filteredElements.map((data, index) => {
            return <div key={index}>{data.linkName}</div>;
          })}
        </div>
      ) : (
        <p className="grid h-full w-full place-content-center">
          آماری جهت نمایش وجود ندارد
        </p>
      )}
    </div>
  );
};

export default AnalyticsWidget;
