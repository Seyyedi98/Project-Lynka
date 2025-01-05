"use client";

// TODO: Replace this page with [id] => page

import PageBuilder from "@/app/_components/editor/page-builder";
import useEditor from "@/hooks/useCanvas";

const EditorPage = () => {
  const { elements, setElements } = useEditor();

  return <PageBuilder />;
};

export default EditorPage;
