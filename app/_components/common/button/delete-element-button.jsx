import { Button } from "@/components/ui/button";
import useEditor from "@/hooks/useEditor";
import useModal from "@/hooks/useModal";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
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

const DeleteElementBtn = ({ id, children }) => {
  const { removeElement, setSelectedElement } = useEditor();
  const { closeMenu } = useModal();
  const [isPending, startTransition] = useTransition();

  const onDelete = (id) => {
    startTransition(() => {
      removeElement(id);

      closeMenu();
      setTimeout(() => setSelectedElement(null), 200);
    });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>حذف </DialogTitle>
            <DialogDescription className="leading-6">
              با حذف این آیتم، تمامی اطلاعات مرتبط با آن نیز حذف خواهد شد. آیا
              اطمینان دارید؟
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                بازگشت
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              onClick={() => onDelete(id)}
              type="submit"
              className="px-4"
              variant="destructive"
            >
              {isPending ? <Loader2Icon /> : "تایید"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteElementBtn;
