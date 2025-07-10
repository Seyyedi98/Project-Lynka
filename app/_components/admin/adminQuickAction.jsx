"use client";

import { redirect } from "next/navigation";

const QuickAction = ({ icon, target, title, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <button
      onClick={() => redirect(target)}
      className={`flex flex-col items-center justify-center border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] p-2 text-center hover:bg-[#a0a0a0] active:border-[#808080] active:border-b-[#dfdfdf] active:border-r-[#dfdfdf]`}
    >
      <div
        className={`mb-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] ${colorClasses[color]}`}
      >
        {icon}
      </div>
      <span className="text-xs font-medium">{title}</span>
    </button>
  );
};
export default QuickAction;
