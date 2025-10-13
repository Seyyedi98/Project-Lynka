import { getPaginatedPosts } from "@/actions/blog";
import { LoadMoreButton } from "../_components/blog/blogLoadMoreButton";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronLeft } from "lucide-react";

const Blog = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { posts = [], totalPages = 1 } = await getPaginatedPosts(page, 10);

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 5h6m-6 3h6m-6 3h6"
              />
            </svg>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text pb-2 text-5xl font-bold text-transparent dark:from-gray-100 dark:to-gray-300">
            وبلاگ
          </h1>
          {/* <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-400">
            کشف مقالات جذاب، راهنمایی‌های تخصصی و جدیدترین مطالب در حوزه
            تکنولوژی
          </p> */}
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block"
              >
                <article className="h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:border-transparent hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                  {/* Image Container */}
                  {post.images && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={post.images}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Gradient Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-gray-800 dark:via-gray-800/50" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h2 className="mb-6 line-clamp-2 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                        {post.title}
                      </h2>

                      <p className="line-clamp-3 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                        {post.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                      <span className="text-sm font-semibold text-blue-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-blue-400">
                        ادامه
                      </span>
                      <div className="flex h-10 w-10 transform items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-transform duration-300 group-hover:scale-110">
                        <ArrowLeft className="text-white" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {posts.length > 0 && page < totalPages && (
          <div className="mt-20 flex justify-center">
            <LoadMoreButton currentPage={page} />
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
              <svg
                className="h-16 w-16 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 5h6m-6 3h6m-6 3h6"
                />
              </svg>
            </div>
            <h4 className="mb-4 text-2xl font-bold text-gray-600 dark:text-gray-300">
              هنوز مقاله‌ای منتشر نشده است
            </h4>
            <p className="max-w-md text-lg leading-relaxed text-gray-500 dark:text-gray-400">
              به زودی مقالات جذاب و آموزشی در این بخش منتشر خواهد شد.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
