import { Suspense } from "react";
import { PageElements } from "../controller/page-elements-controller";
import { getSubscriptionByUri } from "@/lib/auth/user-subscription";

const LivePageElements = async ({ content, uri }) => {
  const { isSilver } = getSubscriptionByUri(uri);

  const elements = await Promise.all(
    content.map(async (element) => {
      const PageElement = PageElements[element?.type]?.LivePageComponent;

      if (PageElement) {
        return (
          <PageElement
            isSilver={isSilver}
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
