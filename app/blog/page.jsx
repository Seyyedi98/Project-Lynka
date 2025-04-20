import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

const Blog = () => {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-6xl select-none flex-col px-4 pb-16 sm:px-6">
      {/* Featured Banner - Enhanced */}
      <div className="group relative w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
        <div
          style={{
            backgroundImage:
              "url('https://arklight.storage.c2.liara.space/Nature%20HD%20Wallpapers_%28Downloadha.com%29_%20%2829%29.jpg')",
          }}
          className="brightness-70 h-64 w-full cursor-pointer bg-cover bg-center transition-all duration-700 group-hover:scale-105 group-hover:brightness-100 md:h-80"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute bottom-6 right-6 text-right text-white">
          <h2 className="text-3xl font-bold drop-shadow-md md:text-4xl">
            عنوان مقاله ویژه
          </h2>
          <h3 className="mt-2 text-xl opacity-90 md:mt-3 md:text-2xl">
            توضیحات کوتاه درباره این مقاله
          </h3>
          <button className="mt-4 flex cursor-pointer items-center gap-2 rounded-full bg-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:gap-3 hover:bg-white/30">
            مشاهده مقاله
            <ArrowLeft className="mt-0.5 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Popular Posts Grid - Kept original style with adjusted text sizes */}
      <h3 className="mb-6 mt-12 text-2xl font-bold text-gray-800">
        پست های پر بازدید
      </h3>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="group relative flex h-64 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex h-full w-full flex-col justify-between p-6">
              <div>
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  دسته بندی
                </span>
                <h3 className="mt-3 text-xl font-bold text-gray-800">
                  عنوان پست {item}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  توضیحات کوتاه درباره پست مورد نظر که می‌تواند در این قسمت قرار
                  گیرد. این توضیحات می‌تواند طولانی‌تر باشد.
                </p>
              </div>

              <button className="w-fit cursor-pointer rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-primary/90">
                مطالعه مقاله
              </button>
            </div>

            <div className="absolute left-0 top-0 h-full w-1/3">
              <Image
                width={300}
                height={300}
                alt="blog-post"
                src="https://arklight.storage.c2.liara.space/Nature%20HD%20Wallpapers_%28Downloadha.com%29_%20%2829%29.jpg"
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                style={{
                  clipPath: "ellipse(100% 100% at 0% 50%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* All Posts Section - Improved with consistent text sizes */}
      <h3 className="mb-6 mt-16 text-2xl font-bold text-gray-800">
        همه مقالات
      </h3>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                width={400}
                height={300}
                alt="blog-post"
                src="https://arklight.storage.c2.liara.space/Nature%20HD%20Wallpapers_%28Downloadha.com%29_%20%2829%29.jpg"
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm">
                دسته بندی
              </span>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800">
                عنوان پست {item}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                توضیحات کوتاه درباره پست مورد نظر که می‌تواند در این قسمت قرار
                گیرد.
              </p>

              <button className="mt-5 flex w-fit items-center gap-1 rounded-full bg-gray-100 px-5 py-2 text-xs font-medium text-gray-700 transition-all hover:bg-primary hover:text-white group-hover:gap-2">
                مطالعه مقاله
                <ArrowLeft className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button - Improved */}
      <button className="mx-auto mt-12 flex cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-8 py-3 font-medium text-gray-700 transition-all hover:gap-3 hover:bg-gray-200">
        بارگذاری بیشتر
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default Blog;
