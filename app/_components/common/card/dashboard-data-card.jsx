import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardDataCard = ({ children, bgColor, text, data, href }) => {
  return href ? (
    <Link
      href={href || ""}
      style={{ backgroundColor: bgColor }}
      className={cn(
        `relative block h-full w-full rounded-lg text-white/70`,
        href &&
          `cursor-pointer transition-transform duration-300 hover:scale-105`,
      )}
    >
      <div className="absolute bottom-4 right-4 flex flex-col">
        <span className="text-2xl">{data}</span>
        <span className="text-lg">{text}</span>
      </div>
      <div className="absolute bottom-2 left-2 flex flex-col text-white/50">
        {children}
      </div>
    </Link>
  ) : (
    <div
      style={{ backgroundColor: bgColor }}
      className={`relative h-full w-full rounded-lg text-white/70`}
    >
      <div className="absolute bottom-4 right-4 flex flex-col">
        <span className="text-2xl">{data}</span>
        <span className="text-lg">{text}</span>
      </div>
      <div className="absolute bottom-2 left-2 flex flex-col text-white/50">
        {children}
      </div>
    </div>
  );
};

export default DashboardDataCard;
