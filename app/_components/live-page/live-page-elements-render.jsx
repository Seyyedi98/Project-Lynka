// "use client";

import { Suspense } from "react";

const PageElements = dynamic(() => import("../controller/page-elements"));

const LivePageElements = async ({ content }) => {
  const elements = await Promise.all(
    content.map(async (element) => {
      const PageElement = PageElements[element?.type]?.LivePageComponent;

      if (PageElement) {
        return (
          <PageElement
            key={element.id}
            elementInstance={element}
            // defaultValue={formValues.current[element.id]}
          />
        );
      }
      return null;
    }),
  );

  return <Suspense fallback={<p>Loading...</p>}>{elements}</Suspense>;
};

export default LivePageElements;
