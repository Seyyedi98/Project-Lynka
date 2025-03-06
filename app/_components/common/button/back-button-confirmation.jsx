import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../modal/diolog";

const BackButtonWithConfirmation = ({ url, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
        {/* <ArrowLeft className="h-6 w-6 cursor-pointer text-white" /> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>بازگشت به صفحه اصلی</DialogTitle>
          <DialogDescription className="leading-6">
            تمامی عملیات ذخیره نشده اعمال نخواهند شد.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              بازگشت
            </Button>
          </DialogClose>
          <Button type="submit" className="px-4" variant="default" asChild>
            <Link className="hover:text-white" href={url}>
              تایید
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BackButtonWithConfirmation;
