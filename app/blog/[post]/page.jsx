"use client";

import { getBlogPostById } from "@/actions/blog";
import { ArrowLeft, BookOpen, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
  const params = useParams();
  const id = params.post;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await getBlogPostById(id);
        if (postData) {
          setPost(postData);
        } else {
          setError("مقاله مورد نظر یافت نشد");
        }
      } catch (err) {
        setError("خطا در بارگذاری مقاله");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            {/* Skeleton for image */}
            <div className="mb-8 h-64 rounded-3xl bg-white/10 backdrop-blur-xl"></div>
            {/* Skeleton for title */}
            <div className="mb-4 h-8 rounded bg-white/10"></div>
            <div className="mb-12 h-8 w-3/4 rounded bg-white/10"></div>
            {/* Skeleton for content */}
            <div className="space-y-3">
              <div className="h-4 rounded bg-white/10"></div>
              <div className="h-4 rounded bg-white/10"></div>
              <div className="h-4 w-5/6 rounded bg-white/10"></div>
              <div className="h-4 rounded bg-white/10"></div>
              <div className="h-4 w-4/6 rounded bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20 backdrop-blur-xl">
            <BookOpen className="h-12 w-12 text-red-400" />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-white">
            {error || "مقاله یافت نشد"}
          </h1>
          <p className="mb-8 text-white/60">
            متأسفانه قادر به پیدا کردن مقاله مورد نظر شما نیستیم.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:scale-105"
          >
            بازگشت به بلاگ
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header Navigation */}
      <nav className="sticky top-0 z-10 border-b border-white/20 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
            >
              <Home className="h-4 w-4" />
              صفحه اصلی
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
            >
              <BookOpen className="h-4 w-4" />
              بلاگ
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Image */}
        {post.images && (
          <div className="mb-12">
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={post.images}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        )}

        {/* Article Header */}
        <header className="mb-16 text-center">
          <h1 className="mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {post.title}
          </h1>

          {post.description && (
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/80">
              {post.description}
            </p>
          )}
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-right">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="mb-6 text-3xl font-bold text-white sm:text-4xl"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="mb-5 mt-8 text-2xl font-bold text-white sm:text-3xl"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="mb-4 mt-6 text-xl font-bold text-white sm:text-2xl"
                  {...props}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  className="mb-3 mt-5 text-lg font-bold text-white sm:text-xl"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="mb-6 text-lg leading-8 text-white/90"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="mb-6 list-disc pr-6 text-lg text-white/90"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="mb-6 list-decimal pr-6 text-lg text-white/90"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-2 text-lg text-white/90" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="mb-6 border-r-4 border-amber-500 bg-white/10 py-4 pr-6 text-lg italic text-white/80 backdrop-blur-sm"
                  {...props}
                />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    className="rounded bg-white/10 px-2 py-1 font-mono text-sm text-amber-300"
                    {...props}
                  />
                ) : (
                  <code
                    className="mb-6 block overflow-x-auto rounded-2xl border border-white/20 bg-white/10 p-6 font-mono text-sm text-white/90 backdrop-blur-sm"
                    {...props}
                  />
                ),
              a: ({ node, ...props }) => (
                <a
                  className="text-lg text-amber-400 underline transition-colors hover:text-amber-300"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-white" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-white/90" {...props} />
              ),
              table: ({ node, ...props }) => (
                <div className="mb-6 overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                  <table
                    className="min-w-full border-collapse text-lg"
                    {...props}
                  />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  className="border-b border-white/20 px-4 py-3 text-right font-bold text-white"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="border-b border-white/20 px-4 py-3 text-right text-white/90"
                  {...props}
                />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-8 border-white/20" {...props} />
              ),
            }}
          >
            {post.postData}
          </ReactMarkdown>
        </div>

        {/* Back to Blog CTA */}
        <div className="mt-16 border-t border-white/20 pt-8">
          <Link
            href="/blog"
            className="group inline-flex w-full transform items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-amber-500/25 sm:w-auto"
          >
            مشاهده همه مقالات
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </article>
    </div>
  );
}
