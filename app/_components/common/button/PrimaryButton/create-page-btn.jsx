import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";

const CreatePageBtn = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex h-8 items-center justify-center rounded-sm bg-brand-600/90 px-3 text-xs text-white hover:bg-brand-600">
          ساخت صفحه جدید
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> ساخت صفحه جدید</DialogTitle>
          <DialogDescription>desc</DialogDescription>
        </DialogHeader>
        <div>Content</div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePageBtn;
