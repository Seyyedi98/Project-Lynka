import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { idGenerator } from "@/lib/id-generator";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { LockIcon, PlusIcon } from "lucide-react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PageElements } from "../../controller/page-elements-controller";

const AddElementButton = ({ pageElement }) => {
  const { label, icon: Icon } = pageElement.ElementAdderBtn;
  const isElPremium = pageElement.isPremium;
  const { isSilver } = useUserSubscription();
  const canUserUseEl = isElPremium ? (isSilver ? true : false) : true;

  const dispatch = useDispatch();
  const elements = useSelector((state) => state.page.elements, shallowEqual);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const draggable = useDraggable({
    id: `adder-btn-${pageElement.type}`,
    data: {
      type: pageElement.type,
      isAdderBtn: true,
    },
  });

  return canUserUseEl ? (
    <button
      onClick={() => {
        dispatch({ type: "modal/closeMenu" });
        const type = pageElement.type;
        const newElement = PageElements[type].construct(idGenerator());
        const applyPageTheme = true;

        const payload = {
          index: elements.length,
          element: newElement,
          applyPageTheme,
        };
        toast({
          description: "بلوک جدید ایجاد شد",
        });
        dispatch({ type: "page/addElement", payload });
      }}
      ref={isDesktop ? draggable.setNodeRef : null}
      className={cn(
        `relative flex h-14 w-full max-w-xs cursor-grab items-center justify-between gap-2 overflow-hidden rounded-lg border border-border/20 bg-button px-4 text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:border-border/90`,
        draggable.isDragging && "ring-2 ring-primary",
      )}
      {...(isDesktop ? draggable.listeners : {})}
      {...(isDesktop ? draggable.attributes : {})}
    >
      <div className="flex items-center justify-center gap-2">
        <Icon className="h-5 w-5 cursor-grab text-3xl text-icon-light duration-200" />
        <p className="text-xs duration-200">{label}</p>
      </div>
      <span>
        <PlusIcon />
      </span>
    </button>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            `relative flex h-14 w-full max-w-xs cursor-not-allowed items-center justify-between gap-2 overflow-hidden rounded-lg border border-border/20 bg-button px-4 text-foreground opacity-30 shadow-sm transition-all duration-300`,
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <Icon className="h-5 w-5 cursor-grab text-3xl text-icon-light duration-200" />
            <p className="text-xs duration-200">{label}</p>
          </div>
          <span>
            <LockIcon />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>افزودن المنت جدید</DialogTitle>
          <DialogDescription>
            برای افزودن این المنت به صفحه‌تان، نیاز به اکانت پریمیوم دارید.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm">
            با ارتقاء به اکانت پریمیوم، می‌توانید المنت‌های نامحدود به صفحه‌تان
            اضافه کنید و از ویژگی‌های پیشرفته‌تر استفاده کنید.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => redirectToPremiumPage()}>
            ارتقاء به پریمیوم
          </Button>
          <Button variant="outline" onClick={() => closeDialog()}>
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const AdderBtnDragOverly = ({ pageElement }) => {
  const { label, icon: Icon } = pageElement.ElementAdderBtn;

  return (
    <Button
      className="flex h-14 w-4/5 cursor-grab gap-2 rounded-md border border-dashed border-black bg-secondaryBg transition-all duration-300"
      variant="outline"
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default AddElementButton;
