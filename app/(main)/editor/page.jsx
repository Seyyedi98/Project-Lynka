"use client";

import { EditorDialog } from "@/app/_components/common/shared/editor-dialog";
import { Button } from "@/components/ui/button";
import useEditor from "@/hooks/useCanvas";

const EditorPage = () => {
  const { elements, setElements } = useEditor();

  return (
    <div>
      EditorPage
      <div>
        <EditorDialog>
          <Button variant="outline">Edit Profile</Button>
        </EditorDialog>
      </div>
    </div>
  );
};

export default EditorPage;
