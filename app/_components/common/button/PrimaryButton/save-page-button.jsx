"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useEditor from "@/hooks/useEditor";
import { UpdatePageContent } from "@/lib/page/page-data";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";

const SavePageBtn = ({ uri }) => {
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
    <Button
      variant="outline"
      className="gap-2"
      disabled={isPending}
      onClick={handleSave}
    >
      ذخیره
      {isPending && <Loader2Icon className="animate-spin" />}
    </Button>
  );
};

export default SavePageBtn;
