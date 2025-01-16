"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import useEditor from "@/hooks/useEditor";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useModal from "@/hooks/useModal";

export function WorkspaceDynamicModal({
  children,
  title,
  trigger,
  mode,
  delay = 0,
}) {
  const { isWorkspaceMenuOpen, setIsWorkspaceMenuOpen } = useModal();
  const { setSelectedElement } = useEditor();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // mode: desktopDrawer, mobileDrawer, allDrawer, allDiolog

  const handleOpenChange = (isOpen) => {
    setIsWorkspaceMenuOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => setSelectedElement(null), delay); // Remove selected element when the menu closes
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

      <DrawerContent className="m-4 mb-0 bg-white text-right md:m-2 md:mx-auto md:max-w-[700px]">
        <DrawerHeader className="mt-2 text-right md:mt-4">
          <DrawerTitle className="text-center">{title}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
          {children}
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">بستن</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
