import React from "react";

const TitleFieldDefault = ({ title, font, bgColor, textColor }) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-slate-800 p-2"
    >
      <p style={{ color: textColor, fontFamily: font }}>{title}</p>
    </div>
  );
};

export default TitleFieldDefault;
