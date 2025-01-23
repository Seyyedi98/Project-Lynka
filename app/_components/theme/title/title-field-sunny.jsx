import React from "react";

const TitleFieldSunny = ({ title, theme, isLive }) => {
  return (
    <div className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-slate-800 bg-yellow-400 p-2">
      <p>
        {title} {theme}
      </p>
    </div>
  );
};

export default TitleFieldSunny;
