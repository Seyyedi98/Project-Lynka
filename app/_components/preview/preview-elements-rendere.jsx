"use client";

import useEditor from "@/hooks/useEditor";
import { PageElements } from "../controller/page-elements";

const PreviewPageElements = () => {
  const { elements } = useEditor();

  return (
    <>
      {elements.map((element) => {
        const PageElement = PageElements[element?.type]?.PageComponent;

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
