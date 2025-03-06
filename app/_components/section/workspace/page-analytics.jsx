import { getPageAnalytics } from "@/actions/page/analytics";
import { LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SimpleAnalytics from "../../analytics/simple-analytics";
import { useUserSubscription } from "@/hooks/useUserSubscription";

const PageAnalytics = () => {
  const { uri } = useParams();
  const [list, setList] = useState([]);
  const { isSilver } = useUserSubscription();

  useEffect(() => {
    const getPageData = async () => {
      const data = await getPageAnalytics(uri);
      data.map((element) => {
        setList((prev) => [
          ...prev,
          {
            elementId: element.elementId,
            title: element.linkName,
            clicked: element.clicks,
            device: JSON.parse(element.userAgent).device,
            os: JSON.parse(element.userAgent).os,
          },
        ]);
      });
    };
    getPageData();
  }, [uri]);

  return (
    <div className="h-full">
      {isSilver ? (
        <div className="flex flex-col gap-2">
          {list.length > 0 ? (
            list.map((el, index) => {
              return (
                <SimpleAnalytics key={`${el.elementId}-${index}`} data={el} />
              );
            })
          ) : (
            <div className="grid h-full place-content-center">
              <LoaderIcon className="animate-spin" />
            </div>
          )}
        </div>
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
