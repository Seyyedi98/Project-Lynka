import { Button } from "@/components/ui/button";
import { IconBrandGoogle, IconBrandGoogleAnalytics } from "@tabler/icons-react";
import React from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex h-10 w-full items-center gap-x-2">
      <button
        onClick={() => onClick("google")}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2 transition-colors hover:bg-gray-50"
      >
        <IconBrandGoogle className="h-5 w-5" />
        <span>ورود با گوگل</span>
      </button>
    </div>
  );
};

export default Social;
