"use client";

import useEditor from "@/hooks/useEditor";
import { PageElements } from "../controller/page-elements";
import { PageHeroElement } from "../elements/hero/page-hero-element";

const PreviewPageElements = () => {
  const { elements } = useEditor();

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
