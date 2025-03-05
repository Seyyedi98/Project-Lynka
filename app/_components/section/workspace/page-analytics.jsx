import { getPageAnalytics } from "@/actions/page/analytics";
import { LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SimpleAnalytics from "../../analytics/simple-analytics";

const PageAnalytics = () => {
  const { uri } = useParams();
  const [list, setList] = useState([]);

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
    <div className="flex flex-col gap-2">
      {list.length > 0 ? (
        list.map((el, index) => {
          return <SimpleAnalytics key={`${el.elementId}-${index}`} data={el} />;
        })
      ) : (
        <div className="grid h-full place-content-center">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default PageAnalytics;
