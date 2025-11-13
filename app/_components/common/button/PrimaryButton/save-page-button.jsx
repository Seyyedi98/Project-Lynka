"use client";

import { UpdatePageContent, UpdatePageTheme } from "@/actions/page/page";
import { cn } from "@/lib/utils";
import { Loader, Copy, Check, ExternalLink } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SavePageBtn = ({
  children,
  showPublishModal,
  showIsPublishModal,
  setShowIsPublishModal,
}) => {
  const elements = useSelector((store) => store.page.elements);
  const hero = useSelector((store) => store.page.hero);
  const theme = useSelector((store) => store.page.theme);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { uri } = useParams();
  const url = `lynka.ir/${uri}`;
  const fullUrl = `https://lynka.ir/${uri}`;

  const fullContent = [[hero], elements]; // Elements are already in array, hero need to wrapped in [] in order to convert to array

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("لینک کپی شد");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("خطا در کپی لینک");
    }
  };

  const handlePreview = () => {
    window.open(fullUrl, "_blank", "noopener,noreferrer");
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        const JSONElement = JSON.stringify(fullContent);
        const JSONTheme = JSON.stringify(theme);

        await UpdatePageContent(uri, JSONElement);
        await UpdatePageTheme(uri, JSONTheme);
        toast.success("صفحه با موفقت ذخیره شد");

        // Show modal if it's the first publish
        if (showPublishModal && showIsPublishModal) {
          setIsModalOpen(true);
          setShowIsPublishModal(false);
        }
      } catch (error) {
        toast.error("هنگام ذخیره سازی خطایی رخ داد");
      }
    });
  };

  return (
    <>
      <div
        onClick={(e) => {
          handleSave();
          e.stopPropagation();
        }}
        className={cn(
          ``,
          isPending && "pointer-events-none cursor-not-allowed text-white",
        )}
      >
        {isPending && (
          <div className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-20 px-4 text-sm">
            <Loader className="animate-spin" />
          </div>
        )}
        {!isPending && children}
      </div>

      {/* Success Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-0 bg-background/80 backdrop-blur-sm dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-900 dark:text-white">
              تبریک می‌گوییم! 🎉
            </DialogTitle>
          </DialogHeader>

          <div className="text-center">
            <p className="text-lg text-gray-700 dark:text-white/80">
              شما اولین صفحه خود را ساختید
            </p>

            <h4 className="mt-8 text-lg font-medium text-gray-900 dark:text-white">
              اشتراک گذاری
            </h4>

            <div className="mx-3 mb-4 mt-4 flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Input
                  value={url}
                  readOnly
                  className="text-center dark:border-white/20 dark:bg-white/10 dark:text-white"
                />
              </div>
              <Button
                type="button"
                size="md"
                onClick={copyToClipboard}
                className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">کپی</span>
                کپی
              </Button>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="flex-1 border-gray-300 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                بستن
              </Button>
              <Button
                onClick={handlePreview}
                className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
                مشاهده صفحه
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SavePageBtn;
