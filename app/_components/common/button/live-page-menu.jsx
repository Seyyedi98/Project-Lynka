"use client";

import { DotIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../modal/diolog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { submitReport } from "@/actions/page-report";

const LivePageMenu = ({ uri }) => {
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${uri}`;
  const [isPending, startTransition] = useTransition();
  const [isReporting, setIsReporting] = useState(false);
  const [reportText, setReportText] = useState("");
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const copyPageUrlToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("لینک صفحه با موفقیت کپی شد");
  };

  const handleReportSubmit = () => {
    if (!reportText.trim()) {
      toast.error("لطفاً دلیل گزارش را وارد کنید");
      return;
    }

    startTransition(() => {
      submitReport({ uri, reportText })
        .then(() => {
          setIsReportSubmitted(true);
          setReportText("");
          setTimeout(() => {
            setIsDialogOpen(false);
            setTimeout(() => {
              setIsReporting(false);
              setIsReportSubmitted(false);
            }, 300);
          }, 1500);
        })
        .catch(() => {
          toast.error("ارسال گزارش با خطا مواجه شد");
        });
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="absolute right-5 top-5 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/50 transition-colors duration-200 hover:bg-white/90">
          <div className="flex gap-0">
            <DotIcon />
            <DotIcon className="-mr-4" />
            <DotIcon className="-mr-4" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="mx-3 mt-8 pt-4 text-center text-base">
            اشتراک گذاری صفحه
          </div>
        </DialogHeader>

        {/* Share page button */}
        <div className="mx-3 mb-4 flex items-center gap-1 space-x-2">
          <Button
            type="button"
            size="md"
            className="mr-1"
            onClick={copyPageUrlToClipboard}
          >
            <span className="sr-only">کپی</span>
            کپی
          </Button>
          <div className="grid flex-1 gap-2">
            <Input value={url} readOnly className="text-center" />
          </div>
        </div>

        {/* Report page form */}
        <div className="mx-4 mb-4">
          {!isReporting && !isReportSubmitted && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsReporting(true)}
              disabled={isPending}
            >
              {isPending ? "در حال ارسال..." : "گزارش صفحه"}
            </Button>
          )}

          {isReporting && !isReportSubmitted && (
            <div className="space-y-2">
              <Textarea
                placeholder="علت گزارش"
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                maxLength={200}
                rows={4}
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsReporting(false);
                    setReportText("");
                  }}
                  disabled={isPending}
                >
                  انصراف
                </Button>
                <Button
                  onClick={handleReportSubmit}
                  disabled={isPending || !reportText.trim()}
                >
                  {isPending ? "در حال ارسال..." : "ارسال گزارش"}
                </Button>
              </div>
            </div>
          )}

          {isReportSubmitted && (
            <div className="text-center text-green-600">
              گزارش با موفقیت ارسال شد
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LivePageMenu;
