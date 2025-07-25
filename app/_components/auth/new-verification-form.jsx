"use client";

import { BeatLoader } from "react-spinners";
import { CardWrapper } from "../layout/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/auth/new-verification";
import { FormError } from "../common/message/form-error";
import { FormSuccess } from "../common/message/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const searchParams = useSearchParams();

  console.log(error, success);

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
  }, [token, data, success]); // removed: data, success from dependencies

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
      </div>
    </main>
  );
};
