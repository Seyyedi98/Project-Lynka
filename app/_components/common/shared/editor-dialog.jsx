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
} from "@/components/ui/drawer";
import useEditor from "@/hooks/useEditor";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useModal from "@/hooks/useModal";

export function EditorDialog({ children, title, trigger }) {
  const { isWorkspaceMenuOpen, setIsWorkspaceMenuOpen } = useModal();
  const { selectedElement, setSelectedElement } = useEditor();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (isOpen) => {
    setIsWorkspaceMenuOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => setSelectedElement(null), 400); // Remove selected element when the menu closes
      //  Added 400ms timeout, prevent immediate change from properties to adder menu shifting
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={isWorkspaceMenuOpen} onOpenChange={handleOpenChange}>
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
  }

  return (
    <Drawer open={isWorkspaceMenuOpen} onOpenChange={handleOpenChange}>
      {typeof trigger === "function" ? (
        trigger()
      ) : (
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      )}

      <DrawerContent className="m-2 mb-0 bg-white">
        <DrawerHeader className="text-right">
          <DrawerTitle>{title}</DrawerTitle>
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
}
