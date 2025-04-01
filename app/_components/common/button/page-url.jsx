import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  KeyIcon,
  QrCode,
  UserCircleIcon,
  ViewIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import PageQrCodeGenerator from "../../section/workspace/page-qrcode-generator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../modal/diolog";
const PageUrl = () => {
  const { uri } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(state) => setIsModalOpen(state)}
      >
        <DialogContent className="flex h-screen max-h-svh w-screen max-w-full flex-grow flex-col gap-0 overflow-y-scroll p-0">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <PageQrCodeGenerator />
        </DialogContent>
      </Dialog>

      <DropdownMenu>
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

          <DropdownMenuItem
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_WEBSITE_URL}${uri}`,
                "_blank",
              )
            }
          >
            <ViewIcon className="h-5 w-5" />
            <div className="w-40 p-2">مشاهده ی صفحه</div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            <QrCode className="mt-1 h-5 w-5" />
            <div className="w-40 p-2">QR code</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PageUrl;
