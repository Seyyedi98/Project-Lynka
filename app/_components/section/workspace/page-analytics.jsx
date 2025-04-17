import { getPageAnalytics } from "@/actions/page/analytics";
import { getUserPageData } from "@/actions/page/page";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const PageAnalytics = () => {
  const [isPending, startTransition] = useTransition();
  const [pageViews, setPageViews] = useState("");
  const { isPremium } = useUserSubscription();
  const { uri } = useParams();

  useEffect(() => {
    startTransition(() => {
      getUserPageData().then((data) => {
        const pageData = data.find((item) => item.uri === uri);
        setPageViews(pageData?.views || 0);
      });
    });
  }, [uri]);

  return (
    <div className="h-full w-full">
      <div className="mb-6 flex items-center gap-1 py-4 text-lg">
        <span>تعداد کل بازدید های این صفحه:</span>{" "}
        {isPending ? <Loader2Icon className="animate-spin" /> : pageViews}
      </div>
      {isPremium ? (
        <Link
          target="_blank"
          href="/dashboard/analytics"
          className="flex h-12 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          مشاهده آمار لینک ها
        </Link>
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
