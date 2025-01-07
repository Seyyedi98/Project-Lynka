"use client";

// TODO: Replace this page with [id] => page

import PageBuilder from "@/app/_components/editor/builder/page-builder";
import useEditor from "@/hooks/useEditor";

const EditorPage = () => {
  const { elements, setElements } = useEditor();

  return <PageBuilder />;
};

export default EditorPage;
