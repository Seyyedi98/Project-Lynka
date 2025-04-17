"use client";

import { login } from "@/actions/auth/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "rsuite";
import { FormError } from "../common/message/form-error";
import { FormSuccess } from "../common/message/form-success";

export const CredentialsLoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isCodeEntered = form.watch("code");

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      login(values)
        .then((data) => {
          if (data?.error) {
            // form.reset();
            setError(data.error);
          }

          if (data?.success) {
            // form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Main login page */}
          {!showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="email@mail.com"
                        type="email"
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز عبور</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                        className="h-12"
                      />
                    </FormControl>

                    <Link
                      style={{ textDecoration: "none" }}
                      href="/auth/reset"
                      disabled={isPending}
                      className="group relative flex w-fit gap-1 pt-2 text-xs font-normal text-primary transition-colors duration-200 hover:text-secondary"
                    >
                      <div className="absolute -bottom-1 right-0 h-[1px] w-0 bg-secondary transition-all group-hover:w-full" />
                      رمز عبور خود را فراموش کرده اید؟
                      <ArrowLeft className="mt-0.5 h-4 w-4" />
                    </Link>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* 2FA Confirmation page */}
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد یکبار مصرف</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} disabled={isPending}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    لطفا کد یکبار مصرف ارسال شده به ایمیلتان را وارد کنید
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="h-12 w-full">
          {isPending ? (
            <Loader className="animate-spin" />
          ) : showTwoFactor ? (
            "ارسال"
          ) : (
            "ورود"
          )}
        </Button>
      </form>
    </Form>
  );
};
