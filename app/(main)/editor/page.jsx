"use client";

import { EditorDialog } from "@/app/_components/common/shared/editor-dialog";
import Editor from "@/app/_components/editor/editor";
import EditorSidebar from "@/app/_components/navbar/editor-sidebar";
import { Button } from "@/components/ui/button";
import useEditor from "@/hooks/useCanvas";

const EditorPage = () => {
  const { elements, setElements } = useEditor();

  return (
    <div className="flex h-full w-full pt-3 md:pt-20">
      <EditorSidebar />
      <Editor />
    </div>
  );
};

export default EditorPage;
