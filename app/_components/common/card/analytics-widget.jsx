"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsWidget = ({ pages, elementsAnalytics }) => {
  let pagesList = [];
  pages.map((page) => {
    pagesList.push(page.uri);
  });

  const [list, setList] = useState([]);
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
        <div className="mt-1 flex h-full flex-col gap-4 p-3">
          {filteredElements.map((data, index) => {
            const linkData = {
              name: data.linkName,
              value: data.clicks,
              device: JSON.parse(data.userAgent).device,
              os: JSON.parse(data.userAgent).os,
            };

            return (
              <div key={index}>
                <div>{linkData.name}</div>
                <div className="flex gap-2">
                  {Object.entries(linkData.device).map(([key, value]) => (
                    <p key={key} className="first:mt-2">
                      {key}: {value}
                    </p>
                  ))}
                </div>
              </div>
            );
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
