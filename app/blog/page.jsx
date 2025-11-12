import { getPaginatedPosts } from "@/actions/blog";
import { LoadMoreButton } from "../_components/blog/blogLoadMoreButton";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

const Blog = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { posts = [], totalPages = 1 } = await getPaginatedPosts(page, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-2xl">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text pb-2 text-5xl font-bold text-transparent">
            وبلاگ
          </h1>
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
                <article className="h-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-1 backdrop-blur-xl transition-all duration-500 hover:border-amber-500/50">
                  {/* Image Container */}
                  {post.images && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={post.images}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h2 className="mb-4 line-clamp-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-300">
                        {post.title}
                      </h2>

                      <p className="line-clamp-3 text-[15px] leading-relaxed text-white/80">
                        {post.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                      <span className="text-sm font-semibold text-amber-400 transition-transform duration-300 group-hover:translate-x-1">
                        ادامه
                      </span>
                      <div className="flex h-10 w-10 transform items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-transform duration-300 group-hover:scale-110">
                        <ArrowLeft className="h-5 w-5 text-white" />
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
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl">
              <BookOpen className="h-16 w-16 text-white/40" />
            </div>
            <h4 className="mb-4 text-2xl font-bold text-white">
              هنوز مقاله‌ای منتشر نشده است
            </h4>
            <p className="max-w-md text-lg leading-relaxed text-white/60">
              به زودی مقالات جذاب و آموزشی در این بخش منتشر خواهد شد.
            </p>

            {/* Floating decoration */}
            <div className="mt-8 flex gap-4">
              <div className="rounded-full bg-amber-500/20 p-2 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-amber-400" />
              </div>
              <div className="rounded-full bg-blue-500/20 p-2 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-blue-400" />
              </div>
              <div className="rounded-full bg-purple-500/20 p-2 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
