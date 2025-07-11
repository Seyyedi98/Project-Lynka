import React from "react";

const AdminAnalytics = () => {
  return (
    <div className="mr-16 p-2 md:mr-64">
      <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
        {/* Window Title */}
        <div className="flex h-6 items-center bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">مدیریت سیستم</span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">سلام، 👋</h1>
            <p className="text-gray-600">خلاصه فعالیت‌های سیستم</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
