"use client";

import { UpdatePageContent, UpdatePageTheme } from "@/actions/page";
import { toast } from "@/hooks/use-toast";
import useEditor from "@/hooks/useEditor";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useTransition } from "react";

const SavePageBtn = ({ uri, children }) => {
  const { elements, hero, theme } = useEditor();
  const [isPending, startTransition] = useTransition();

  const fullContent = [[hero], elements]; // Elements are already in array, hero need to wrapped in [] in order to convert to array

  const handleSave = () => {
    startTransition(async () => {
      try {
        const JSONElement = JSON.stringify(fullContent);
        const JSONTheme = JSON.stringify(theme);
        await UpdatePageContent(uri, JSONElement); // Call the server action
        await UpdatePageTheme(uri, JSONTheme);
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
      onClick={(e) => {
        handleSave();
        e.stopPropagation();
      }}
      className={cn(``, isPending && "pointer-events-none cursor-not-allowed")}
    >
      {isPending && <Loader className="animate-spin" />}
      {!isPending && children}
    </div>
  );
};

export default SavePageBtn;
