// components/share-button.js
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../modal/diolog";

export function ShareButton({ url, children, inDropdown = false, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("لینک صفحه با موفقیت کپی شد");
  };

  const shareOnSocial = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center"></DialogTitle>
          </DialogHeader>

          <h4 className="mt-8 text-center text-lg text-text">اشتراک گذاری</h4>
          <div className="mx-3 mb-4 flex items-center gap-1 space-x-2">
            <Button
              type="button"
              size="md"
              className="mr-1"
              onClick={copyToClipboard}
            >
              <span className="sr-only">کپی</span>
              کپی
            </Button>
            <div className="grid flex-1 gap-2">
              <Input value={url} readOnly className="text-center" />
            </div>
          </div>

          {/* <div className="flex justify-center gap-4 py-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => shareOnSocial("facebook")}
            >
              <IconBrandFacebook className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => shareOnSocial("twitter")}
            >
              <IconBrandTwitter className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => shareOnSocial("linkedin")}
            >
              <IconBrandLinkedin className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => shareOnSocial("whatsapp")}
            >
              <IconBrandWhatsapp className="h-6 w-6" />
            </Button>
          </div> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
