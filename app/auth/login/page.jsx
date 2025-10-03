"use client";

import { CredentialsLoginForm } from "@/app/_components/auth/credentials-login-form";
import { MobileLoginForm } from "@/app/_components/auth/mobile-login-form";
import Social from "@/app/_components/auth/social";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [selectedTab, setSelectedTab] = useState("email");

  return (
    <main className="flex w-full">
      <div className="flex w-full flex-col items-center overflow-y-scroll bg-card px-4 pt-10 [scrollbar-width:none] lg:max-w-[480px]">
        <span className="flex w-full items-center justify-between px-2 text-sm lg:px-8">
          <Link
            style={{ textDecoration: "none" }}
            href="/auth/register"
            className="group relative flex gap-1 text-sm text-primary transition-colors duration-200 hover:text-secondary"
          >
            <div className="absolute -bottom-1 right-0 h-[1px] w-0 bg-secondary transition-all group-hover:w-full" />
            حساب کاربری ندارید؟
            <ArrowLeft className="mt-1 h-4 w-4" />
          </Link>
          <Image
            className="-translate-y-1.5"
            width={50}
            height={70}
            src="/logo.webp"
            alt="lynka logo"
          />
        </span>

        <h2 className="mb-4 mt-20 text-4xl text-white">ورود</h2>

        {/* <div className="relative mt-8 flex cursor-pointer items-center justify-center gap-10 text-base font-thin text-text-light">
          <span
            className={cn(
              `absolute bottom-0 h-[4px] translate-y-3 bg-secondary transition-all duration-300`,
              selectedTab === "email" &&
                "right-[-3px] w-[67px] lg:right-[-5px] lg:w-[70px]",
              selectedTab === "mobile" &&
                "right-[98px] w-[100px] lg:right-[98px] lg:w-[100px]",
            )}
          />
          <p
            className={cn(`mt-2`, selectedTab === "email" && "text-secondary")}
            onClick={() => setSelectedTab("email")}
          >
            با رمز عبور
          </p>
          <p
            className={cn(`mt-2`, selectedTab === "mobile" && "text-secondary")}
            onClick={() => setSelectedTab("mobile")}
          >
            با شماره موبایل
          </p>
        </div> */}

        <div className="mt-8 w-full max-w-md px-4">
          {selectedTab === "email" && <CredentialsLoginForm />}
          {selectedTab === "mobile" && <MobileLoginForm />}
          <div className="mt-4">
            <Social />
          </div>
        </div>
      </div>
      <div className="hidden h-full w-full place-items-center text-4xl text-white lg:grid">
        خوشحالم دوباره میبینمت!
      </div>
    </main>
  );
};

export default Login;
