"use client";

import { checkPageAvailable, newPageCreator } from "@/actions/page";
import { AuroraBackground } from "@/app/_components/common/shared/aurora-background";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PageUriSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const CreateNewPage = () => {
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
    <AuroraBackground>
      <div
        dir="ltr"
        className="z-50 flex h-[50px] w-[380px] animate-fade-right items-center justify-between rounded-full border border-black lg:h-[100px] lg:w-[650px]"
      >
        <div className="ml-4 flex w-full items-center justify-between gap-4 lg:ml-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="flex w-full items-center justify-center gap-4">
                <div
                  dir="ltr"
                  className="mr-auto flex items-center justify-between rounded-sm"
                >
                  <div className="flex items-center justify-center">
                    <div
                      className={cn(
                        `h-2 w-2 rounded-full bg-red-500`,
                        error && "bg-red-500",
                        !error && "bg-green-500",
                      )}
                    />
                    <span className="py-3 pl-2 text-xl font-medium md:text-2xl">
                      link.bio/
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="uri"
                    render={({ field }) => (
                      <FormItem className="relative h-full w-full">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            className="-ml-2 mb-1.5 mt-[6px] rounded-l-none rounded-r-sm border-none text-xl shadow-none ring-0 focus:outline-none focus:ring-transparent sm:text-xl md:text-2xl"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={!success || isPending}
                  className="mr-2 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-black duration-200 hover:bg-slate-800 lg:mr-6 lg:h-12 lg:w-12"
                >
                  <span>
                    <ChevronRight className="h-7 w-7 text-white" />
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div dir="rtl" className="z-20 mt-4 text-right text-destructive">
        {error}
      </div>
    </AuroraBackground>
  );
};

export default CreateNewPage;
