"use client";

import { BeatLoader } from "react-spinners";
import { CardWrapper } from "../layout/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/auth/new-verification";
import { FormError } from "../common/message/form-error";
import { FormSuccess } from "../common/message/form-success";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const NewVerificationForm = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something wenst wrong!");
      });
  }, [token]); // removed: data, success from dependencies

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <main className="grid h-full w-full place-items-center px-2">
      <div className="mx-2 w-full max-w-2xl rounded-lg bg-card p-12">
        <div className="flex flex-col items-center">
          <p className="mb-2 text-center text-[15px] font-light text-text-light">
            تایید ایمیل
          </p>
          {!success && !error && <BeatLoader />}
          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
        {success && (
          <Link
            style={{ textDecoration: "none" }}
            href="/auth/login"
            className="group relative mx-auto mt-8 flex w-fit items-center justify-center gap-1 text-sm text-primary transition-colors duration-200 hover:text-secondary"
          >
            <div className="absolute -bottom-1 right-0 mx-auto h-[1px] w-0 justify-center bg-secondary text-center transition-all group-hover:w-full" />
            بازگشت به صفحه ورورد
            <ArrowLeft className="mt-1 h-4 w-4" />
          </Link>
        )}
      </div>
    </main>
  );
};
