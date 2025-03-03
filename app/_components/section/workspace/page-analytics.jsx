import { getPageDataByUri } from "@/actions/page/page";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import SimpleAnalytics from "../../analytics/simple-analytics";

const PageAnalytics = () => {
  const { uri } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    const getPageData = async () => {
      const data = await getPageDataByUri(uri);
      const content = JSON.parse(data.content);

      content[1].map((element) => {
        if (element.extraAttributes.clicked) {
          //   console.log(element);
          setList((prev) => [
            ...prev,
            {
              id: element.extraAttributes.id,
              title: element.extraAttributes.title,
              clicked: element.extraAttributes.clicked,
            },
          ]);
        }
      });
    };
    getPageData();
  }, [uri]);

  return (
    <Suspense fallback={<p>loading...</p>}>
      <div className="flex flex-col gap-2">
        {list.map((el, index) => (
          <SimpleAnalytics key={`${el.id}-${index}`} data={el} />
        ))}
      </div>
    </Suspense>
  );
};

export default PageAnalytics;
