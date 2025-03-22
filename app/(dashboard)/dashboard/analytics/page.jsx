"use client";

import { getLinkAnalytics, getPageAnalytics } from "@/actions/page/analytics";
import { getUserPageData } from "@/actions/page/page";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const AnalyticsPanel = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const allPages = await getUserPageData();
      const allAnalytics = [];

      for (const page of allPages) {
        const data = await getLinkAnalytics(page.uri);
        allAnalytics.push(...data);
      }

      setAnalytics(allAnalytics);
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h1>Link Analytics</h1>
      <ul>
        {analytics.length > 1 ? (
          analytics.map((click) => (
            <li key={click.id}>
              {click.elementId} - {new Date(click.clickedAt).toLocaleString()}
            </li>
          ))
        ) : (
          <div>
            <Loader2Icon className="animate-spin" />
          </div>
        )}
      </ul>
    </div>
  );
};

export default AnalyticsPanel;
