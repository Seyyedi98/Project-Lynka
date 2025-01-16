import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import { ArrowLeft } from "lucide-react";

const WorkspaceHeader = () => {
  const params = useParams();
  return (
    <header className="flex h-14 items-center justify-between bg-primary-500 px-4">
      <Button variant="secondary" className="px-2 duration-200" asChild>
        <Link href={`/preview/${params.uri}`}>پیش نمایش</Link>
      </Button>

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
