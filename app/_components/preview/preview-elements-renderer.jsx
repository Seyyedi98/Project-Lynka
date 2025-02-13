"use client";

import { useSelector } from "react-redux";
import { PageElements } from "../controller/page-elements-controller";

const PreviewPageElements = () => {
  const elements = useSelector((state) => state.page.elements);

  return (
    <>
      {elements.map((element) => {
        const PageElement = PageElements[element?.type]?.LivePageComponent;

        return (
          <PageElement
            key={element.id}
            elementInstance={element}
            // defaultValue={formValues.current[element.id]}
          />
        );
      })}
    </>
  );
};

export default PreviewPageElements;
