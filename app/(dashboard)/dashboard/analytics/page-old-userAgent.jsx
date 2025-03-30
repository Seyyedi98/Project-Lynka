"use client";

import { getLinkAnalytics, getPageAnalytics } from "@/actions/page/analytics";
import { getUserPageData } from "@/actions/page/page";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const AnalyticsPanel = () => {
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isSilver } = useUserSubscription();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      const allPages = await getUserPageData();
      const allAnalytics = [];

      for (const page of allPages) {
        const data = await getLinkAnalytics(page.uri);
        allAnalytics.push(...data);
      }

      setAnalytics(allAnalytics);
      setIsLoading(false);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="relative flex w-full select-none pb-10">
      <h2 className="absolute right-4 top-40 pr-0 text-3xl text-white sm:mr-56 md:pr-3">
        آمار
      </h2>
      <main className="grid w-full flex-1 auto-rows-auto grid-cols-2 gap-4 px-2 pt-60 sm:mr-56 md:mx-4 xl:pr-6">
        <h1>Link Analytics</h1>
        <ul>
          {analytics.length > 1 ? (
            analytics.map((click) => {
              return (
                <li key={click.id}>
                  {click.elementName} -{" "}
                  {new Date(click.clickedAt).toLocaleString()}
                </li>
              );
            })
          ) : !isLoading && analytics.length === 0 ? (
            <div>no data</div>
          ) : (
            <div>
              <Loader2Icon className="animate-spin" />
            </div>
          )}
        </ul>
      </main>
    </div>
  );
};

export default AnalyticsPanel;
