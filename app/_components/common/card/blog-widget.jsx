import { ArrowLeft } from "lucide-react";
import React from "react";

const BlogWidget = () => {
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm dark:bg-black/10">
      <div className="mb-2">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          آخرین مطالب وبلاگ
        </h4>
        <div className="mt-2 h-[2px] w-12 rounded-full bg-primary/80"></div>
      </div>

      {[1, 2].map((item) => (
        <div
          key={item}
          className="group flex h-[95px] w-full cursor-pointer items-center justify-between rounded-lg bg-white/70 px-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 dark:bg-gray-800/80 dark:hover:shadow-primary/5"
        >
          <span className="dark:group-hover:text-primary-300 mr-4 text-gray-700 transition-all duration-300 group-hover:text-primary dark:text-gray-300">
            عنوان پست {item === 1 ? "اول" : item === 2 ? "دوم" : "سوم"}
          </span>
          <ArrowLeft className="dark:group-hover:text-primary-300 ml-4 h-5 w-5 text-gray-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary dark:text-gray-400" />
        </div>
      ))}

      <div className="mt-2 text-center">
        <button className="dark:text-primary-300/80 dark:hover:text-primary-300 text-sm font-medium text-primary/80 hover:text-primary">
          مشاهده همه مطالب →
        </button>
      </div>
    </div>
  );
};

export default BlogWidget;
