import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { idGenerator } from "@/lib/id-generator";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { LockIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BuyPremiumModal from "../../common/modal/buy-premium-modal";
import { PageElements } from "../../controller/page-elements-controller";

const AddElementButton = ({ pageElement, isPremium }) => {
  const { label, icon: Icon } = pageElement.ElementAdderBtn;
  const isElPremium = pageElement.isPremium;
  const canUserUseEl = isElPremium ? (isPremium ? true : false) : true;
  const [isbuyPremiumModalOpen, setBuyPremiumModalOpen] = useState(false);

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
        toast.success("بلوک جدید ایجاد شد");
        dispatch({ type: "page/addElement", payload });
      }}
      ref={isDesktop ? draggable.setNodeRef : null}
      className={cn(
        `relative flex h-14 w-full max-w-xs scale-95 cursor-grab items-center justify-between gap-2 overflow-hidden rounded-lg border border-border/20 bg-button px-4 text-foreground shadow-sm transition-all duration-300 hover:scale-100 hover:border-border/90`,
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
    <>
      <BuyPremiumModal
        isbuyPremiumModalOpen={isbuyPremiumModalOpen}
        setBuyPremiumModalOpen={setBuyPremiumModalOpen}
      >
        <p className="mb-1 mt-3 text-right text-sm leading-7 text-white sm:text-base">
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>دسترسی نامحدود به تمامی بلوک‌ها و ابزارهای حرفه‌ای</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>امکانات پیشرفته شخصی‌سازی برای طراحی منحصر به فرد</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>تم‌های اختصاصی و مدرن برای هر سلیقه‌ای</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>انتشار زمان‌بندی شده محتوا</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>رمزگذاری روی لینک‌ها</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>ده‌ها ویژگی ویژه و امکانات انحصاری</span>
          </span>
          همین امروز به جمع کاربران پریمیوم بپیوندید!
        </p>
      </BuyPremiumModal>
      <button
        onClick={() => setBuyPremiumModalOpen(true)}
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
    </>

    // <Dialog>
    //   <DialogTrigger asChild>
    //     <button
    //       className={cn(
    //         `relative flex h-14 w-full max-w-xs cursor-not-allowed items-center justify-between gap-2 overflow-hidden rounded-lg border border-border/20 bg-button px-4 text-foreground opacity-30 shadow-sm transition-all duration-300`,
    //       )}
    //     >
    //       <div className="flex items-center justify-center gap-2">
    //         <Icon className="h-5 w-5 cursor-grab text-3xl text-icon-light duration-200" />
    //         <p className="text-xs duration-200">{label}</p>
    //       </div>
    //       <span>
    //         <LockIcon />
    //       </span>
    //     </button>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[425px]">
    //     <DialogHeader>
    //       <DialogTitle>افزودن المنت جدید</DialogTitle>
    //       <DialogDescription>
    //         برای افزودن این المنت به صفحه‌تان، نیاز به اکانت پریمیوم دارید.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <div className="grid gap-4 py-4">
    //       <p className="text-sm">
    //         با ارتقاء به اکانت پریمیوم، می‌توانید المنت‌های نامحدود به صفحه‌تان
    //         اضافه کنید و از ویژگی‌های پیشرفته‌تر استفاده کنید.
    //       </p>
    //     </div>
    //     <DialogFooter>
    //       <Button onClick={() => redirectToPremiumPage()}>
    //         ارتقاء به پریمیوم
    //       </Button>
    //       <Button variant="outline" onClick={() => closeDialog()}>
    //         بستن
    //       </Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
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
