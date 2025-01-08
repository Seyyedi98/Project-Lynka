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
import { Input } from "@/components/ui/input";
import { checkPageAvailable, newPageCreator } from "@/lib/page";
import { LoaderIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FormError } from "../../form/form-error";
import { FormSuccess } from "../../form/form-success";

const NewPageCard = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const checkUri = async (value) => {
    if (value.length >= 3) {
      const isAvailable = await checkPageAvailable(value);
      if (isAvailable) {
        setError("");
        setSuccess("این آدرس قابل استفاده است");
      } else {
        setSuccess("");
        setError("این آدرس قبلا استفاده شده");
      }
    }
    if (value.length < 3) {
      setSuccess("");
      setError("آدرس باشد بیش از ۳ حرف باشد");
    }
  };

  const createPage = (uri) => {
    startTransition(async () => {
      await newPageCreator(uri).then((data) => {
        router.push(`/workspace/${data.uri}`);
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="h-[450px] w-[300px] cursor-pointer rounded-xl border bg-card p-4 shadow-md duration-200 hover:scale-105 hover:shadow-lg md:h-[500px] md:w-[320px]">
          <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed p-2">
            <div className="mt-8 flex flex-col items-center gap-4">
              <PlusCircleIcon className="h-10 w-10 text-neutral-400/80" />
              <span className="text-neutral-400/80">ساخت صفحه ی جدید</span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="h-54">
        <DialogHeader>
          <DialogTitle> ساخت صفحه جدید</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div
          dir="ltr"
          className="flex items-center rounded-sm border border-brand-500"
        >
          <div className="flex h-full items-center justify-center p-2">
            <span className="">www.link.com/</span>
          </div>
          <Input
            onChange={(e) => {
              setValue(e.target.value);
              checkUri(e.target.value);
            }}
            value={value}
            className="rounded-l-none rounded-r-sm border-none shadow-md ring-0"
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          variant="primary"
          disabled={!success}
          className=""
          onClick={() => createPage(value)}
        >
          {isPending ? <LoaderIcon /> : " شروع کن"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewPageCard;
