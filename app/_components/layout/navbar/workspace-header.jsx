import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../common/modal/diolog";
import PreviewPageElements from "../../preview/preview-elements-rendere";

const WorkspaceHeader = () => {
  return (
    <header className="flex h-14 items-center justify-between bg-primary-500 px-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="px-2 duration-200" asChild>
            <p>پیش نمایش</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0 px-4">
          <DialogTitle>پیش نمایش</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex h-full w-full items-center justify-center">
            <section className="flex h-full w-3/4 max-w-[400px] flex-col items-center justify-center gap-4">
              <PreviewPageElements />
            </section>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <ArrowLeft className="h-6 w-6 cursor-pointer text-white" />
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
              <Button type="button" variant="secondary">
                بازگشت
              </Button>
            </DialogClose>
            <Button type="submit" className="px-4" variant="primary" asChild>
              <Link href="/dashboard">تایید</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default WorkspaceHeader;
