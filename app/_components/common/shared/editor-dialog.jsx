"use client";

import * as React from "react";

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
import useModal from "@/hooks/useModal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function EditorDialog({ children, title, trigger }) {
  const { isWorkspaceMenuOpen, setIsWorkspaceMenuOpen } = useModal();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isWorkspaceMenuOpen} onOpenChange={setIsWorkspaceMenuOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="text-right sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>Hi</DialogDescription>
            {children}
          </DialogHeader>
          {/* <ProfileForm /> */}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isWorkspaceMenuOpen} onOpenChange={setIsWorkspaceMenuOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="m-2 mb-0 bg-white">
        <DrawerHeader className="text-right">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>Hi</DrawerDescription>
          {children}
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">بستن</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }) {
  return <div>Content</div>;
}
