"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, PlusIcon } from "lucide-react";
import { useState } from "react";
import CreateNewPage from "../form/create-new-page";

const CreatePageButton = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(true)}
        variant="secondary"
        className={cn(
          `bg-primary-500 hover:bg-primary-600 z-40 flex h-[36px] w-[154px] cursor-pointer items-center justify-center gap-1 rounded-md text-center text-primary transition-all duration-500`,
        )}
      >
        {children}
      </div>

      <div
        className={cn(
          `fixed right-20 top-2 z-[-1] h-[36px] w-[154px] rounded-md transition-all duration-500`,
          isOpen && "right-0 top-0 z-40 h-screen w-screen",
        )}
      >
        <div>
          <div
            type="submit"
            variant="primary"
            onClick={() => setIsOpen(false)}
            className={cn(
              `absolute left-4 top-4 z-40 mr-2 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-slate-200 opacity-0 duration-200 hover:bg-slate-300 lg:mr-6 lg:h-12 lg:w-12`,
              isOpen && "opacity-100",
            )}
          >
            <span>
              <ChevronLeft className="h-7 w-7 text-slate-600" />
            </span>
          </div>
          <div
            className={cn(`opacity-0 duration-500`, isOpen && "opacity-100")}
          >
            <CreateNewPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePageButton;
