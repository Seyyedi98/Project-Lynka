"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useEditor from "@/hooks/useEditor";
import { UpdatePageContent } from "@/actions/page";
import { cn } from "@/lib/utils";
import { Loader, Loader2Icon } from "lucide-react";
import { useTransition } from "react";

const SavePageBtn = ({ uri, children }) => {
  const { elements } = useEditor();
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      try {
        const JSONElement = JSON.stringify(elements);
        await UpdatePageContent(uri, JSONElement); // Call the server action
        toast({
          title: "عملیات موفقیت آمیز",
          description: "فرم با موفقت ذخیره شد",
        });
      } catch (error) {
        toast({
          title: "عملیات ناموفق",
          description: "هنگام ذخیره سازی خطایی رخ داد",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div
      onClick={() => {
        handleSave();
      }}
      className={cn(``, isPending && "pointer-events-none cursor-not-allowed")}
    >
      {isPending && <Loader className="animate-spin" />}
      {!isPending && children}
    </div>
  );
};

export default SavePageBtn;
