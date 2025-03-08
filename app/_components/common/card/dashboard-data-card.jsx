import React from "react";

const DashboardDataCard = ({ children, bgColor, text, data }) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`relative h-full w-full rounded-lg text-white/70`}
    >
      <div className="absolute bottom-4 right-4 flex flex-col">
        <span className="text-2xl">{data}</span>
        <span className="text-lg">{text}</span>
      </div>
      <div className="absolute bottom-2 left-4 flex flex-col text-white/50">
        {children}
      </div>
    </div>
  );
};

export default DashboardDataCard;
