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
    <CardWrapper
      headerLabel="ایمیل خود را تایید کنید"
      backButtonLabel="بازگشت به صفحه ی ورود"
      backButtonHref="auth/login"
    >
      <div className="mt-8 flex flex-col items-center gap-8">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
