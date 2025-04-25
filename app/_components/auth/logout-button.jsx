"use client";

import { logout } from "@/actions/auth/logout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LogoutButton = ({ children, mode = "redirect", asChild }) => {
  const { update } = useSession();
  const router = useRouter();

  const onClick = async () => {
    await logout();
    await update();
    router.refresh();
  };

  if (mode === "modal") {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <span onClick={onClick} className="w-full cursor-pointer">
      {children}
    </span>
  );
};
