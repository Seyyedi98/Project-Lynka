"use client";

const StatCard = ({ title, value, change, icon }) => (
  <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-white p-4">
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-blue-100">
        {icon}
      </div>
      <span
        className={`inline-flex items-center rounded-none px-2 py-0.5 text-xs font-medium ${
          change.startsWith("+")
            ? "border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-green-100 text-green-800"
            : "border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-red-100 text-red-800"
        }`}
      >
        {change}
      </span>
    </div>
    <div className="mt-3">
      <h3 className="text-xs text-gray-600">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default StatCard;
