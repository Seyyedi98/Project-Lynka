import { useUserSubscription } from "@/hooks/useUserSubscription";
import Link from "next/link";

const PageAnalytics = () => {
  const { isPremium } = useUserSubscription();

  return (
    <div className="h-full w-full">
      {isPremium ? (
        <Link
          target="_blank"
          href="/dashboard/analytics"
          className="flex h-12 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          مشاهده آمار صفحه
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
