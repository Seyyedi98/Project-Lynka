import { Suspense } from "react";
import { PageElements } from "../controller/page-elements-controller";

const LivePageElements = async ({ content, uri }) => {
  const elements = await Promise.all(
    content.map(async (element) => {
      const PageElement = PageElements[element?.type]?.LivePageComponent;

      if (PageElement) {
        return (
          <PageElement
            uri={uri}
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
