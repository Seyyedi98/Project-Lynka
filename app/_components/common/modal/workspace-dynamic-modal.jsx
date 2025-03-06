"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/_components/common/modal/drawer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { isSpecificModalOpen } from "@/store/modalSlice";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";

export function WorkspaceDynamicModal({
  children,
  title,
  trigger,
  mode,
  delay = 0,
  modalId, // Unique identifier for this modal
}) {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isModalOpen = useSelector(isSpecificModalOpen(modalId));

  const handleOpenChange = (isOpen) => {
    dispatch({ type: "modal/setMenuOpen", payload: { modalId, isOpen } });
    if (!isOpen) {
      setTimeout(
        () => dispatch({ type: "page/setSelectedElement", payload: null }),
        delay,
      );
    }
  };

  // Render the appropriate component based on the mode
  if (mode === "desktopDrawer") {
    if (isDesktop) {
      return (
        <DrawerComponent
          open={isModalOpen}
          onOpenChange={handleOpenChange}
          trigger={trigger}
          title={title}
        >
          {children}
        </DrawerComponent>
      );
    } else {
      return (
        <DiologComponent
          open={isModalOpen}
          onOpenChange={handleOpenChange}
          trigger={trigger}
          title={title}
        >
          {children}
        </DiologComponent>
      );
    }
  }

  if (mode === "mobileDrawer") {
    if (!isDesktop) {
      return (
        <DrawerComponent
          open={isModalOpen}
          onOpenChange={handleOpenChange}
          trigger={trigger}
          title={title}
        >
          {children}
        </DrawerComponent>
      );
    } else {
      return (
        <DiologComponent
          open={isModalOpen}
          onOpenChange={handleOpenChange}
          trigger={trigger}
          title={title}
        >
          {children}
        </DiologComponent>
      );
    }
  }

  if (mode === "allDrawer") {
    return (
      <DrawerComponent
        open={isModalOpen}
        onOpenChange={handleOpenChange}
        trigger={trigger}
        title={title}
      >
        {children}
      </DrawerComponent>
    );
  }

  if (mode === "allDiolog") {
    return (
      <DiologComponent
        open={isModalOpen}
        onOpenChange={handleOpenChange}
        trigger={trigger}
        title={title}
      >
        {children}
      </DiologComponent>
    );
  }
}

const DiologComponent = function ({
  children,
  title,
  open,
  onOpenChange,
  trigger,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="text-right sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const DrawerComponent = function ({
  children,
  title,
  open,
  onOpenChange,
  trigger,
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {typeof trigger === "function" ? (
        trigger()
      ) : (
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      )}

      <DrawerContent className="mb-0 text-right md:m-2 md:mx-auto md:w-full">
        <div className="mx-auto max-h-[96svh] w-full max-w-sm overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="mt-4 text-center">{title}</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-0 md:px-0">
            <div className="h-full w-full">{children}</div>
          </div>
          <DrawerFooter className="">
            <DrawerClose asChild>
              <Button className="" variant="primary">
                بازگشت
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
