"use client";

import { PageElements } from "../controller/page-elements";

const PreviewPageElements = ({ content }) => {
  return (
    <>
      {content.map((element) => {
        const PageElement = PageElements[element.type].PageComponent;

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
