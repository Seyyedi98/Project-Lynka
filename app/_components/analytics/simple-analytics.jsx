import React from "react";

const SimpleAnalytics = ({ data }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-md border border-border p-4 text-text">
      <div>
        <span>نام لینک: </span>
        <span>{data.title}</span>
      </div>
      <div>
        <span>دفعات بازدید: </span>
        <span>{data.clicked}</span>
      </div>
    </div>
  );
};

export default SimpleAnalytics;
