"use client";

import { UpdatePageContent, UpdatePageTheme } from "@/actions/page";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useSelector } from "react-redux";

const SavePageBtn = ({ children }) => {
  const elements = useSelector((store) => store.page.elements);
  const hero = useSelector((store) => store.page.hero);
  const theme = useSelector((store) => store.page.theme);
  const [isPending, startTransition] = useTransition();

  const { uri } = useParams();

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
      className={cn(
        ``,
        isPending && "pointer-events-none cursor-not-allowed text-white",
      )}
    >
      {isPending && (
        <div className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-20 px-4 text-sm">
          <Loader className="animate-spin" />
        </div>
      )}
      {!isPending && children}
    </div>
  );
};

export default SavePageBtn;
