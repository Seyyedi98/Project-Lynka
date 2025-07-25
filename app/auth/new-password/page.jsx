import { CredentialsNewPasswordForm } from "@/app/_components/auth/credentials-new-password-form";
import Image from "next/image";
import React from "react";

const NewPasswordPage = () => {
  return (
    <main className="grid h-full w-full place-items-center px-2">
      <div className="mx-2 w-full max-w-2xl rounded-lg bg-card p-12">
        <div className="flex flex-col items-center">
          <p className="mb-4 self-end text-left">
            <Image width={50} height={70} src="/logo.webp" alt="lynka logo" />
          </p>

          <div className="flex w-full max-w-md flex-col gap-3">
            <h2 className="text-center text-3xl text-primary">رمز عبور جدید</h2>
            <p className="mb-4 text-center text-[15px] font-light text-text-light">
              لطفاً رمز عبور جدید خود را وارد کنید
            </p>
            <CredentialsNewPasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewPasswordPage;
