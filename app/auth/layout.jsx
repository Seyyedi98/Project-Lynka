import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="h-svh">
      <nav className="absolute flex w-full gap-4 bg-red-500 p-4 font-semibold text-white">
        <Link href="/auth/login">ورود</Link>
        <Link href="/auth/register">عضویت</Link>
      </nav>
      <div className="flex h-full items-center justify-center p-4 text-lg">
        {children}
      </div>
    </div>
  );
};

export default layout;
