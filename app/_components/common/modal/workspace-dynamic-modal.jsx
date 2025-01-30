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
import useModal from "@/hooks/useModal";
import { useDispatch } from "react-redux";

export function WorkspaceDynamicModal({
  children,
  title,
  trigger,
  mode,
  delay = 0,
}) {
  const { isWorkspaceMenuOpen, setIsWorkspaceMenuOpen } = useModal();
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // mode: desktopDrawer, mobileDrawer, allDrawer, allDiolog

  const handleOpenChange = (isOpen) => {
    setIsWorkspaceMenuOpen(isOpen);
    if (!isOpen) {
      setTimeout(
        () => dispatch({ type: "page/setSelectedElement", payload: null }),
        delay,
      ); // Remove selected element when the menu closes
      //  Added 400ms timeout, prevent immediate change from properties to adder menu shifting
    }
  };

  // desktopDrawer
  if (mode === "desktopDrawer") {
    if (isDesktop) {
      return (
        <DrawerComponent
          open={isWorkspaceMenuOpen}
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
          open={isWorkspaceMenuOpen}
          onOpenChange={handleOpenChange}
          trigger={trigger}
          title={title}
        >
          {children}
        </DiologComponent>
      );
    }
  }

  // mobileDrawer
  if (mode === "mobileDrawer") {
    if (!isDesktop) {
      return (
        <DrawerComponent
          open={isWorkspaceMenuOpen}
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
          open={isWorkspaceMenuOpen}
          onOpenChange={handleOpenChange}
          trigger={trigger}
          title={title}
        >
          {children}
        </DiologComponent>
      );
    }
  }

  // allDrawer
  if (mode === "allDrawer") {
    return (
      <DrawerComponent
        open={isWorkspaceMenuOpen}
        onOpenChange={handleOpenChange}
        trigger={trigger}
        title={title}
      >
        {children}
      </DrawerComponent>
    );
  }

  // allDiolog
  if (mode === "allDiolog") {
    return (
      <DiologComponent
        open={isWorkspaceMenuOpen}
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
          {/* <DialogTitle>{title}</DialogTitle> */}
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

      <DrawerContent className="mb-0 bg-white text-right md:m-2 md:mx-auto md:w-full">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="mt-4 text-center">{title}</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="p-2 pb-0">
            <div className="h-full w-full">{children}</div>
          </div>
          <DrawerFooter className="">
            <DrawerClose asChild>
              <Button variant="outline w-full">لفو تغییرات</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
