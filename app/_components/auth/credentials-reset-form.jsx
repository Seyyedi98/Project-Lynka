"use client";

import { reset } from "@/actions/auth/reset";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../common/message/form-error";
import { FormSuccess } from "../common/message/form-success";
import { Input } from "rsuite";
import ArrowRightButton from "../common/button/arrow-right-button";
import { ArrowRight, LoaderIcon } from "lucide-react";
import Link from "next/link";

export const CredentialsResetForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full max-w-sm">
                {/* <FormLabel>ایمیل</FormLabel> */}
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="ایمیل"
                    type="email"
                    className="h-12 text-center"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="h-10 rounded-full px-6"
          >
            {isPending ? (
              <LoaderIcon className="mx-10 animate-spin" />
            ) : (
              "ارسال لینک بازیابی"
            )}
          </Button>
          <FormError className="w-full" message={error} />
          <FormSuccess className="w-full" message={success} />
        </div>
      </form>

      <Link
        style={{ textDecoration: "none" }}
        href="/auth/login"
        className="group relative mx-auto mt-8 flex gap-1 text-sm text-primary transition-colors duration-200 hover:text-secondary"
      >
        <div className="absolute -bottom-1 right-1/2 h-[1px] w-0 bg-secondary transition-all group-hover:w-1/2" />
        <div className="absolute -bottom-1 left-1/2 h-[1px] w-0 bg-secondary transition-all group-hover:w-1/2" />
        بازگشت به صفحه ورود
        <ArrowRight className="mt-1 h-4 w-4" />
      </Link>
    </Form>
  );
};
