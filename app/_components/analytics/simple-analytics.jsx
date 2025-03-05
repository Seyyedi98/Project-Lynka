import React from "react";
import { useSelector } from "react-redux";

const SimpleAnalytics = ({ data }) => {
  const { elementId, title, clicked, device, os } = data;
  const pageCurrentElements = useSelector((store) => store.page.elements);

  const isLinkExist = pageCurrentElements.find((el) => el.id === elementId);

  if (!isLinkExist) return;

  return (
    <div className="fex w-full flex-col rounded-md border border-border p-4 text-text">
      <div className="flex items-center justify-between">
        <div>
          <span>نام لینک: </span>
          <span>{title}</span>
        </div>
        <div>
          <span>دفعات بازدید: </span>
          <span>{clicked}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <p>دستگاه</p>
        <div className="mt-2 flex flex-col items-center justify-between">
          {Object.entries(device).map(([device, count], index) => {
            return (
              <div
                className="flex w-full items-center justify-between"
                key={index}
              >
                <p>{device}</p>
                <p>{count}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-4">سیستم عامل</p>
        <div className="mt-2 flex flex-col items-center justify-between">
          {Object.entries(os).map(([os, count], index) => {
            return (
              <div
                className="flex w-full items-center justify-between"
                key={index}
              >
                <p>{os}</p>
                <p>{count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SimpleAnalytics;
