import { ArrowLeft, Loader2 as Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../modal/diolog";
import { useState } from "react";

const BackButtonWithConfirmation = ({ url, children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <button className="group flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            بازگشت
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="rounded-lg border bg-background p-6 shadow-lg sm:max-w-md">
        <DialogHeader>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900/30">
              <ArrowLeft className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            </div>
            <DialogTitle className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
              آیا از ترک این صفحه مطمئن هستید؟
            </DialogTitle>
          </div>
          <DialogDescription className="pl-11 text-sm text-gray-500 dark:text-gray-400">
            در صورت ترک صفحه، تغییرات ذخیره نشده شما از بین خواهند رفت.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end gap-3">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              ماندن در صفحه
            </Button>
          </DialogClose>
          <Button
            asChild
            type="submit"
            variant="destructive"
            className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
            onClick={() => setLoading(true)}
          >
            <Link
              href={url}
              className="flex min-w-[80px] items-center justify-center gap-1 no-underline hover:text-white hover:no-underline"
            >
              {loading ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>ترک صفحه</span>
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BackButtonWithConfirmation;
