"use client";

import useEditor from "@/hooks/use-canvas";

const EditorPage = () => {
  const { elements, setElements } = useEditor();
  return <div>EditorPage</div>;
};

export default EditorPage;
