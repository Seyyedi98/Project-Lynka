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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkPageAvailable, newPageCreator } from "@/actions/page";
import { PageUriSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, Plus, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../message/form-error";
import { FormSuccess } from "../message/form-success";

const CreatePageButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(PageUriSchema),
    defaultValues: {
      uri: "",
    },
  });

  const { errors } = form.formState;
  const zodError = errors.uri?.message;
  const uriValue = form.watch("uri");

  useEffect(() => {
    async function checkUri() {
      if (uriValue.length >= 3) {
        const isAvailable = await checkPageAvailable(uriValue);
        if (zodError) {
          setError("");
          setSuccess("");
          setError(zodError);
        } else {
          if (isAvailable) {
            setError("");
            setSuccess("");
            setSuccess("این آدرس قابل استفاده است");
          } else {
            setError("");
            setSuccess("");
            setError("این آدرس قبلا استفاده شده");
          }
        }
      } else {
        setError("");
        setSuccess("");
      }
    }
    checkUri();
  }, [uriValue, zodError]);

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      await newPageCreator(values.uri).then((data) => {
        router.push(`/workspace/${data.uri}`);
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        {/* <div className="h-[450px] w-[300px] cursor-pointer rounded-xl border bg-card p-4 shadow-md duration-200 hover:scale-105 hover:shadow-lg md:h-[500px] md:w-[320px]">
          <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed p-2">
            <div className="mt-8 flex flex-col items-center gap-4">
              <PlusCircleIcon className="h-10 w-10 text-neutral-400/80" />
              <span className="text-neutral-400/80">ساخت صفحه ی جدید</span>
            </div>
          </div>
        </div> */}
        <div className="flex h-8 items-center justify-center rounded-sm bg-brand-600/90 px-3 text-xs text-white hover:bg-brand-600">
          افزودن صفحه جدید
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent className="h-54">
        <DialogHeader>
          <DialogTitle> ساخت صفحه جدید</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div dir="ltr" className="flex items-start rounded-sm">
                <span className="py-3 pl-2">www.link.com/</span>
                <FormField
                  control={form.control}
                  name="uri"
                  render={({ field }) => (
                    <FormItem className="h-full w-full">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          className="-ml-2 mt-[6px] rounded-l-none rounded-r-sm border-none shadow-none ring-0 focus:outline-none focus:ring-transparent"
                        />
                      </FormControl>
                      {/* <FormMess dir="rtl" className="" /> */}
                    </FormItem>
                  )}
                />
              </div>
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button
                type="submit"
                variant="primary"
                disabled={!success || isPending}
                className="w-full rounded-sm"
              >
                {isPending ? <LoaderIcon /> : " شروع کن"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePageButton;
