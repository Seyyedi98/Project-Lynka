"use client";

import { shallowEqual, useSelector } from "react-redux";
import { PageElements } from "../controller/page-elements-controller";
import { useUserSubscription } from "@/hooks/useUserSubscription";

const PreviewPageElements = () => {
  const elements = useSelector((state) => state.page.elements, shallowEqual);
  const { isPremium } = useUserSubscription();

  return (
    <>
      {elements.map((element) => {
        const PageElement = PageElements[element?.type]?.PreviewPageComponent;

        return (
          <PageElement
            key={element.id}
            elementInstance={element}
            isPremium={isPremium}
            // defaultValue={formValues.current[element.id]}
          />
        );
      })}
    </>
  );
};

export default PreviewPageElements;
