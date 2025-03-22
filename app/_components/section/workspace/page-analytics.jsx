import { getLinkAnalytics, getPageAnalytics } from "@/actions/page/analytics";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SimpleAnalytics from "../../analytics/simple-analytics";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { getUserPageData } from "@/actions/page/page";

const PageAnalytics = () => {
  const { uri } = useParams();
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalViews, setTotalViews] = useState(0);
  const { isSilver } = useUserSubscription();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      const allPages = await getUserPageData();
      setTotalViews(allPages.reduce((sum, item) => sum + item.views, 0));
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
    <div className="h-full">
      <div>Total Views: {totalViews}</div>
      {isSilver ? (
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
      ) : (
        <div className="grid h-full place-content-center">
          <p className="mt-4 text-center text-sm text-destructive">
            برای استفاده ای این قابلیت به اشتراک ویژه نیاز دارید
          </p>
        </div>
      )}
    </div>
  );
};

export default PageAnalytics;
