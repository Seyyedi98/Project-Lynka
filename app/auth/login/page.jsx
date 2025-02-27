"use client";

import { CredentialsLoginForm } from "@/app/_components/auth/credentials-login-form";
import { MobileLoginForm } from "@/app/_components/auth/mobile-login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [selectedTab, setSelectedTab] = useState("email");

  return (
    <main className="flex w-full">
      <div className="flex w-full flex-col items-center bg-card px-4 pt-10 lg:max-w-[480px]">
        <span className="flex w-full items-center justify-between px-8 text-sm">
          <Link
            style={{ textDecoration: "none" }}
            href="/auth/register"
            className="flex gap-1 text-primary transition-colors duration-200 hover:text-secondary"
          >
            حساب کاربری ندارید؟
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p>Logo</p>
        </span>

        <h2 className="mt-6 text-4xl text-primary">ورود</h2>
        <div className="text-text-light relative mt-8 flex w-full cursor-pointer items-center justify-center gap-10 text-lg font-thin">
          <span
            className={cn(
              `absolute bottom-0 h-[4px] translate-y-3 bg-secondary transition-all duration-300`,
              selectedTab === "email" && "right-[110px] w-[82px]",
              selectedTab === "mobile" && "right-[222px] w-[114px]",
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
        </div>

        <div className="mt-8 w-full px-4">
          {selectedTab === "email" && <CredentialsLoginForm />}
          {selectedTab === "mobile" && <MobileLoginForm />}
        </div>
      </div>
      <div className="hidden h-full w-full place-items-center text-4xl text-white lg:grid">
        خوشحالم دوباره میبینمت!
      </div>
    </main>
  );
};

export default Login;
