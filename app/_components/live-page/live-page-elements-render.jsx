"use client";

import { PageElements } from "../controller/page-elements";

const LivePageElements = ({ content }) => {
  return (
    <>
      {content.map((element) => {
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

export default LivePageElements;
