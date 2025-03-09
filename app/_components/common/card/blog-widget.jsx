import { ArrowLeft } from "lucide-react";
import React from "react";

const BlogWidget = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 rounded-lg p-2">
      <div>
        <h4 className="mr-4 text-text">آخرین مطالب وبلاگ</h4>
      </div>
      <div className="flex h-[60px] w-full cursor-pointer items-center justify-between rounded-md bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow">
        <span className="mr-6 text-text">عنوان پست اول</span>
        <ArrowLeft className="ml-4" />
      </div>
      <div className="flex h-[60px] w-full cursor-pointer items-center justify-between rounded-md bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow">
        <span className="mr-6 text-text">عنوان پست دوم</span>
        <ArrowLeft className="ml-4" />
      </div>
      <div className="flex h-[60px] w-full cursor-pointer items-center justify-between rounded-md bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow">
        <span className="mr-6 text-text">عنوان پست سوم</span>
        <ArrowLeft className="ml-4" />
      </div>
    </div>
  );
};

export default BlogWidget;
