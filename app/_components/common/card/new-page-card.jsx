"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PreviewPageElements from "../../preview/preview-elements-rendere";
import CreateNewPage from "../form/create-new-page";

const CreatePageButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="px-2 duration-200" asChild>
          <p>پیش نمایش</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen max-h-screen max-w-full flex-grow flex-col gap-0 p-0 px-4">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="flex h-full items-center justify-center">
          <section className="flex h-full w-3/4 max-w-[400px] flex-col items-center justify-center gap-4">
            <CreateNewPage />
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePageButton;
