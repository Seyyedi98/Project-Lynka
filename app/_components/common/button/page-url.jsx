import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, QrCode, Share2, ShareIcon, ViewIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import PageQrCodeGenerator from "../../section/workspace/page-qrcode-generator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../modal/diolog";
import { ShareButton } from "./share-button";

const PageUrl = () => {
  const { uri } = useParams();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${uri}`;

  return (
    <>
      {/* QR Code Modal */}
      <Dialog
        open={isQrModalOpen}
        onOpenChange={(state) => setIsQrModalOpen(state)}
      >
        <DialogContent className="flex h-screen max-h-svh w-screen max-w-full flex-grow flex-col gap-0 overflow-y-scroll p-0">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <PageQrCodeGenerator />
        </DialogContent>
      </Dialog>

      <DropdownMenu
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        dir="rtl"
      >
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center gap-2">
            <div className="relative flex h-10 w-full items-center justify-center rounded-full bg-black bg-opacity-20 px-4 text-white">
              <ChevronDown className="flex h-5 w-5" />
              <span className="text-sm">lynka.ir/{uri}</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center justify-center">
            <div>اشتراک گذاری</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <ShareButton
              url={pageUrl}
              className="w-full justify-start hover:bg-transparent"
              inDropdown={true}
            >
              <div className="flex h-12 w-full cursor-pointer items-center rounded-md px-2 transition-colors duration-150 hover:bg-accent/30 hover:backdrop-blur-sm">
                <Share2 className="h-4 w-4" />
                <div className="w-40 p-2">اشتراک گذاری صفحه</div>
              </div>
            </ShareButton>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => window.open(pageUrl, "_blank")}>
            <ViewIcon className="h-5 w-5" />
            <div className="w-40 p-2">مشاهده ی صفحه</div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsQrModalOpen(true)}>
            <QrCode className="mt-1 h-5 w-5" />
            <div className="w-40 p-2">QR code</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PageUrl;
