"use client";

import { newPassword } from "@/actions/auth/new-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../common/message/form-error";
import { FormSuccess } from "../common/message/form-success";
import { LoaderIcon } from "react-hot-toast";

export const CredentialsNewPasswordForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data.success === "رمز عبور تغییر یافت") {
          router.push("/dashboard/auth/login");
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form
        dir="ltr"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          {/* Email field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>رمز عبور</FormLabel> */}
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    className="text-center"
                    placeholder="رمز جدید"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          disabled={isPending}
          type="submit"
          variant="default"
          className="w-full"
          size="md"
        >
          {isPending ? (
            <LoaderIcon className="mx-10 animate-spin" />
          ) : (
            " تغییر رمز عبور"
          )}
        </Button>
      </form>
    </Form>
  );
};
